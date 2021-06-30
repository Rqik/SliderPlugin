import { boundMethod } from 'autobind-decorator';

import { Slider } from '../../slider/types/interfaces';
import { IInputChecker, IMakeEventCheck } from './types';

class InputChecker {
  private $form: JQuery;

  private $sliderDOM: JQuery;

  private slider: Slider;

  private $inputRotate: JQuery;

  private $inputCurrentLeft: JQuery;

  private $inputCurrentRight: JQuery;

  private $inputRange: JQuery;

  private readonly inputsValue: string[];

  private readonly inputCheck: [string, Array<string | boolean>][];

  private readonly classRotate: string;

  constructor({ $form, $sliderDOM, slider, classRotate }: IInputChecker) {
    this.$form = $form;
    this.$sliderDOM = $sliderDOM;
    this.slider = slider;
    this.$inputRotate = this.$form.find("input[name='rotate']");
    this.$inputRange = this.$form.find("input[name='range']");
    this.$inputCurrentLeft = this.$form.find("input[name='currentValLeft']");
    this.$inputCurrentRight = this.$form.find("input[name='currentValRight']");
    this.classRotate = classRotate;
    this.inputsValue = [
      'maxValue',
      'minValue',
      'currentValRight',
      'currentValLeft',
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
    this.$sliderDOM.on('mousedown', this.handleClick);
    this.$sliderDOM.on('touchmove', this.handleClick);
    this.$inputRotate.on('click', this.addClassForm);
    this.$inputRange.on('change', this.disabledInputCurrentLeft);
  }

  @boundMethod
  private disabledInputCurrentLeft() {
    if (!this.$inputRange.prop('checked')) {
      this.$inputCurrentLeft.prop('disabled', true);
    } else {
      this.$inputCurrentLeft.prop('disabled', false);
    }
  }

  @boundMethod
  private addClassForm(): void {
    if (this.$inputRotate.is(':checked')) {
      this.$sliderDOM.addClass(this.classRotate);
    } else {
      this.$sliderDOM.removeClass(this.classRotate);
    }
  }

  @boundMethod
  private handleClick(): void {
    document.addEventListener('mousemove', this.eventChange);
    document.addEventListener('mouseup', this.removeMouse);

    document.addEventListener('touchmove', this.eventChange);
    document.addEventListener('touchend', this.removeTouch);
  }

  @boundMethod
  private removeMouse(): void {
    document.removeEventListener('mousemove', this.eventChange);
    document.onmouseup = null;
  }

  @boundMethod
  private removeTouch(): void {
    document.removeEventListener('touchmove', this.eventChange);
    document.ontouchend = null;
  }

  @boundMethod
  private eventChange(): void {
    this.$inputCurrentLeft.val(this.slider.getData()[0].currentValLeft);
    this.$inputCurrentRight.val(this.slider.getData()[0].currentValRight);
  }

  private makeEventCheck({
    nameAtr,
    active,
    disable,
  }: IMakeEventCheck): (e: JQueryEventObject) => void {
    return (event: JQueryEventObject): void => {
      if ($(event.currentTarget).prop('checked')) {
        this.slider.data({ [nameAtr]: active });
      } else {
        this.slider.data({ [nameAtr]: disable });
      }
    };
  }

  private runChange(nameAtr: string): void {
    const $input = this.$form.find(`input[name='${nameAtr}']`);
    const value = $input.val() || 0;
    $input.on('change', this.makeEventInputChange(nameAtr));
    const isValidVal = value !== '-' || value !== undefined;

    if (isValidVal) {
      this.slider.data({ [nameAtr]: +value });
    }
  }

  private makeEventInputChange(nameAtr: string): () => void {
    const $input = this.$form.find(`input[name='${nameAtr}']`);
    let value = $input.val() || 0;

    return (): void => {
      value = $input.val() || 0;
      if (value === '-') {
        return;
      }
      const isCurrentInput = nameAtr === 'stepSize';
      if (isCurrentInput) {
        this.$inputCurrentLeft.attr('step', this.slider.getData()[0].stepSize);
        this.$inputCurrentRight.attr('step', this.slider.getData()[0].stepSize);
      }

      this.slider.data({ [nameAtr]: +value });
      const s = this.slider.getData()[0][nameAtr];
      $input.attr('value', Number(s));
      $input.val(Number(s));
      this.eventChange();
    };
  }

  private runCheckChange(
    nameAtr: string,
    value: (string | number | boolean)[],
  ): void {
    const [active, disable] = value;
    const item: JQuery = this.$form.find(`input[name='${nameAtr}']`);

    item.on('click', this.makeEventCheck({ nameAtr, active, disable }));

    if (item.prop('checked')) {
      this.slider.data({ [nameAtr]: active });
    } else {
      this.slider.data({ [nameAtr]: disable });
    }
  }

  private actionForm(): void {
    this.inputsValue.forEach((el) => this.runChange(el));
    this.inputCheck.forEach((el) => this.runCheckChange(...el));
  }
}

export { InputChecker };
