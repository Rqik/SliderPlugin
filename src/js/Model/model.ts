import {
  IState
} from '../interface';


export default class Model {
  state: IState = {

    selector: 'slider_rqik', // селектор
    minValue: -100, // минимальное значение
    maxValue: 120, // максимальное значение
    range: 'one', // 1 или 2 указателя
    rotate: 'horizontal', // ориентация vertical horizontal
    show: false, // показыватьть текущее значение над указателем
    showInterval: true, // показать интервал
    intervalCount: 2, // количество интервалов
    stepSize: 1, // шаг движения указателя в px
    currentVal1: 0,  // установка значений в числах
    currentVal2: 70, // установка значений в числах
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
  editMode < T extends object > (key: T): void {
    this.state = {
      ...this.state,
      ...key
    }

    this.state.minValue = Number(this.state.minValue)
    this.state.maxValue = Number(this.state.maxValue)
    this.state.intervalCount = Number(this.state.intervalCount)
    this.state.stepSize = Number(this.state.stepSize)
    this.state.currentVal1 = Number(this.state.currentVal1)
    this.state.currentVal2 = Number(this.state.currentVal2)
    this.state.round = Number(this.state.round)
  }
  get stateCurrent(): IState {
    return this.state
  }

}