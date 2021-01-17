interface viewObject {
  selector: string
}
interface buttonSlider {
  left: HTMLElement,
    right: HTMLElement
}

class View {

  slider: HTMLElement
  sliderLeft?: number
  button: buttonSlider = {
    left: document.createElement('div'),
    right: document.createElement('div')
  }
  sliderRange: HTMLElement = document.createElement('div') 
  clickHandler: any
  currentButton: HTMLElement = this.button.left
  shiftX?: string

  constructor(options: viewObject) {
    this.slider = <HTMLElement>document.querySelector(options.selector)
    this.clickHandler = this.onMouseMove.bind(this)
  }


  sliderInit() {
    this.button.left.className ="slider__range_button  slider__range_button-left"
    this.button.right.className = "slider__range_button  slider__range_button-right"
    this.sliderRange.className = "slider__range"
    this.slider.appendChild( this.button.left)
    this.slider.appendChild(this.button.right)
    this.slider.appendChild( this.sliderRange)
    this.button.left.addEventListener('mousedown', this.buttonAction.bind(this))
    this.button.right.addEventListener('mousedown', this.buttonAction.bind(this))
  }


  buttonAction(e: MouseEvent): void {
   
    document.addEventListener('mousemove', this.clickHandler)
    document.addEventListener('mouseup', this.remove.bind(this))
    if (e.currentTarget == this.button.left) {
      this.currentButton = this.button.left
    } else {
      this.currentButton = this.button.right
      
    }

   
    this.button.left.ondragstart = ()=>false;
    this.button.right.ondragstart = ()=>false;
 
  }
 
  onMouseMove(e: MouseEvent) {
  
    this.moveButton(e.pageX );
  }
  remove() {
    console.log('clss');
    document.removeEventListener('mousemove', this.clickHandler);
    document.onmouseup = null;
  }
  moveButton(posX: number, elem?: HTMLElement,): void {
    this.sliderLeft =  this.slider.getBoundingClientRect().left
    let offWidth = this.currentButton.offsetWidth / 2
   
   
    console.log(this.sliderLeft, this.slider.getBoundingClientRect().left);
    
    this.currentButton.style.left= posX - this.sliderLeft - offWidth + 'px'

    // если меньше левой точки slider 
    if (+this.currentButton.style.left.replace(/px/gi, '') <= - offWidth) {
      this.currentButton.style.left = -this.currentButton.offsetWidth / 2 + 'px'
    }
    if (+this.currentButton.style.left.replace(/px/gi, '') >= this.sliderRange.getBoundingClientRect().width - offWidth) {
      console.log('tuee');
      
      this.currentButton.style.left = this.sliderRange.getBoundingClientRect().width- offWidth + 'px'
    }
    console.log(this.sliderRange.getBoundingClientRect().left);
    console.log(+this.currentButton.style.left.replace(/px/gi, ''));
    
    

  }

}

let viewModel = new View({
  selector: '.slider_rqik'
})
viewModel.sliderInit()

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

