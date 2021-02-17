import {
  IState, buttonSlider
} from '../interface';


import Observer from '../observer'


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
  intervalComponent: HTMLUListElement = document.createElement('ul')

  buttonWidth: number = 10
  clickHandler: any = this.onMouseMove.bind(this)
  currentButton: HTMLElement = this.button.left

  shiftXl: number = 0
  shiftXr: number = 0



  newObserver: Observer
  state: IState
  constructor(state: IState) {

    this.state = state
    this.slider = < HTMLElement > document.querySelector(this.state.selector)
    this.newObserver = new Observer()
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
  renderInterval() {
    this.valueInterval(this.state.minValue, this.state.maxValue, this.state.intervalCount)
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
    this.slider.addEventListener('click', this.resizeSLider.bind(this))
    this.newObserver.broadcast({
      procent: this.sliderRange.offsetWidth
    })

  }
  resizeSLider() {
    if (this.state.widthSlider !== this.sliderRange.offsetWidth || this.state.heightSlider !== this.sliderRange.offsetHeight) {
      this.newObserver.broadcast({
        widthSlider: this.sliderRange.offsetWidth,
        heightSlider: this.sliderRange.offsetHeight
      })
    }
    if (this.state.rotate === 'horizontal') {
      this.newObserver.broadcast({
        pixelSize: this.sliderRange.offsetWidth
      })
    } else if (this.state.rotate === 'vertical') {
      this.newObserver.broadcast({
        pixelSize: this.sliderRange.offsetHeight
      })
    }

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
    this.resizeSLider()

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
  remove() {
    document.removeEventListener('mousemove', this.clickHandler);
    document.onmouseup = null;
  }
  // установка значений
  installMove(min: number, max: number) {
    let pixel: number = 1
    this.sliderIdent = this.slider.offsetLeft
    if (this.state.rotate === 'horizontal') {
      // pixel = this.sliderRange.offsetWidth / (this.state.maxValue - this.state.minValue)
      this.sliderIdent = this.slider.offsetLeft

    } else if (this.state.rotate === 'vertical') {
      // pixel = this.sliderRange.offsetHeight / (this.state.maxValue - this.state.minValue)
      this.sliderIdent = this.slider.offsetTop
    }
    pixel = this.state.pixelSize / (this.state.maxValue - this.state.minValue)

    let res = pixel * min + this.sliderIdent
    let res2 = pixel * max + this.sliderIdent

    this.initMove(0, 10)
  }
  // сброс позиций кнопок
  initMove(min: number, max: number) {

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
      let perc = (e.pageX - this.slider.offsetLeft) / this.slider.offsetWidth * 100


      if (this.state.stepSize <= 1) {
        this.moveButton(perc);
      } else {
        this.moveButton(Math.round(perc / this.state.stepSize) * this.state.stepSize);
      }

    } else if (this.state.rotate === 'vertical') {
      //если изменяется на шаг то вызываю мув
      let perc = (e.pageY - this.slider.offsetTop) / this.slider.offsetHeight * 100
      if (this.state.stepSize <= 1) {
        this.moveButton(perc);
      } else {
        this.moveButton(Math.round(perc / this.state.stepSize) * this.state.stepSize);
      }
    }

  }

  moveButton(pos: number): void {
    if (pos <= 0) {
      pos = 0
    }
    if (pos >= 100) {
      pos = 100
    }


    if (this.currentButton === this.button.left) {
      this.newObserver.broadcast({
        shiftXl: pos
      })

    } else if (this.currentButton === this.button.right) {
      this.newObserver.broadcast({
        shiftXr: pos
      })
    }
    this.buttonWidth = this.currentButton.offsetWidth / 2
    if (this.state.rotate === 'horizontal') {
      this.sliderIdent = this.slider.offsetLeft
      this.currentButton.style.left = `calc(${pos}% - ${this.buttonWidth}px)` // pos - this.sliderIdent - this.buttonWidth + 'px'
      this.currentButton.style.top = -this.state.heightSlider + 'px'

    } else if (this.state.rotate === 'vertical') {
      this.currentButton.style.left = -this.state.widthSlider + 'px'
      this.currentButton.style.top = `calc(${pos}% - ${this.buttonWidth}px)`

    }
    if (this.state.show) {
      this.currentValueText(this.state.currentVal[1], this.state.currentVal[0])
      this.showCurentValue()
    }
    if (this.state.shiftXl >= this.state.shiftXr) {
      [this.state.shiftXl, this.state.shiftXr] = [this.state.shiftXr, this.state.shiftXl]
    }
    // ----
    this.activeZoneAction()
    //размеры для активной зоны
    // ------

  }

  currentValueText(value1: string, value2 ? : string) {

    if (this.state.range === 'two') {

      this.currentValLeft.textContent = `${value2}`
    }
    this.currentValRight.textContent = `${value1}`
  }
  showCurentValue() {
    
    this.currentValLeft.textContent =  this.state.currentText1()
    this.currentValRight.textContent = this.state.currentText2()
  
    if (this.state.rotate === 'horizontal') {

      if (this.state.range === 'two') {
        this.currentValLeft.style.left = `calc(${this.state.shiftXl}% - ${this.currentValLeft.offsetWidth / 2}px)`

      }
      this.currentValRight.style.left = `calc(${this.state.shiftXr}% - ${this.currentValRight.offsetWidth / 2}px)`
    } else if (this.state.rotate === 'vertical') {

      if (this.state.range === 'two') {
        this.currentValLeft.style.top = `calc(${this.state.shiftXl}% - ${this.currentValLeft.offsetHeight / 2}px)`
        this.currentValLeft.style.left = -(+this.currentValLeft.offsetWidth + 15) + 'px'
      }
      this.currentValRight.style.top = `calc(${this.state.shiftXr}% - ${this.currentValLeft.offsetHeight / 2}px)`
      this.currentValRight.style.left = -(+this.currentValRight.offsetWidth + 15) + 'px'

    }

  }

  activeZoneAction() {
    if (this.state.rotate === 'horizontal') {

      this.sliderActiveZone.style.left = this.state.shiftXl + '%'
      this.sliderActiveZone.style.width = this.state.shiftXr - +this.state.shiftXl + '%'

    } else if (this.state.rotate === 'vertical') {

      this.sliderActiveZone.style.top = this.state.shiftXl + '%'
      this.sliderActiveZone.style.height = this.state.shiftXr - +this.state.shiftXl + '%'
    }
  }
  movePoint(e: MouseEvent) {
    this.onMouseMove(e);

  }

}