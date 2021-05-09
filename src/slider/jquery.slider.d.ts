import { Slider, StateEl } from './types/interfaces';

declare global {
  interface JQuery {
    sliderRqik: (opt?: StateEl) => Slider;
  }
}
