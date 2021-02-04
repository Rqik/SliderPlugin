import Present from './js/presen'
import View from './js/view';
import Model from './js/model'

import './js/test'
import './assets/main.scss'





// возможно не правильно то что нельзя на один и тот же селектор 

let app = new Present('.slider_rqik')
let app2 = new Present('.slider_rqik2')
let app3 = new Present('.slider_r2')

app.sliderMode({ show: true, showInterval: true , range: 'two' })
app.start()
