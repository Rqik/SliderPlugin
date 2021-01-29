import {
  rotate
} from './presen';

interface viewObject {
  selector: string,
    minValue ? : number,
    maxValue ? : number,
    show: boolean,
    rotate: rotate

}
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
  buttonWidth: number = 10
  sliderRange: HTMLElement = document.createElement('div')
  sliderActiveZone: HTMLElement = document.createElement('div')
  clickHandler: any = this.onMouseMove.bind(this)
  currentButton: HTMLElement = this.button.left

  shiftXl: number = 1
  shiftXr: number = 1


  minValue: number
  maxValue: number
  intervalSize: number = 4
  stepSize: number = 2
  intervalComponent: HTMLUListElement = document.createElement('ul')

  range: boolean = false
  // constructor( selector: string, minValue ?: number,
  //   maxValue?: number = this.minValue, show: boolean = true) {

  rotate: rotate = 'horizontal'
  constructor(state: viewObject) {


    this.slider = < HTMLElement > document.querySelector(state.selector)
    this.minValue = state.minValue || 0
    this.maxValue = state.maxValue || 1200
    this.rotate = state.rotate

    if (state.show) {

      this.currentValLeft.className = 'slider__current_value'
      this.sliderRange.appendChild(this.currentValLeft)


      this.currentValRight.className = 'slider__current_value'
      this.sliderRange.appendChild(this.currentValRight)
      this.renderInterval()
    }
    //расчеты лучше в процентах от 100%
  }

  addClass() {
    this.button.left.className = "slider__range_button  slider__range_button-left"
    this.button.right.className = "slider__range_button  slider__range_button-right"
    this.sliderRange.className = "slider__range"
    this.sliderActiveZone.className = "slider__range_active"
    this.intervalComponent.className = 'interval_point'
    if (this.rotate == 'vertical') {
      this.sliderRange.classList.add('slider__range_vertical')
      this.intervalComponent.classList.add('interval_point_vertical')
    }
  }

  addElem() {
    this.sliderRange.appendChild(this.button.left)
    this.sliderRange.appendChild(this.button.right)
    this.sliderRange.appendChild(this.sliderActiveZone)
    this.slider.appendChild(this.sliderRange)
    this.slider.appendChild(this.intervalComponent);
  }
  addAction() {
    this.button.left.addEventListener('mousedown', this.buttonAction.bind(this))
    this.button.right.addEventListener('mousedown', this.buttonAction.bind(this))
    this.slider.addEventListener('click', this.movePoint.bind(this))
  }

  sliderInit() {
    this.addClass()
    this.addElem()
    this.addAction()
    this.initMove()
  }

  renderInterval() {
    this.valueInterval(this.minValue, this.maxValue, this.intervalSize)
  }

  valueInterval(minValue: number, maxValue: number, interval: number): HTMLElement {
    //interval это кол подписей минимум 2
    this.intervalComponent.textContent = ''
    if (interval <= 0) {
      return this.intervalComponent
    }
    let count: number = (maxValue - minValue) / interval
    for (let i = 0; i <= interval; i++) {

      let li = document.createElement('li')
      li.className = 'interval_point-item'
      li.textContent = `${i*count+minValue}`
      this.intervalComponent.appendChild(li)
    }

    return this.intervalComponent
  }
  buttonAction(e: MouseEvent): void {

    document.addEventListener('mousemove', this.clickHandler)
    document.addEventListener('mouseup', this.remove.bind(this))
    if (e.currentTarget === this.button.left) {
      this.currentButton = this.button.left
    } else {
      this.currentButton = this.button.right
    }


    this.button.left.ondragstart = () => false;
    this.button.right.ondragstart = () => false;

  }
  initMove() {
    // сброс позиций кнопок

    setTimeout(() => {
      this.moveButton(0)
      this.currentButton = this.button.right
      this.moveButton(900000)
    }, 20)

  }
  onMouseMove(e: MouseEvent) {

    if (this.rotate === 'horizontal') {
      this.sliderIdent = this.slider.getBoundingClientRect().left

      //если изменяется на шаг то вызываю мув
      this.moveButton(e.pageX);

      if (this.stepSize <= 1) {
        this.moveButton(e.pageX);

      } else {


        this.moveButton(Math.round(e.pageX / this.stepSize) * this.stepSize);
      }

    } else if (this.rotate === 'vertical') {
      this.sliderIdent = this.slider.getBoundingClientRect().top

      //если изменяется на шаг то вызываю мув
      this.moveButton(e.pageY);

      if (this.stepSize <= 1) {
        this.moveButton(e.pageY);

      } else {


        this.moveButton(Math.round(e.pageY / this.stepSize) * this.stepSize);
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
    if (this.rotate === 'horizontal') {
      this.sliderIdent = this.slider.getBoundingClientRect().left


      this.currentButton.style.left = pos - this.sliderIdent - this.buttonWidth + 'px'
      this.currentButton.style.top =  - heightSlider + 'px'
      // если меньше левой точки slider 
      if (+this.currentButton.style.left.replace(/px/gi, '') <= -this.buttonWidth) {
        this.currentButton.style.left = -this.buttonWidth + 'px'
      }
      // eсли больше ширины
      if (+this.currentButton.style.left.replace(/px/gi, '') >= widthSlider - this.buttonWidth) {
        this.currentButton.style.left = widthSlider - this.buttonWidth + 'px'
      }
    } else if (this.rotate === 'vertical') {
      this.sliderIdent = this.slider.getBoundingClientRect().top
      this.currentButton.style.left =  - widthSlider + 'px'
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

    this.showCurentValue()
    if (this.rotate === 'horizontal') {
      this.currentValLeft.style.left = this.shiftXl - (+this.currentValLeft.offsetWidth / 2) + 'px'
      this.currentValRight.style.left = this.shiftXr - (+this.currentValRight.offsetWidth / 2) + 'px'
  
    } else {
      this.currentValLeft.style.top = this.shiftXl - (+this.currentValLeft.offsetHeight / 2) + 'px'
      this.currentValRight.style.top = this.shiftXr - (+this.currentValRight.offsetHeight / 2) + 'px'
  
    }
 
  }


  showCurentValue() {

    if (this.rotate == 'horizontal') {
      let point = this.sliderRange.offsetWidth / 100
      let procent = this.shiftXl / this.sliderRange.offsetWidth
      let procent2 = this.shiftXr / this.sliderRange.offsetWidth
      let value = ((this.maxValue - this.minValue) * procent) + this.minValue
      let value2 = ((this.maxValue - this.minValue) * procent2) + this.minValue
      this.currentValLeft.textContent = `${value}`
      this.currentValRight.textContent = `${value2}`
    } else if (this.rotate === 'vertical') {
      let point = this.sliderRange.offsetHeight / 100
      let procent = this.shiftXl / this.sliderRange.offsetHeight
      let procent2 = this.shiftXr / this.sliderRange.offsetHeight
      let value = ((this.maxValue - this.minValue) * procent) + this.minValue
      let value2 = ((this.maxValue - this.minValue) * procent2) + this.minValue
      this.currentValLeft.textContent = `${value}`
      this.currentValRight.textContent = `${value2}`
    }

  }

  activeZoneAction() {
    if (this.rotate === 'horizontal') {
      this.shiftXl = +this.button.left.style.left.replace(/px/gi, '') + this.buttonWidth
      this.shiftXr = +this.button.right.style.left.replace(/px/gi, '') + this.buttonWidth
      if (this.shiftXl >= this.shiftXr) {
        [this.shiftXl, this.shiftXr] = [this.shiftXr, this.shiftXl]
      }
      this.sliderActiveZone.style.left = this.shiftXl + 'px'
      this.sliderActiveZone.style.width = this.shiftXr - +this.shiftXl + 'px'

    } else if (this.rotate === 'vertical') {
      this.shiftXl = +this.button.left.style.top.replace(/px/gi, '') + this.buttonWidth
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



// document.onmouseup = null;
// console.log(viewModel.moveButton(+100));


// let slider = < HTMLElement > document.querySelector('.slider_rqik')

// let button = < HTMLElement > slider.querySelector('.slider__range_button-left')


// button.addEventListener('mousedown', buttonAction)



// function buttonAction(e: MouseEvent): void {
//   console.clear()
//   console.log('clientX =  ' + e.clientX)
//   console.log('pageX =  ' + e.pageX)
//   left = slider.getBoundingClientRect().left
//   console.log('left = ' + button.getBoundingClientRect().left);

//   document.addEventListener('mousemove', onMouseMove)

//   document.addEventListener('mouseup', function () {
//     document.removeEventListener('mousemove', onMouseMove);
//     document.onmouseup = null;
//   })
// }



// функция которая задает позицию 
// posX - left -  element.offsetWidth / 2 +'px'
// function moveButton(element: HTMLElement, posX: number, left: number, posY ? : string): void {

//   element.style.left = posX - slider.getBoundingClientRect().left - element.offsetWidth / 2 + 'px'

//   // если меньше левой точки slider 
//   if (+element.style.left.replace(/px/gi, '') <= -element.offsetWidth / 2) {
//     element.style.left = -element.offsetWidth / 2 + 'px'
//   }

// }

// function onMouseMove(e: MouseEvent) {

//   moveButton(button, e.pageX, left);

// }