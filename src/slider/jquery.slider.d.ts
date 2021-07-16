import { CallBack, IPState, StateProps } from './types/interfaces';

declare global {
  interface JQuery {
    sliderRqik(
      method?: IPState | string,
      options?: IPState | CallBack,
    ): JQuery | JQuery<HTMLElement> | StateProps | StateProps[] | any;
  }
}
