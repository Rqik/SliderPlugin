import { CallBack, PStateProps, StateProps } from './types/interfaces';

declare global {
  interface JQuery {
    sliderRqik(
      method?: PStateProps | string,
      options?: PStateProps | CallBack,
    ): JQuery | JQuery<HTMLElement> | StateProps | StateProps[] | any ;
  }
}
