import { IState, rotate, setingOption, StateEl } from '../interface';
import { View } from '../View/view';
import { Model } from '../Model/model';
class Present {
  model: Model;

  view: View;

  options: setingOption = {};

  rotate: rotate;

  subFunction: (data: StateEl) => void = this.modify.bind(this);

  constructor(public selector: string) {
    this.model = new Model(selector);
    this.view = new View(this.model.stateCurrent);
    this.rotate = this.model.stateCurrent.rotate;
    this.init();
  }

  state(): IState {
    return this.model.stateCurrent;
  }

  modify(data: StateEl): void {
    this.model.edit(data);
    switch (Object.keys(data)[0]) {
      case 'shiftXl':
        this.model.leftVal();
        break;
      case 'shiftXr':
        this.model.rightVal();
        break;
      default:
        this.model.edit(data);
        break;
    }
    this.view.editView(this.model.stateCurrent);
  }

  init(): void {
    this.view.newObserver.subscribe(this.subFunction);
    this.view.sliderInit();
    this.start();
  }

  sliderMode(options: StateEl): void {
    this.model.editMode(options);
    this.view.editView(this.model.stateCurrent);
    // console.log( options);

    if (this.rotate !== this.model.stateCurrent.rotate) {
      this.rotate = this.model.stateCurrent.rotate;
      this.view.newObserver.unsubscribe(this.subFunction);
      this.view.removeStyle(this.view.slider);
      this.init();
    }
    this.start();
  }

  start(): void {
    this.view.reRender();
    this.view.installMove(
      this.model.state.currentVal2,
      this.model.state.currentVal1
    );
  }
}

export { Present };
