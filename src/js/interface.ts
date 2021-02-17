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
export type rotate = 'vertical' | 'horizontal'
export type range = 'one' | 'two'

export interface setingOption {
  min ? : number,
  max ? : number,
  interval ? : number,
  step ? : number,
  range ? : range
}

export interface buttonSlider {
  left: HTMLElement,
    right: HTMLElement
}
