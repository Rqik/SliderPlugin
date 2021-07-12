import { ISlider, IStateEl } from './types/interfaces';

declare global {
  interface JQuery {
    sliderRqik: (opt?: IStateEl) => ISlider;
  }
}
