import Present from './js/Presenter/presenter'

import './assets/main.scss'

import './js/View/subView'




// возможно не правильно то что нельзя на один и тот же селектор 

let app = new Present('.slider_rqik' )
// let app2 = new Present('.slider_rqik2' )
let app3 = new Present('.slider_r2').sliderMode({rotate: 'vertical' , show: true, showInterval: true})

app.sliderMode({ show: true, showInterval: true , })

// input() {

//   let min = < HTMLInputElement > document.querySelector('#min')
//   let max = < HTMLInputElement > document.querySelector('#max')
//   let interval = < HTMLInputElement > document.querySelector('#interval')
//   let step = < HTMLInputElement > document.querySelector('#step')


//   min.addEventListener('input', (e) => {
//     this.options.min = +(e.target as HTMLInputElement).value
//     this.view.renderInterval()

//     console.log(this.selector);
//   })

//   max.addEventListener('input', (e) => {
//     this.options.max = +(e.target as HTMLInputElement).value
//     this.view.renderInterval()
//     console.log(this.options);
//   })

//   interval.addEventListener('change', (e) => {
//     this.options.interval = +(e.target as HTMLInputElement).value
//     this.view.renderInterval()
//     console.log(this.options);
//   })

//   step.addEventListener('change', (e) => {
//     this.options.step = +(e.target as HTMLInputElement).value
//     this.view.addAction()
//     console.log(this.options);
//   })

// }