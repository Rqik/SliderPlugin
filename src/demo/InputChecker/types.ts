interface IInputChecker {
  $form: JQuery;
  $sliderDOM: JQuery;
}
interface IMakeEventCheck {
  nameAtr: string;
  active: string | number | boolean;
  disable: string | number | boolean;
}
export { IInputChecker, IMakeEventCheck };
