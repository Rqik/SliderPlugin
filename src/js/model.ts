interface state {
 
    minValue ? : number,
  maxValue?: number,
  show: boolean 
 
}


export default class Model {
  state: state = {
   
    minValue:  0,
    maxValue:  100,
    show: false
  }
  constructor(options: state) {
    this.state = {
      minValue: options.minValue,
      maxValue: options.maxValue,
      show: options.show
    }
  }

  get stateCurrent(): state {
    return this.state
  }

}