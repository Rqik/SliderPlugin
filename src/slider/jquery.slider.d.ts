/* eslint-disable wrap-iife */
/* eslint-disable no-param-reassign */
/* eslint-disable func-names */
import {Slider, StateEl} from './utils/Interface';


declare global {
  interface JQuery {
    sliderRqik: (opt?: StateEl) => Slider;
  }
}
