interface viewObject {
  selector: string,
    minValue ? : number,
    maxValue ? : number,
}
interface buttonSlider {
  left: HTMLElement,
    right: HTMLElement
}

export default class View {

  slider: HTMLElement
  sliderLeft ? : number 
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
  shiftXl  : number = 1
  shiftXr: number = 1
  

  minValue: number
  maxValue: number
  constructor(selector: string, minValue ? : number,
    maxValue ? : number , show: boolean = true) {
    this.slider = < HTMLElement > document.querySelector(selector)
    this.minValue = minValue || -1000
    this.maxValue = maxValue || 1200
   
    if (show) {
      
      this.currentValLeft.className = 'slider__current_value'
      this.sliderRange.appendChild(this.currentValLeft)
      

      this.currentValRight.className = 'slider__current_value'
      this.sliderRange.appendChild( this.currentValRight)
    }
    //расчеты лучше в процентах от 100%
  }

  addClass() {
    this.button.left.className = "slider__range_button  slider__range_button-left"
    this.button.right.className = "slider__range_button  slider__range_button-right"
    this.sliderRange.className = "slider__range"
    this.sliderActiveZone.className = "slider__range_active"
  }

  addElem() {
    this.sliderRange.appendChild(this.button.left)
    this.sliderRange.appendChild(this.button.right)
    this.sliderRange.appendChild(this.sliderActiveZone)
    this.slider.appendChild(this.sliderRange)
    this.slider.appendChild(this.valueInterval(this.minValue , this.maxValue, 5));
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

  valueInterval(minValue: number, maxValue: number, interval: number): HTMLElement {
    //interval это кол подписей минимум 2
    let result = document.createElement('ul')
    result.className = 'interval_point'

  
    let count: number = (maxValue - minValue) / interval
    for ( let i = 0 ; i <= interval; i++) {

      let li = document.createElement('li')
      li.className = 'interval_point-item'
      li.textContent = `${i*count+minValue}`
      result.appendChild(li)
    }

  
  
    return result
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
    }, 0)

  }
  onMouseMove(e: MouseEvent , step: number = 10) {
   
    this.sliderLeft = this.slider.getBoundingClientRect().left
    
    //если изменяется на шаг то вызываю мув
    this.moveButton(e.pageX);

    if (step <= 1) {
      this.moveButton(e.pageX);
    

    } else {
    this.moveButton(Math.round(e.pageX / step) * step);
    
      
    }
 
    
  }
  remove() {
    document.removeEventListener('mousemove', this.clickHandler);
    document.onmouseup = null;
  }
  moveButton(posX: number ): void {
    this.sliderLeft = this.slider.getBoundingClientRect().left
    
    let widthSlider = this.sliderRange.offsetWidth
    this.buttonWidth = this.currentButton.offsetWidth / 2
    
    this.currentButton.style.left = posX  - this.sliderLeft - this.buttonWidth + 'px'

    // если меньше левой точки slider 
    if (+this.currentButton.style.left.replace(/px/gi, '') <= -this.buttonWidth) {
      this.currentButton.style.left = -this.buttonWidth + 'px' 
    }
    // eсли больше ширины
    if (+this.currentButton.style.left.replace(/px/gi, '') >=  widthSlider - this.buttonWidth) {
      this.currentButton.style.left = widthSlider - this.buttonWidth + 'px'
    }
    // ----
    this.activeZoneAction()
    //размеры для активной зоны
    // ------

    this.showCurentValue()
    this.currentValLeft.style.left = this.shiftXl - (+this.currentValLeft.offsetWidth/2)+'px'
    this.currentValRight.style.left = this.shiftXr - (+this.currentValRight.offsetWidth/2)+'px'

  }


  showCurentValue() {

    
    let point = this.sliderRange.offsetWidth / 100
    let procent = this.shiftXl  / this.sliderRange.offsetWidth 
    let procent2 = this.shiftXr  / this.sliderRange.offsetWidth 
    let value = ((this.maxValue - this.minValue) * procent)+this.minValue
    let value2 = ((this.maxValue - this.minValue) * procent2)+this.minValue
    this.currentValLeft.textContent = `${value}`
    this.currentValRight.textContent = `${value2}`
    
  }

  activeZoneAction() {
    this.shiftXl = +this.button.left.style.left.replace(/px/gi, '') + this.buttonWidth
    this.shiftXr = +this.button.right.style.left.replace(/px/gi, '') + this.buttonWidth
    if (this.shiftXl >= this.shiftXr) {
      [this.shiftXl, this.shiftXr] = [this.shiftXr, this.shiftXl]
    } 
  this.sliderActiveZone.style.left = this.shiftXl  + 'px'
    this.sliderActiveZone.style.width = this.shiftXr - +this.shiftXl + 'px'
    
   
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