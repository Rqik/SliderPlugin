import { boundMethod } from 'autobind-decorator';

import {
  IState,
  IUniversalSate,
  rotate,
  IStateEl,
} from '../../types/interfaces';
import { Model } from '../Model/Model';
import { View } from '../View/View';

class Present {
  model: Model;

  private view: View;

  private rotate: rotate;

  constructor(public selector: string) {
    this.model = new Model(selector);
    this.view = new View(this.model.stateCurrent);
    this.rotate = this.model.stateCurrent.rotate;
    this.init();
  }

  state(): IState {
    return this.model.stateCurrent;
  }

  sliderModify(options: IStateEl): void {
    this.model.editMode(options);
    this.view.editView(this.model.stateCurrent);
    if (this.rotate !== this.model.stateCurrent.rotate) {
      this.rotate = this.model.stateCurrent.rotate;
      this.view.observer.unsubscribe(this.setStateModel);
      this.model.observer.unsubscribe(this.setStateView);
    }
    this.init();
  }

  @boundMethod
  private setStateModel(data: IUniversalSate): void {
    this.model.editState(data);
  }

  @boundMethod
  private setStateView() {
    this.view.editView(this.model.stateCurrent);
  }

  private init(): void {
    this.model.observer.subscribe(this.setStateView);
    this.view.observer.subscribe(this.setStateModel);
    this.view.render();
  }
}

export { Present };
