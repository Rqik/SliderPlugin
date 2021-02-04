import {
  rotate, range
} from './presen';
export interface IState {
  selector: string,
  minValue  : number,
  maxValue  : number,
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
    minValue:  0, // минимальное значение
    maxValue:  100, // максимальное значение
    show: false, // показыватьть текущее значение над указателем
    range: 'one',  // 1 или 2 указателя
    rotate: 'horizontal', // ориентация vertical horizontal
    showInterval: true, // показать интервал
    intervalCount: 2, // количество интервалов
    stepSize: 1, // шаг движения указателя
    currentVal: [0, 10],// установка значений
    round: 0 // округление
  }
  constructor(selector: string) {
    this.state.selector = selector
    
  }

  /// для редактирования state 
  edit <T extends object>( key: T): void {
    this.state = {...this.state, ...key}
  }

  get stateCurrent(): IState {
    return this.state
  }

}