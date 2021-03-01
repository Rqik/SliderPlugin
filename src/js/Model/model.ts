import { IState } from "../interface";

export default class Model {
  state: IState = {
    selector: "sliderRqik", // селектор
    minValue: 0, // минимальное значение
    maxValue: 100, // максимальное значение
    range: "two", // 1 или 2 указателя
    rotate: "horizontal", // ориентация vertical horizontal
    show: true, // показыватьть текущее значение над указателем
    showInterval: true, // показать интервал
    intervalCount: 7, // количество интервалов
    stepSize: 1, // шаг движения указателя в px
    currentVal1: 50, // установка значений в числах
    currentVal2: 0, // установка значений в числах
    round: 1, // округление,
    stepSizePerc: 0,// шаг движения указателя в %
    shiftXl: 0,
    shiftXr: 0,
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
    const t = this.state;
    const res = ((t.maxValue - t.minValue) * t.shiftXl) / 100 + t.minValue;
    t.currentVal2 = Math.round(res * 10 ** t.round) / 10 ** t.round;
  }
 
  rightVal() {
    const t = this.state;
    const res = ((t.maxValue - t.minValue) * t.shiftXr) / 100 + t.minValue;
    t.currentVal1 = Math.round(res * 10 ** t.round) / 10 ** t.round;
    t.currentMax = t.currentVal1;
  }
  get stateCurrent(): IState {
    return this.state;
  }
}
