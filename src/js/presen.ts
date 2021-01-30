import View from './view';
import Model from './model'

export default class Present {


  model: Model
  view: View
  options: setingOption = {

  }

  constructor(public selector: string, public rotate: rotate = 'horizontal', public range: range = 'one') {
    this.model = new Model({
      minValue: this.options.min,
      maxValue: 100,
      show: true
    })
    this.view = new View({
      selector: selector,
      minValue: this.options.min,
      maxValue: 100,
      show: true,
      rotate,
      range
    })
    this.view.sliderInit()
    this.init()

  }


  init() {

    let min = < HTMLInputElement > document.querySelector('#min')
    let max = < HTMLInputElement > document.querySelector('#max')
    let interval = < HTMLInputElement > document.querySelector('#interval')
    let step = < HTMLInputElement > document.querySelector('#step')


    min.addEventListener('input', (e) => {
      this.options.min = +(e.target as HTMLInputElement).value
      this.view.minValue = +(e.target as HTMLInputElement).value
      this.view.renderInterval()

      console.log(this.selector);
    })

    max.addEventListener('input', (e) => {
      this.options.max = +(e.target as HTMLInputElement).value
      this.view.maxValue = +(e.target as HTMLInputElement).value
      this.view.renderInterval()
      console.log(this.options);
    })

    interval.addEventListener('change', (e) => {
      this.options.interval = +(e.target as HTMLInputElement).value
      this.view.intervalSize = +(e.target as HTMLInputElement).value
      this.view.renderInterval()
      console.log(this.options);
    })

    step.addEventListener('change', (e) => {
      this.options.step = +(e.target as HTMLInputElement).value
      this.view.stepSize = +(e.target as HTMLInputElement).value
      this.view.addAction()
      console.log(this.options);
    })

  }


}

export type rotate = 'vertical' | 'horizontal'
export type range = 'one' | 'two'

interface setingOption {
  min ? : number,
  max ? : number,
  interval ? : number,
  step?: number,
  range?: range
}
