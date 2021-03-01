import { fn } from "jquery";
import Present from "../Presenter/presenter";

declare global { 
  interface JQuery {
    sliderRqik: any;
  }
}
(function ($) {
  $.fn.sliderRqik = function (options: object) {
    let arr: any = [];

    this.map((id, el) => {
      let res = new SliderPlag(el, id);
      res.data(options);
      arr.push(res);
    });

    let slider = {
      data(opt: object) {
        arr.map(function (el: any) {
          el.data(opt);
        });
        return slider;
      },
      getData() {
        let res: any = [];
        arr.map((el: any, ind: any) => {
          res.push(el.presents);
        });

        return res;
      },
    };

    return slider;
  };
})(jQuery);
class SliderPlag {
  sliders: HTMLElement;
  presents?: any = [];
  selector: string = "";
  constructor(element: HTMLElement, ind: number) {
    this.sliders = element;
    this.selector = this.sliders.className;
    this.start(this.selector, ind, this.sliders.dataset);
  }

  start(selector: string, ind: number, opt: object) {
    let className = `${selector.replace(/\W+/gi, "")}-${ind}_i-slider`;
    this.sliders.classList.add(className);
    let pr = new Present(`.${className}`);
    pr.sliderMode(opt);
    this.presents = [...this.presents, pr];
    return this;
  }

  data(data: object) {
    this.presents.forEach((element: Present) => {
      element.sliderMode(data);
    });
    return this;
  }
  getData() {
    let state: any = [];
    this.presents.forEach((element: Present) => {
      state = [...state, element.model.stateCurrent];
    });
    return state;
  }
}

