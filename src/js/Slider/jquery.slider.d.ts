import { IState, StateEl } from '../interface';
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
(function ($) {
  $.fn.sliderRqik = function (options?: StateEl) {
    const arr: SliderPlag[] = [];

    this.map((id, el) => {
      const res = new SliderPlag(el, id);
      res.data(options);
      arr.push(res);
    });

    const slider: Slider = {
      data(opt) {
        arr.map((el: SliderPlag) => {
          el.data(opt);
        });
        return slider;
      },
      getData() {
        let res: SliderPlag[] = [];
        arr.map((el: SliderPlag) => {
          res = [...res, el.getData()];
        });

        return res;
      },
    };

    return slider;
  };
})(jQuery);

class SliderPlag {
  sliders: HTMLElement;

  presents?: Present;

  selector = '';

  constructor(element: HTMLElement, ind: number) {
    this.sliders = element;
    this.selector = this.sliders.className;
    this.start(this.selector, ind, this.sliders.dataset);
  }

  start(selector: string, ind: number, opt: DOMStringMap) {
    const className = `${selector.replace(/\W+/gi, '')}-${ind}_i-slider`;
    this.sliders.classList.add(className);
    const pr = new Present(`.${className}`);
    pr.sliderMode(opt);
    this.presents = pr;
    return this;
  }

  data(data: StateEl) {
    this.presents && this.presents.sliderMode(data);
    return this;
  }

  getData() {
    return this.presents && this.presents.state();
  }
}
