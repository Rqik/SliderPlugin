import { rotate } from './../interface';

class Button {
  button: HTMLElement = document.createElement('div')
  constructor() {
    this.init()
  }

  init() {
    this.button.className = "slider__range_button"
  }


 
}

export class RigthButton extends Button {
  
  constructor() {
   super()
  }
  init() {
    super.init()
    this.button.classList.add("slider__range_button-right")
    
  }
};

// let s = new RigthButton()
// console.log(s);

export  class LeftButton  extends Button{
  constructor() {
    super()
  }
  init() {
    super.init()
    this.button.classList.add("slider__range_button-left")
  }
};

export class Interval{
  interval: HTMLElement = document.createElement('div')
  constructor() {
    
  }
  intervalExpose() {
    this.interval.className = 'interval_point'

    // if (this.rotate == 'vertical') {
    //   this.interval.classList.add('interval_point_vertical')
    // }
    // this.renderInterval()

  } 
  valueInterval(minValue: number, maxValue: number, count: number): HTMLElement {
    //interval это кол подписей минимум 2
    this.interval.textContent = ''
    if (count <= 0) {
      return this.interval
    }
    let interval: number = (maxValue - minValue) / count
    for (let i = 0; i <= count; i++) {

      let li = document.createElement('li')
      li.className = 'interval_point-item'
      li.textContent = `${i*interval+minValue}`
      this.interval.append(li)
    }

    return this.interval
  }
}


export class SliderRange{
  sliderRange: HTMLElement = document.createElement('div')
  sliderActiveZone: HTMLElement = document.createElement('div')
  rotate: rotate = 'horizontal'
  constructor(rotate: rotate) {
    this.init(rotate)
  }

  init(rotate: rotate): HTMLElement{
    this.sliderRange.className = "slider__range"
    this.sliderActiveZone.className = "slider__range_active"
    if (rotate === 'vertical') {
      this.sliderRange.classList.add('slider__range_vertical')
    }
    this.sliderRange.appendChild(this.sliderActiveZone)
    return this.sliderRange
  }

  edit(rotate: rotate) {
    if (rotate === 'vertical') {
      this.rotate =  rotate
      this.sliderRange.classList.add('slider__range_vertical')
    } else if (rotate === 'horizontal') {
      this.rotate = rotate
      this.sliderRange.classList.remove('slider__range_vertical')
    }
    return this.sliderRange
  }
  activeZone(left: number, rigth: number) {

    if (this.rotate == 'horizontal') {
      this.sliderActiveZone.style.left = left+ '%'
      this.sliderActiveZone.style.width = rigth - left + '%'
    } 
    else {
      this.sliderActiveZone.style.top = left+ '%'
      this.sliderActiveZone.style.height = rigth - left + '%'
    }
   
  }
}