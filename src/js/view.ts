import {
  rotate,
  range
} from './presen';

import {
  IState
} from './model'

interface buttonSlider {
  left: HTMLElement,
    right: HTMLElement
}

export default class View {

  slider: HTMLElement
  sliderIdent ? : number
  button: buttonSlider = {
    left: document.createElement('div'),
    right: document.createElement('div')
  }
  currentValLeft: HTMLElement = document.createElement('div')
  currentValRight: HTMLElement = document.createElement('div')
  sliderRange: HTMLElement = document.createElement('div')
  sliderActiveZone: HTMLElement = document.createElement('div')
  buttonWidth: number = 10
  clickHandler: any = this.onMouseMove.bind(this)
  currentButton: HTMLElement = this.button.left

  shiftXl: number = 0
  shiftXr: number = 0


  intervalComponent: HTMLUListElement = document.createElement('ul')

 
  state: IState
  constructor(state: IState) {

    this.state = state
    this.slider = < HTMLElement > document.querySelector(this.state.selector)
  
  }
  editView(newState: IState) {
    this.state = {
      ...newState
    }
  }

  buttonLeftExpose() {
    this.button.left.className = "slider__range_button  slider__range_button-left"
    this.button.left.addEventListener('mousedown', this.buttonAction.bind(this))
    this.sliderRange.append(this.button.left)
    if (this.state.show) {
      this.currentValLeft.className = 'slider__current_value'
      this.sliderRange.append(this.currentValLeft)
    }
  }
  intervalExpose() {
    this.intervalComponent.className = 'interval_point'

    if (this.state.rotate == 'vertical') {
      this.intervalComponent.classList.add('interval_point_vertical')
    }
    this.slider.append(this.intervalComponent);
    this.renderInterval()

  }
  addClass() {
    this.button.right.className = "slider__range_button  slider__range_button-right"
    this.sliderRange.className = "slider__range"
    this.sliderActiveZone.className = "slider__range_active"

    if (this.state.rotate == 'vertical') {
      this.sliderRange.classList.add('slider__range_vertical')
    }
  }

  addElem() {
    this.sliderRange.append(this.button.right)
    this.sliderRange.append(this.sliderActiveZone)
    this.slider.append(this.sliderRange)
  }
  addAction() {
    this.button.right.addEventListener('mousedown', this.buttonAction.bind(this))
    this.slider.addEventListener('click', this.movePoint.bind(this))
  }

  sliderInit() {
    if (this.state.range === 'two') {
      this.buttonLeftExpose()
    }
    if (this.state.showInterval) {
      this.intervalExpose()
    }
    if (this.state.show) {
      this.currentValRight.className = 'slider__current_value'
      this.sliderRange.append(this.currentValRight)
    }
    this.addClass()
    this.addElem()
    this.addAction()
    this.initMove(0, 9999999)
  }

  renderInterval() {
    this.valueInterval(this.state.minValue, this.state.maxValue, this.state.intervalCount)
  }

  valueInterval(minValue: number, maxValue: number, count: number): HTMLElement {
    //interval это кол подписей минимум 2
    this.intervalComponent.textContent = ''
    if (count <= 0) {
      return this.intervalComponent
    }
    let interval: number = (maxValue - minValue) / count
    for (let i = 0; i <= count; i++) {

      let li = document.createElement('li')
      li.className = 'interval_point-item'
      li.textContent = `${i*interval+minValue}`
      this.intervalComponent.append(li)
    }

    return this.intervalComponent
  }
  buttonAction(e: MouseEvent): void {

    document.addEventListener('mousemove', this.clickHandler)
    document.addEventListener('mouseup', this.remove.bind(this))

    // ********* 
    // *** нелогичность с left когда range one*** 
    // ********* 

    if (e.currentTarget === this.button.left) {
      this.currentButton = this.button.left
    } else {
      this.currentButton = this.button.right
    }

    if (this.state.range == 'two') {
      this.button.left.ondragstart = () => false;
    }
    this.button.right.ondragstart = () => false;

  }
  // установка значений
  installMove(min: number , max: number) {
    let pixel: number = 1
    this.sliderIdent = this.slider.offsetLeft
    if (this.state.rotate === 'horizontal') {
      pixel = this.sliderRange.offsetWidth / (this.state.maxValue - this.state.minValue)
      this.sliderIdent = this.slider.offsetLeft
      
    }
    else { 
      pixel = this.sliderRange.offsetHeight/ (this.state.maxValue - this.state.minValue)
      this.sliderIdent = this.slider.offsetTop
    }
      
    let res = pixel * min + this.sliderIdent 
    let res2 = pixel * max + this.sliderIdent 
      
    this.initMove(res, res2)
  }
  // сброс позиций кнопок
  initMove(min: number , max: number) {
   
    setTimeout(() => {
      this.currentButton = this.button.left
      this.moveButton(min)
      this.currentButton = this.button.right
      this.moveButton(max)
    }, 20)

  }
  onMouseMove(e: MouseEvent) {

    if (this.state.rotate === 'horizontal') {

      //если изменяется на шаг то вызываю мув

      if (this.state.stepSize <= 1) {
        this.moveButton(e.pageX);

      } else {
        this.moveButton(Math.round(e.pageX / this.state.stepSize) * this.state.stepSize);
      }

    } else if (this.state.rotate === 'vertical') {
      //если изменяется на шаг то вызываю мув

      if (this.state.stepSize <= 1) {
        this.moveButton(e.pageY);

      } else {
        this.moveButton(Math.round(e.pageY / this.state.stepSize) * this.state.stepSize);
      }
    }


  }
  remove() {
    document.removeEventListener('mousemove', this.clickHandler);
    document.onmouseup = null;
  }
  moveButton(pos: number): void {
  let widthSlider = this.sliderRange.offsetWidth
   let heightSlider = this.sliderRange.offsetHeight
    
    this.buttonWidth = this.currentButton.offsetWidth / 2
    if (this.state.rotate === 'horizontal') {
      this.sliderIdent = this.slider.offsetLeft


      this.currentButton.style.left = pos - this.sliderIdent- this.buttonWidth + 'px'
      this.currentButton.style.top = -heightSlider + 'px'
      // если меньше левой точки slider 
      if (+this.currentButton.style.left.replace(/px/gi, '') <= -this.buttonWidth) {
        this.currentButton.style.left = -this.buttonWidth + 'px'
      }
      // eсли больше ширины
      if (+this.currentButton.style.left.replace(/px/gi, '') >= widthSlider - this.buttonWidth) {
        this.currentButton.style.left = widthSlider - this.buttonWidth + 'px'
      }
    } else if (this.state.rotate === 'vertical') {

      this.sliderIdent = this.slider.offsetTop
      this.currentButton.style.left = -widthSlider + 'px'
      this.currentButton.style.top = pos - this.sliderIdent - this.buttonWidth + 'px'
      if (+this.currentButton.style.top.replace(/px/gi, '') <= -this.buttonWidth) {
        this.currentButton.style.top = -this.buttonWidth + 'px'
      }
      if (+this.currentButton.style.top.replace(/px/gi, '') >= heightSlider - this.buttonWidth) {
        this.currentButton.style.top = heightSlider - this.buttonWidth + 'px'
      }
    }

    // ----
    this.activeZoneAction()
    //размеры для активной зоны
    // ------


    if (this.state.show) {
      this.showCurentValue()
    }

   

  }


  showCurentValue() {
    let point, procent: number = 0,
      procent2: number = 0,
      value, value2
    if (this.state.rotate === 'horizontal') {
      point = this.sliderRange.offsetWidth / 100
      procent = this.shiftXl / this.sliderRange.offsetWidth
      procent2 = this.shiftXr / this.sliderRange.offsetWidth
      
      if (this.state.range === 'two') {
        this.currentValLeft.style.left = this.shiftXl - (+this.currentValLeft.offsetWidth / 2) + 'px'

      }
      this.currentValRight.style.left = this.shiftXr - (+this.currentValRight.offsetWidth / 2) + 'px'

    } else if (this.state.rotate === 'vertical') {
      point = this.sliderRange.offsetHeight / 100
      procent = this.shiftXl / this.sliderRange.offsetHeight
      procent2 = this.shiftXr / this.sliderRange.offsetHeight

      if (this.state.range === 'two') {
        this.currentValLeft.style.top = this.shiftXl - (+this.currentValLeft.offsetHeight / 2) + 'px'
        this.currentValLeft.style.left = -(+this.currentValLeft.offsetWidth + 15) + 'px'
      }
      this.currentValRight.style.top = this.shiftXr - (+this.currentValRight.offsetHeight / 2) + 'px'
      this.currentValRight.style.left = -(+this.currentValRight.offsetWidth + 15) + 'px'

    }
    value = ((this.state.maxValue - this.state.minValue) * procent) + this.state.minValue
    value2 = ((this.state.maxValue - this.state.minValue) * procent2) + this.state.minValue
    this.currentValLeft.textContent = `${Math.round(value*(10**this.state.round))/(10**this.state.round)}`
    this.currentValRight.textContent = `${Math.ceil(value2*(10**this.state.round))/(10**this.state.round)}`

  }

  activeZoneAction() {

    if (this.state.rotate === 'horizontal') {
      if (this.state.range === 'two') {
        this.shiftXl = +this.button.left.style.left.replace(/px/gi, '') + this.buttonWidth
      }
      this.shiftXr = +this.button.right.style.left.replace(/px/gi, '') + this.buttonWidth
      if (this.shiftXl >= this.shiftXr) {
        [this.shiftXl, this.shiftXr] = [this.shiftXr, this.shiftXl]
      }
      this.sliderActiveZone.style.left = this.shiftXl + 'px'
      this.sliderActiveZone.style.width = this.shiftXr - +this.shiftXl + 'px'

    } else if (this.state.rotate === 'vertical') {

      if (this.state.range === 'two') {

        this.shiftXl = +this.button.left.style.top.replace(/px/gi, '') + this.buttonWidth
      }
      this.shiftXr = +this.button.right.style.top.replace(/px/gi, '') + this.buttonWidth
      if (this.shiftXl >= this.shiftXr) {
        [this.shiftXl, this.shiftXr] = [this.shiftXr, this.shiftXl]
      }
      this.sliderActiveZone.style.top = this.shiftXl + 'px'
      this.sliderActiveZone.style.height = this.shiftXr - +this.shiftXl + 'px'
    }

  }
  movePoint(e: MouseEvent) {
    this.onMouseMove(e);
  }

}