import { IState, StateEl } from '../Interface';

class Model {
  private state: IState = {
    selector: 'sliderRqik', // селектор
    minValue: 0, // минимальное значение
    maxValue: 100, // максимальное значение
    range: 'two', // 1 или 2 указателя
    rotate: 'horizontal', // ориентация vertical horizontal
    show: true, // показыватьть текущее значение над указателем
    showInterval: true, // показать интервал
    intervalCount: 2, // количество интервалов
    stepSizePerc: 0, // шаг движения указателя в %
    stepSize: 1, // шаг движения указателя в px
    currentVal1: 50, // установка значений в числах
    currentVal2: 0, // установка значений в числах
    round: 1, // округление,
    shiftXl: 0,
    shiftXr: 100,
  };

  constructor(selector = 'slider_rqik') {
    this.state.selector = selector;
  }

  get stateCurrent(): IState {
    return this.state;
  }

  edit(key: StateEl): void {
    this.state = {
      ...this.state,
      ...key,
    };
  }

  editMode(key: StateEl): void {
    this.edit(key);
    this.state.minValue = Number(this.state.minValue);
    this.state.maxValue = Number(this.state.maxValue);
    this.state.intervalCount = Number(this.state.intervalCount);
    this.state.stepSize = Number(this.state.stepSize);
    this.state.currentVal1 = Number(this.state.currentVal1);
    this.state.currentVal2 = Number(this.state.currentVal2);
    this.state.round = Number(this.state.round);
  }

  leftVal(): void {
    const t = this.state;
    const res = ((t.maxValue - t.minValue) * t.shiftXl) / 100 + t.minValue;
    t.currentVal2 = Math.round(res * 10 ** t.round) / 10 ** t.round;
  }

  rightVal(): void {
    const t = this.state;
    const res = Number(
      ((t.maxValue - t.minValue) * t.shiftXr) / 100 + t.minValue,
    );
    t.currentVal1 = Number(Math.round(res * 10 ** t.round) / 10 ** t.round);
  }
}

export { Model };
