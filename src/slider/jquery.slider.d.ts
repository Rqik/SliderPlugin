import { Slider, IStateEl } from './types/interfaces';

declare global {
  interface JQuery {
    sliderRqik: (opt?: IStateEl) => Slider;
  }
}
