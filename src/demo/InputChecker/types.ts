interface IInputChecker {
  $form: JQuery;
  $sliderDOM: JQuery;
  classRotate: string;
}
interface IMakeEventCheck {
  nameAtr: string;
  active: string | number | boolean;
  disable: string | number | boolean;
}
export { IInputChecker, IMakeEventCheck };
