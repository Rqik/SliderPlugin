import { IState, Slider, StateEl } from './types/interfaces';
import { Present } from './mvp/Presenter/Presenter';

declare global {
  interface JQuery {
    sliderRqik: (opt?: StateEl) => Slider;
  }
}

(function IIFE(jQuery) {
  const $ = jQuery;
  $.fn.sliderRqik = function initSlider(options?: StateEl) {
    const allSlider: SliderPlugin[] = [];

    this.each((id: number, el: HTMLElement) => {
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
      getData(): Array<IState> {
        const stateArr: Array<IState> = [];
        allSlider.forEach((el: SliderPlugin) => {
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

  $(() => {
    const defaultSelector = '.js-slider-rqik';
    $(defaultSelector).sliderRqik();
  });
}(jQuery));

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
    pr.sliderModify(opt as StateEl);
    this.presents = pr;
    return this;
  }

  data(data: StateEl): this {
    if (this.presents) {
      this.presents.sliderModify(data);
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
