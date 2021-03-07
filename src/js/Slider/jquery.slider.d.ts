/* eslint-disable wrap-iife */
/* eslint-disable no-param-reassign */
/* eslint-disable func-names */
import { IState, StateEl } from '../Interface';
import { Present } from '../Presenter/presenter';

interface Slider {
  data: (opt: StateEl) => Slider;
  getData: () => IState[];
}
declare global {
  interface JQuery {
    sliderRqik: (opt?: StateEl) => Slider;
  }
}
