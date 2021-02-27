import { rotate } from './js/interface';
import { SliderPlag } from './js/Slider/slider';
import './assets/main.scss'

import './js/View/subView'

let s = new SliderPlag('.slider_rqik').data({ rotate: 'vertical', show: true, showInterval: true })
setTimeout(() => {
  s.data({showInterval: false})
} , 2000)
setTimeout(() => {
  s.data({showInterval: true})
} , 4000)
setTimeout(() => {
  s.data({ rotate: 'horizontal'})
} , 6000)


 new SliderPlag('.slider2').data({rotate: 'horizontal'})
