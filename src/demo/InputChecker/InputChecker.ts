import { boundMethod } from 'autobind-decorator';

import { IPState } from '../../slider/types/interfaces';
import { IInputChecker, IMakeEventCheck } from './types';

class InputChecker {
  private $form: JQuery;

  private $slider: JQuery;

  private $inputRotate: JQuery;

  private $inputCurrentLeft: JQuery;

  private $inputCurrentRight: JQuery;

  private $inputRange: JQuery;

  private readonly inputNames: string[];

  private readonly inputCheck: [string, Array<string | boolean>][];

  private readonly classRotate: string;

  constructor({ $form, $sliderDOM, classRotate }: IInputChecker) {
    this.$form = $form;
    this.$slider = $sliderDOM;
    this.$inputRotate = this.$form.find("input[name='rotate']");
    this.$inputRange = this.$form.find("input[name='range']");
    this.$inputCurrentLeft = this.$form.find("input[name='minValue']");
    this.$inputCurrentRight = this.$form.find("input[name='maxValue']");
    this.classRotate = classRotate;
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
      ['show', [true, false]],
      ['range', ['two', 'one']],
    ];
  }

  public init(): void {
    this.actionForm();
    this.addEventSlider();
  }

  private addEventSlider(): void {
    this.$slider.sliderRqik('subscribe', this.onChange);
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
  private onChange(data: IPState): void {
    if (data.minValue) {
      this.$inputCurrentLeft.val(Number(data.minValue));
    }
    if (data.maxValue) {
      this.$inputCurrentRight.val(Number(data.maxValue));
    }
  }

  private makeEventCheck({
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

    $input.on('change', this.makeEventInputChange(nameAtr));
    const isValidVal = value !== '-' || value !== undefined;

    if (isValidVal) {
      this.$slider.sliderRqik({ [nameAtr]: +value });
    }
  }

  @boundMethod
  private makeEventInputChange(nameAtr: string): () => void {
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

      const s = $slider.sliderRqik('settings')[nameAtr];

      $input.attr('value', Number(s));
      $input.val(Number(s));
    };
  }

  @boundMethod
  private runCheckChange(
    nameAtr: string,
    value: (string | number | boolean)[],
  ): void {
    const [active, disable] = value;
    const item: JQuery = this.$form.find(`input[name='${nameAtr}']`);

    item.on('click', this.makeEventCheck({ nameAtr, active, disable }));

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

export { InputChecker };
