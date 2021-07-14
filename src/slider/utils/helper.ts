import { Present } from '../mvp/Presenter/Presenter';
import { CallBack, IPState, IState, IStateEl } from '../types/interfaces';
import { methodTypes } from '../types/constants';

function callPresent(element: HTMLElement, ind: number): Present {
  const slider = element;
  const selector = slider.className;
  const className = `${selector.replace(/\W+/gi, '_')}-${ind}_rqik`;

  slider.classList.add(className);

  const present = new Present(`.${className}`);
  present.setState({ ...slider.dataset } as IStateEl);

  return present;
}

// eslint-disable-next-line consistent-return
function makeMethodPresent(
  slider: JQuery,
  method?: IPState | string,
  options?: IPState | CallBack,
): JQuery<HTMLElement> | IState | IState[] | void {
  switch (method) {
    case methodTypes.SUBSCRIBE:
      if (typeof options === 'undefined') {
        throw new ReferenceError('callback function is not defined');
      }
      if (typeof options !== 'function') {
        throw new TypeError('callback is not function');
      }
      slider.each((_, element) => {
        $(element)
          .data('sliderRqik')
          .subscribe(options as CallBack);
      });
      break;
    case methodTypes.UNSUBSCRIBE:
      if (typeof options === 'undefined') {
        throw new ReferenceError('callback function is not defined');
      }
      if (typeof options !== 'function') {
        throw new TypeError('callback is not function');
      }
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
            .setState(options as IPState);
        });
        return slider;
      }
      // eslint-disable-next-line no-case-declarations
      const states: IState[] = [];
      slider.each((_, element) => {
        states.push($(element).data('sliderRqik').getState());
      });
      if (!states) {
        break;
      }

      if (states.length <= 1) {
        return states[0] as IState;
      }

      return states as IState[];
    default:
      throw new Error(`${method} is not found`);
  }
}

export { callPresent, makeMethodPresent };
