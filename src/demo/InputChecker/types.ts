import { Slider } from '../../slider/types/interfaces';

interface IInputChecker {
  $form: JQuery;
  $sliderDOM: JQuery;
  slider: Slider;
  classRotate: string;
}
interface IMakeEventCheck {
  nameAtr: string;
  active: string | number | boolean;
  disable: string | number | boolean;
}
export { IInputChecker, IMakeEventCheck };
