import {
  rotate,
  range
} from './presen';
export interface IState {
  selector: string,
    minValue: number,
    maxValue: number,
    show: boolean,
    showInterval: boolean,
    range: range,
    rotate: rotate,
    intervalCount: number,
    stepSize: number,
    [k: string]: any
}

export default class Model {
  state: IState = {

    selector: 'slider_rqik', // селектор
    minValue: 0, // минимальное значение
    maxValue: 100, // максимальное значение
    range: 'two', // 1 или 2 указателя
    rotate: 'horizontal', // ориентация vertical horizontal
    show: false, // показыватьть текущее значение над указателем
    showInterval: true, // показать интервал
    intervalCount: 2, // количество интервалов
    stepSize: 1, // шаг движения указателя
    currentVal: [0, 10], // установка значений
    round: 1, // округление,
    pixelSize: '6',
    shiftXl: 0,
    shiftXr: 20,
    value1: function () {
      return ((this.maxValue - this.minValue) * this.shiftXl) / 100 + this.minValue
    },
    value2: function () {
      return ((this.maxValue - this.minValue) * this.shiftXr) / 100 + this.minValue
    },
    currentText1: function () {
      return Math.round(this.value1()*(10**this.round))/(10**this.round)
    },
    currentText2: function () {
      return Math.round(this.value2()*(10**this.round))/(10**this.round)
    }
  }

  constructor(selector: string) {
    this.state.selector = selector
    this.state.shiftRight

  }
  
  edit < T extends object > (key: T): void {
    this.state = {
      ...this.state,
      ...key
    }
  }

  get stateCurrent(): IState {
    return this.state
  }

}