import View from './view';
import Model from './model'

export default class Present {
  constructor(public model : Model , public view: View) {
    this.model = model
    this.view = view
    view.sliderInit()
    this.init()
  }

   init() {
  }
  

}




// let viewModel = new View({
//   selector: '.slider_rqik'
// })
// 

