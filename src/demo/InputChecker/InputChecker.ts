import { boundMethod } from 'autobind-decorator';

import { CallBack, StateProps } from '../../slider/types/interfaces';
import { IInputChecker, IMakeEventCheck } from './types';

class InputChecker {
  private $form: JQuery;

  private $slider: JQuery;

  private $inputRotate!: JQuery ;

  private $min!: JQuery ;

  private $max!: JQuery ;

  private $inputCurrentLeft!: JQuery;

  private $inputCurrentRight!: JQuery;

  private $inputRange!: JQuery;

  private inputNames!: string[];

  private inputCheck!: [string, Array<string | boolean>][];

  private classRotate!: string;

  constructor({ $form, $sliderDOM }: IInputChecker) {
    this.$form = $form;
    this.$slider = $sliderDOM;
    this.findFormInput();
    this.setDefaultProps();
  }

  findFormInput():void {
    this.$inputRotate = this.$form.find("input[name='rotate']");
    this.$inputRange = this.$form.find("input[name='range']");
    this.$inputCurrentLeft = this.$form.find("input[name='minValue']");
    this.$inputCurrentRight = this.$form.find("input[name='maxValue']");
    this.$min = this.$form.find("input[name='min']");
    this.$max = this.$form.find("input[name='max']");
  }

  setDefaultProps():void {
    this.classRotate = 'slider__rqik_vertical';
    this.inputNames = [
      'max',
      'min',
      'maxValue',
      'minValue',
      'round',
      'intervalCount',
      'stepSize',
    ];
    this.inputCheck = [
      ['rotate', ['vertical', 'horizontal']],
      ['showInterval', [true, false]],
      ['showTooltip', [true, false]],
      ['range', ['two', 'one']],
    ];
  }

  public init(): void {
    this.actionForm();
    this.addEventSlider();
  }

  private addEventSlider(): void {
    this.$slider.sliderRqik('subscribe', this.onChange as CallBack);
    this.$inputRotate.on('click', this.addClassForm);
    this.$inputRange.on('change', this.disabledInputCurrentLeft);
  }

  @boundMethod
  private disabledInputCurrentLeft() {
    if (this.$inputRange.prop('checked')) {
      this.$inputCurrentLeft.prop('disabled', false);
    } else {
      this.$inputCurrentLeft.prop('disabled', true);
    }
  }

  @boundMethod
  private addClassForm(): void {
    if (this.$inputRotate.is(':checked')) {
      this.$slider.addClass(this.classRotate);
    } else {
      this.$slider.removeClass(this.classRotate);
    }
  }

  @boundMethod
  private onChange(data: StateProps): void {
    if (data.minValue !== undefined) {
      this.$inputCurrentLeft.attr('value', Number(data.minValue));
      this.$inputCurrentLeft.val(Number(data.minValue));
    }
    if (data.maxValue !== undefined) {
      this.$inputCurrentRight.attr('value', Number(data.maxValue));
      this.$inputCurrentRight.val(Number(data.maxValue));
    }
    if (data.max !== undefined) {
      this.$max.attr('value', Number(data.max));
      this.$max.val(Number(data.max));
    }
    if (data.min !== undefined) {
      this.$min.attr('value', Number(data.min));
      this.$min.val(Number(data.min));
    }
  }

  private makeHandleCheck({
    nameAtr,
    active,
    disable,
  }: IMakeEventCheck): (e: JQueryEventObject) => void {
    return (event: JQueryEventObject): void => {
      if ($(event.currentTarget).prop('checked')) {
        this.$slider.sliderRqik({ [nameAtr]: active });
      } else {
        this.$slider.sliderRqik({ [nameAtr]: disable });
      }
    };
  }

  @boundMethod
  private runChange(nameAtr: string): void {
    const $input = this.$form.find(`input[name='${nameAtr}']`);
    const value = $input.val() || 0;

    $input.on('change', this.makeHandleInputChange(nameAtr));
    const isValidVal = value !== '-' || value !== undefined;

    if (isValidVal) {
      this.$slider.sliderRqik({ [nameAtr]: +value });
    }
  }

  @boundMethod
  private makeHandleInputChange(nameAtr: string): () => void {
    const $input = this.$form.find(`input[name='${nameAtr}']`);
    let value = $input.val() || 0;
    const { $slider } = this;
    return (): void => {
      value = $input.val() || 0;
      if (value === '-') {
        return;
      }
      $slider.sliderRqik({ [nameAtr]: Number(value) });

      const isCurrentInput = nameAtr === 'stepSize';
      if (isCurrentInput) {
        this.$inputCurrentLeft.attr('step', Number(value));
        this.$inputCurrentRight.attr('step', Number(value));
      }

      const val = $slider.sliderRqik('settings')[nameAtr];
      $input.attr('value', Number(val));
      $input.val(Number(val));
    };
  }

  @boundMethod
  private runCheckChange(
    nameAtr: string,
    value: (string | number | boolean)[],
  ): void {
    const [active, disable] = value;
    const item: JQuery = this.$form.find(`input[name='${nameAtr}']`);

    item.on('click', this.makeHandleCheck({ nameAtr, active, disable }));

    if (item.prop('checked')) {
      this.$slider.sliderRqik({ [nameAtr]: active });
    } else {
      this.$slider.sliderRqik({ [nameAtr]: disable });
    }
  }

  private actionForm(): void {
    this.inputNames.forEach((el) => this.runChange(el));
    this.inputCheck.forEach((el) => this.runCheckChange(...el));
  }
}

export default InputChecker;
