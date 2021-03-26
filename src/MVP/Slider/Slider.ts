/* eslint-disable wrap-iife */
/* eslint-disable no-param-reassign */
/* eslint-disable func-names */
import { IState, StateEl } from '../Interface';
import { Present } from '../Presenter/Presenter';

interface Slider {
  data: (opt: StateEl) => Slider;
  getData: () => IState[];
}
declare global {
  interface JQuery {
    sliderRqik: (opt?: StateEl) => Slider;
  }
}
(function ($) {
  $.fn.sliderRqik = function (options?: StateEl) {
    const allSlider: SliderPlugin[] = [];
    this.each((id: number, el: any) => {
      const res = new SliderPlugin(el, id);
      if (options) {
        res.data(options);
      }
      allSlider.push(res);
    });

    const slider: Slider = {
      data(opt) {
        allSlider.forEach((el: SliderPlugin) => {
          el.data(opt);
        });
        return slider;
      },
      getData(): any {
        const stateArr: Array<IState> = [];
        allSlider.forEach((el: any) => {
          const r = el.getData();
          if (r) {
            stateArr.push(r);
          }
        });
        return stateArr;
      },
    };

    return slider;
  };
})(jQuery);

class SliderPlugin {
  sliders: HTMLElement;

  presents?: Present;

  selector = '';

  constructor(element: HTMLElement, ind: number) {
    this.sliders = element;
    this.selector = this.sliders.className;
    this.start(this.selector, ind, this.sliders.dataset);
  }

  start(selector: string, ind: number, opt: DOMStringMap): this {
    const className = `${selector.replace(/\W+/gi, '')}-${ind}_i-slider`;
    this.sliders.classList.add(className);
    const pr = new Present(`.${className}`);
    pr.sliderMode(opt as StateEl);
    this.presents = pr;
    return this;
  }

  data(data: StateEl): this {
    if (this.presents) {
      this.presents.sliderMode(data);
    }
    return this;
  }

  getData(): IState | false {
    if (this.presents) {
      return this.presents.state();
    }
    return false;
  }
}
