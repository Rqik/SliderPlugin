import Presenter from '../mvp/Presenter/Presenter';
import { CallBack, PStateProps, StateProps } from '../types/interfaces';
import { methodTypes } from '../types/constants';

function callPresent(element: HTMLElement, ind: number): Presenter {
  const slider = element;
  const selector = slider.className;
  const className = `${selector.replace(/\W+/gi, '_')}-${ind}_rqik`;

  slider.classList.add(className);

  const present = new Presenter(`.${className}`);
  present.setState({ ...slider.dataset } as unknown as StateProps);

  return present;
}
function checkTypeOption(options?: PStateProps | CallBack) {
  if (typeof options === 'undefined') {
    throw new ReferenceError('callback function is not defined');
  }
  if (typeof options !== 'function') {
    throw new TypeError('callback is not function');
  }
}
// eslint-disable-next-line consistent-return
function makeMethodPresent(
  slider: JQuery,
  method?: PStateProps | string,
  options?: PStateProps | CallBack,
): JQuery<HTMLElement> | StateProps | StateProps[] | void {
  switch (method) {
    case methodTypes.SUBSCRIBE:
      checkTypeOption(options);
      slider.each((_, element) => {
        $(element)
          .data('sliderRqik')
          .subscribe(options as CallBack);
      });
      break;
    case methodTypes.UNSUBSCRIBE:
      checkTypeOption(options);

      slider.each((_, element) => {
        $(element)
          .data('sliderRqik')
          .unsubscribe(options as CallBack);
      });
      break;
    case methodTypes.SETTINGS:
      if (typeof options === 'object') {
        slider.each((_, element) => {
          $(element)
            .data('sliderRqik')
            .setState(options as PStateProps);
        });
        return slider;
      }
      // eslint-disable-next-line no-case-declarations
      const states: StateProps[] = [];
      slider.each((_, element) => {
        states.push($(element).data('sliderRqik').getState());
      });
      if (!states) {
        break;
      }

      if (states.length <= 1) {
        return states[0] as StateProps;
      }

      return states as StateProps[];
    default:
      throw new Error(`${method} is not found`);
  }
}

export { callPresent, makeMethodPresent };
