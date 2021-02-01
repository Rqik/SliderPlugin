import View from './view';
import Model from './model'

export default class Present {


  model: Model
  view: View
  options: setingOption = {

  }

  constructor(public selector: string) {
    this.model = new Model(selector)
    this.view = new View(this.model.stateCurrent)
    this.view.sliderInit()
  }

  sliderMode(options: object) {
    this.model.edit(options)
    this.view.editView( this.model.stateCurrent)
    this.view.sliderInit()
    this.start()
    
  }
  start() {
     this.view.installMove(this.model.stateCurrent.currentVal[0], this.model.stateCurrent.currentVal[1])
    
  }

  input() {

    let min = < HTMLInputElement > document.querySelector('#min')
    let max = < HTMLInputElement > document.querySelector('#max')
    let interval = < HTMLInputElement > document.querySelector('#interval')
    let step = < HTMLInputElement > document.querySelector('#step')


    min.addEventListener('input', (e) => {
      this.options.min = +(e.target as HTMLInputElement).value
      // this.view.minValue = +(e.target as HTMLInputElement).value
      this.view.renderInterval()

      console.log(this.selector);
    })

    max.addEventListener('input', (e) => {
      this.options.max = +(e.target as HTMLInputElement).value
      // this.view.maxValue = +(e.target as HTMLInputElement).value
      this.view.renderInterval()
      console.log(this.options);
    })

    interval.addEventListener('change', (e) => {
      this.options.interval = +(e.target as HTMLInputElement).value
      // this.view.intervalCount = +(e.target as HTMLInputElement).value
      this.view.renderInterval()
      console.log(this.options);
    })

    step.addEventListener('change', (e) => {
      this.options.step = +(e.target as HTMLInputElement).value
      // this.view.stepSize = +(e.target as HTMLInputElement).value
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
