import Present from '../Presenter/presenter'

$(function () {
  console.log('jq');
  
})
export class SliderPlag {
  sliders: NodeList
  presents?: any = []
  constructor(selector: string) {
    this.sliders = document.querySelectorAll(selector)
    this.start(selector)
  }

  start(selector: string) {
    this.sliders.forEach((el,ind )=> {
      let s = el as HTMLElement;
      let className = `${selector.replace(/\W+/gi , '')}-${ind}_init-slider`
      s.classList.add(className)
      let pr = new Present(`.${className}`)
      this.presents = [...this.presents, pr]
    })
  }

  data(data: object) {
    this.presents.forEach((element: Present) => {
      element.sliderMode(data)
    });
    return this
  }

}