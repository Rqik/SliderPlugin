import { CallBack, IPState, IState } from './types/interfaces';

declare global {
  interface JQuery {
    sliderRqik (
      method?: IPState | string,
      options?: IPState | CallBack,
    ) :JQuery| JQuery<HTMLElement>| IState | IState[] | any
  }
}
