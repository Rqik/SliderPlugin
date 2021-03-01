import { IState } from "./../interface";
import { data, fn } from "jquery";
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
          res = [...res , el.getData()];
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
    this.presents =  pr;
    return this;
  }

  data(data: object) {
    this.presents.sliderMode(data);
    return this;
  }
  getData() {
    return  this.presents.state();
  }
}
