import {
  IState
} from '../interface';


export default class Model {
  state: IState = {

    selector: 'slider_rqik', // селектор
    minValue: -10, // минимальное значение
    maxValue: 120, // максимальное значение
    range: 'two', // 1 или 2 указателя
    rotate: 'horizontal', // ориентация vertical horizontal
    show: false, // показыватьть текущее значение над указателем
    showInterval: true, // показать интервал
    intervalCount: 2, // количество интервалов
    stepSize: 1, // шаг движения указателя в px
    currentVal: [0, 50], // установка значений в процентах
    round: 1, // округление,
    pixelSize: '62',
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

  constructor(selector: string = 'slider_rqik' ) {
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