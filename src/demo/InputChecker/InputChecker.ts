/* eslint-disable fsd/no-function-declaration-in-event-listener */
import { Slider } from '../../slider/utils/Interface';

class InputChecker {
  private form: JQuery;

  private sliderDOM: JQuery;

  private slider: Slider;

  private inputRotate: JQuery;

  private readonly classRotate: string;

  constructor(
    form: JQuery,
    sliderDOM: JQuery,
    slider: Slider,
    classRotate: string,
  ) {
    this.form = form;
    this.sliderDOM = sliderDOM;
    this.slider = slider;
    this.inputRotate = this.form.find("input[name='rotate']");
    this.classRotate = classRotate;
  }

  init() {
    this.actionForm();
    this.addEventSlider();
  }

  addEventSlider() {
    this.sliderDOM.on('click', this.eventChange.bind(this));
    this.inputRotate.on('click', this.addClassForm.bind(this));
  }

  addClassForm() {
    if (this.inputRotate.is(':checked')) {
      this.sliderDOM.addClass(this.classRotate);
    } else {
      this.sliderDOM.removeClass(this.classRotate);
    }
  }

  eventChange() {
    this.inputChange('currentVal2', this.slider.getData()[0].currentVal2);
    this.inputChange('currentVal1', this.slider.getData()[0].currentVal1);
  }

  makeEventCheck(
    nameAtr: string,
    active: (string | number | boolean),
    disable: (string | number | boolean),
  ): any {
    return (event: JQueryEventObject) => {
      if ($(event.currentTarget).prop('checked')) {
        this.slider.data({ [nameAtr]: active });
      } else {
        this.slider.data({ [nameAtr]: disable });
      }
    };
  }

  runChange(nameAtr: string): void {
    const item = this.form.find(`input[name='${nameAtr}']`);
    const val = item.val() || 0;
    item.on('input', this.makeEventInputChange(nameAtr));
    if (val !== '-' || val !== undefined) {
      this.slider.data({ [nameAtr]: +val });
    }
  }

  makeEventInputChange(nameAtr: string): any {
    const item = this.form.find(`input[name='${nameAtr}']`);
    let val = item.val() || 0;
    return () => {
      val = item.val() || 0;
      if (val === '-') {
        return;
      }
      this.slider.data({ [nameAtr]: +val });
    };
  }

  inputChange(nameAtr: string, value: string | number): void {
    this.form.find(`input[name='${nameAtr}']`).val(value);
  }

  checkChange(nameAtr: string, value: (string | number | boolean)[]): void {
    const [active, disable] = value;
    const item: JQuery = this.form.find(`input[name='${nameAtr}']`);

    item.on('click', this.makeEventCheck(nameAtr, active, disable));

    if (item.prop('checked')) {
      this.slider.data({ [nameAtr]: active });
    } else {
      this.slider.data({ [nameAtr]: disable });
    }
  }

  actionForm(): void {
    this.runChange('maxValue');
    this.runChange('minValue');
    this.runChange('currentVal1');
    this.runChange('currentVal2');
    this.runChange('round');
    this.runChange('intervalCount');
    this.runChange('stepSize');
    this.runChange('stepSizePercent');
    this.runChange('stepSizeCount');
    this.checkChange('rotate', ['vertical', 'horizontal']);
    this.checkChange('showInterval', [true, false]);
    this.checkChange('show', [true, false]);
    this.checkChange('range', ['two', 'one']);
  }
}

export { InputChecker };
