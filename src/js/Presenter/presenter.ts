import View from "../View/view";
import Model from "../Model/model";
import { setingOption } from "../interface";

export default class Present {
  model: Model;
  view: View;
  options: setingOption = {};

  constructor(public selector: string) {
    this.model = new Model(selector);
    this.getElem(selector)
    this.view = new View(this.model.stateCurrent);

    this.init();
  }

  getElem(selector: string) {
    let res = document.querySelectorAll('.slider_rqik')
    
    res.forEach((el) => {
      let s = el as HTMLElement
      this.model.editMode({ ...s.dataset })
    });
    
  }
  init() {
    this.view.newObserver.subscribe((data: object | Function | any) => {
      this.model.edit(data);
      this.view.editView(this.model.stateCurrent);
    });
    this.start();
  }

  sliderMode(options: object) {
    this.model.edit(options);
    this.view.editView(this.model.stateCurrent);
    this.start();
  }
  start() {
    this.view.sliderInit();
    this.view.installMove(
      this.model.stateCurrent.currentVal1,
      this.model.stateCurrent.currentVal2
    );
    this.view.editView(this.model.stateCurrent);
  }
}


function getElem() {
  // let s = res.forEach((el: any) => {
  //   console.log(el.getAttribute('minValue'))
  //  console.log(el.dataset.minValue())
  // })
  let res = document.querySelectorAll('.slider_rqik')
  res.forEach((el) => {
    let s = el as HTMLElement
    let opt: any= {maxValue: 20}
    let minValue = s.getAttribute('data-min-value')  // минимальное значение
    let maxValue = s.dataset  // максимальное значение
    // let range = s.getAttribute('data-range')  // 1 или 2 указателя
    // let rotate = s.getAttribute('data-rotate')  // ориентация vertical horizontal
    // let show = s.getAttribute('data-show')  // показыватьть текущее значение над указателем
    // let showInterval = s.getAttribute('data-show-interval')  // показать интервал
    // let intervalCount = s.getAttribute('data-interval-count') // количество интервалов
    // let stepSize = s.getAttribute('data-min-value')  // шаг движения указателя в px
    // let currentVal = s.getAttribute('data-min-value')  // установка значений в числах
    // let round = s.getAttribute('data-min-value')  // округл
    let v = s.getAttribute('data-min-value') 

    opt = {...opt, ...maxValue}
    console.log(opt);
   
  
  })
  
}

setTimeout(() => {
  
  // getElem()
})