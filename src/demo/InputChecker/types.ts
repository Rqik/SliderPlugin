import { ISlider } from '../../slider/types/interfaces';

interface IInputChecker {
  $form: JQuery;
  $sliderDOM: JQuery;
  slider: ISlider;
  classRotate: string;
}
interface IMakeEventCheck {
  nameAtr: string;
  active: string | number | boolean;
  disable: string | number | boolean;
}
export { IInputChecker, IMakeEventCheck };
