import View from './view';
import Model from './model'

export default class Present {

  clickHandler: any 
  model: Model
  view: View
  options: setingOption = {

  }


  constructor(public selector: string) {
    this.model = new Model(selector)
    this.view = new View(this.model.stateCurrent)
    this.clickHandler = this.view.onMouseMove.bind(this)
    this.view.sliderInit()
    this.input()
    this.addEvent()
  }

  sliderMode(options: object) {
    this.model.edit(options)
    this.view.editView( this.model.stateCurrent)
    this.view.sliderInit()
    this.addEvent()
    
  }
  start() {
     this.view.installMove(this.model.stateCurrent.currentVal[0], this.model.stateCurrent.currentVal[1])
  }
 
  addEvent() {
    if (this.model.state.range === 'two') {
      this.view.button.left.addEventListener('mousedown', this.view.buttonAction.bind(this.view))
    }
      this.view.button.right.addEventListener('mousedown', this.view.buttonAction.bind(this.view))
    this.view.slider.addEventListener('click', this.movePoint.bind(this.view))
    
  }
  
  movePoint(e: MouseEvent) {
    this.clickHandler(e);
  }
  

  input() {
    let str = this.selector.replace(/\./gi , '')
    let min = < HTMLInputElement > document.querySelector(`#${str} #min`)
    let max = < HTMLInputElement > document.querySelector(`#${str} #max`)
    let interval = < HTMLInputElement > document.querySelector(`#${str} #interval`)
    let step = < HTMLInputElement > document.querySelector(`#${str} #step`)

    
    
    min.addEventListener('input', (e) => {
      this.options.min = +(e.target as HTMLInputElement).value
      this.sliderMode({minValue: +(e.target as HTMLInputElement).value})
      
    })

    max.addEventListener('input', (e) => {
      this.options.max = +(e.target as HTMLInputElement).value
      this.sliderMode({maxValue: +(e.target as HTMLInputElement).value})
      this.view.renderInterval()
    })

    interval.addEventListener('change', (e) => {
      this.options.interval = +(e.target as HTMLInputElement).value
      this.sliderMode({intervalCount: +(e.target as HTMLInputElement).value})
      this.view.renderInterval()
    })

    step.addEventListener('change', (e) => {
      this.options.step = +(e.target as HTMLInputElement).value
      this.sliderMode({stepSize: +(e.target as HTMLInputElement).value})
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


