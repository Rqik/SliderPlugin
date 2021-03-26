import {IState, rotate, settingOption, StateEl} from '../Interface';
import {View} from '../View/View';
import {Model} from '../Model/Model';

class Present {
  model: Model;

  view: View;

  options: settingOption = {};

  rotate: rotate;

  subFunctionModel: (data: StateEl) => void = this.setStateModel.bind(this);
  subFunctionView: (data: StateEl) => void = this.setStateView.bind(this);

  constructor(public selector: string) {
    this.model = new Model(selector);
    this.view = new View(this.model.stateCurrent);
    this.rotate = this.model.stateCurrent.rotate;
    this.init();
  }

  state(): IState {
    return this.model.stateCurrent;
  }

  setStateModel(data: StateEl): void {
    this.model.editState(data);
  }

  setStateView() {
    this.view.editView(this.model.stateCurrent);
  }

  init(): void {
    this.view.observer.subscribe(this.subFunctionModel);
    this.model.observer.subscribe(this.subFunctionView);
    this.view.render();
  }

  sliderMode(options: StateEl): void {
    this.model.editMode(options);
    this.view.editView(this.model.stateCurrent);
    if (this.rotate !== this.model.stateCurrent.rotate) {
      this.rotate = this.model.stateCurrent.rotate;
      this.view.observer.unsubscribe(this.subFunctionModel);
      this.model.observer.unsubscribe(this.subFunctionView);
    }
    this.init();
  }

}

export {Present};
