import { boundMethod } from 'autobind-decorator';

import { Slider } from '../../slider/types/interfaces';
import { IInputChecker, IMakeEventCheck } from './types';

class InputChecker {
  private $form: JQuery;

  private $sliderDOM: JQuery;

  private slider: Slider;

  private $inputRotate: JQuery;

  private readonly classRotate: string;

  constructor({ $form, $sliderDOM, slider, classRotate }: IInputChecker) {
    this.$form = $form;
    this.$sliderDOM = $sliderDOM;
    this.slider = slider;
    this.$inputRotate = this.$form.find("input[name='rotate']");
    this.classRotate = classRotate;
  }

  public init(): void {
    this.actionForm();
    this.addEventSlider();
  }

  private addEventSlider(): void {
    this.$sliderDOM.on('mousedown', this.handleClick);
    this.$sliderDOM.on('touchmove', this.handleClick);
    this.$inputRotate.on('click', this.addClassForm);
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
    this.inputChange('currentValLeft', this.slider.getData()[0].currentValLeft);
    this.inputChange(
      'currentValRight',
      this.slider.getData()[0].currentValRight,
    );
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
        this.$form
          .find("input[name='currentValRight']")
          .attr('step', this.slider.getData()[0].stepSize);
        this.$form
          .find("input[name='currentValLeft']")
          .attr('step', this.slider.getData()[0].stepSize);
      }

      this.slider.data({ [nameAtr]: +value });
      const s = this.slider.getData()[0][nameAtr];
      $input.attr('value', Number(s));
      $input.val(Number(s));
      this.eventChange();
    };
  }

  private inputChange(nameAtr: string, value: string | number): void {
    this.$form.find(`input[name='${nameAtr}']`).val(value);
  }

  private checkChange(
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
    this.runChange('maxValue');
    this.runChange('minValue');
    this.runChange('currentValRight');
    this.runChange('currentValLeft');
    this.runChange('round');
    this.runChange('intervalCount');
    this.runChange('stepSize');
    this.checkChange('rotate', ['vertical', 'horizontal']);
    this.checkChange('showInterval', [true, false]);
    this.checkChange('show', [true, false]);
    this.checkChange('range', ['two', 'one']);
  }
}

export { InputChecker };
