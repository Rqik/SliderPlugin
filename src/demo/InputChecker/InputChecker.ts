import { boundMethod } from 'autobind-decorator';

import { Slider } from '../../slider/types/interfaces';

interface IInputChecker {
  $form: JQuery;
  $sliderDOM: JQuery;
  slider: Slider;
  classRotate: string;
}
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
    this.$sliderDOM.on('click', this.eventChange);
    this.$sliderDOM.on('mouseleave', this.eventChange);
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
  private eventChange(): void {
    this.inputChange('currentValLeft', this.slider.getData()[0].currentValLeft);
    this.inputChange(
      'currentValRight',
      this.slider.getData()[0].currentValRight,
    );
  }

  private makeEventCheck(
    nameAtr: string,
    active: string | number | boolean,
    disable: string | number | boolean,
  ): (e: JQueryEventObject) => void {
    return (event: JQueryEventObject): void => {
      if ($(event.currentTarget).prop('checked')) {
        this.slider.data({ [nameAtr]: active });
      } else {
        this.slider.data({ [nameAtr]: disable });
      }
    };
  }

  private runChange(nameAtr: string): void {
    const item = this.$form.find(`input[name='${nameAtr}']`);
    const val = item.val() || 0;
    item.on('change', this.makeEventInputChange(nameAtr));
    if (val !== '-' || val !== undefined) {
      this.slider.data({ [nameAtr]: +val });
    }
    this.$sliderDOM.click();
  }

  private makeEventInputChange(nameAtr: string): () => void {
    const item = this.$form.find(`input[name='${nameAtr}']`);
    let val = item.val() || 0;
    return (): void => {
      val = item.val() || 0;
      if (val === '-') {
        return;
      }
      this.slider.data({ [nameAtr]: +val });
      const s = this.slider.getData()[0][nameAtr];
      item.val(Number(s));
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

    item.on('click', this.makeEventCheck(nameAtr, active, disable));

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
