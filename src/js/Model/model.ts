import { IState } from "../interface";

export default class Model {
  state: IState = {
    selector: "slider_rqik", // селектор
    minValue: 0, // минимальное значение
    maxValue: 120, // максимальное значение
    range: "two", // 1 или 2 указателя
    rotate: "horizontal", // ориентация vertical horizontal
    show: true, // показыватьть текущее значение над указателем
    showInterval: true, // показать интервал
    intervalCount: 7, // количество интервалов
    stepSize: 1, // шаг движения указателя в px
    currentVal1: 0, // установка значений в числах
    currentVal2: 70, // установка значений в числах
    round: 1, // округление,
    pixelSize: "6",
    shiftXl: 0,
    shiftXr: 200,
  };

  constructor(selector: string = "slider_rqik") {
    this.state.selector = selector;
  }

  edit<T extends object>(key: T): void {
    this.state = {
      ...this.state,
      ...key,
    };
  }
  editMode<T extends object>(key: T): void {
    this.edit(key);

    this.state.minValue = Number(this.state.minValue);
    this.state.maxValue = Number(this.state.maxValue);
    this.state.intervalCount = Number(this.state.intervalCount);
    this.state.stepSize = Number(this.state.stepSize);
    this.state.currentVal1 = Number(this.state.currentVal1);
    this.state.currentVal2 = Number(this.state.currentVal2);
    this.state.round = Number(this.state.round);
  }

  leftVal() {
    let res =
      ((this.state.maxValue - this.state.minValue) * this.state.shiftXl) / 100 +
      this.state.minValue;
    this.state.currentVal2 =
      Math.round(res * 10 ** this.state.round) / 10 ** this.state.round;
  }
  rightVal() {
    let res =
      ((this.state.maxValue - this.state.minValue) * this.state.shiftXr) / 100 +
      this.state.minValue;
    this.state.currentVal1 =
      Math.round(res * 10 ** this.state.round) / 10 ** this.state.round;
  }
  get stateCurrent(): IState {
    return this.state;
  }
}
