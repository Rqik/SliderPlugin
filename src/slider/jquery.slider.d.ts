import { Slider, StateEl } from './utils/Interface';

declare global {
  interface JQuery {
    sliderRqik: (opt?: StateEl) => Slider;
  }
}
