import { IState, CallBack, IPState } from './types/interfaces';
import { callPresent, makeMethodPresent } from './utils/helper';

(function IIFE(jQuery) {
  const $ = jQuery;
  function init(index: number, element: HTMLElement) {
    if (!$(element).length) throw new ReferenceError('Connection to non-existent element');

    const dataFromAttributes = $(element).data();
    const present = callPresent(element, index);
    present.setState(dataFromAttributes);
    $(element).data('sliderRqik', present);
  }

  $.fn.sliderRqik = function initialPlugin(
    method?: IPState | string,
    options?: IPState | CallBack,
  ) : JQuery | JQuery<HTMLElement> | IState | IState[]| any {
    const $this = $(this);

    if (!$this.first().data('sliderRqik')) {
      $this.each(init);
    }

    if (typeof method === 'undefined') {
      return $(this);
    }

    if (typeof method === 'object') {
      $this.each((_, element) => {
        $(element).data('sliderRqik').setState(method);
      });
      return $(this);
    }
    if (typeof method !== 'string') {
      throw new TypeError('sliderRqik method name should be a string');
    }
    const states = makeMethodPresent($this, method, options);
    if (states) {
      return states;
    }
    return $(this);
  };

  $(() => {
    const defaultSelector = '.slider-rqik';
    $(defaultSelector).sliderRqik();
  });
}(jQuery));
