import { boundMethod } from 'autobind-decorator';

import {
  IState,
  UniversalSate,
  Rotate,
  IStateEl, CallBack,
} from '../../types/interfaces';
import { Model } from '../Model/Model';
import { View } from '../View/View';

class Present {
  model: Model;

  private view: View;

  private rotate: Rotate;

  constructor(selector: string) {
    this.model = new Model(selector);
    this.view = new View(this.model.getState);
    this.rotate = this.model.getState.rotate;
    this.init();
  }

  getState(): IState {
    return this.model.getState;
  }

  @boundMethod
  subscribe(callBack: CallBack):void {
    this.model.observer.subscribe(callBack);
  }

  @boundMethod
  unsubscribe(callBack: CallBack):void {
    this.model.observer.unsubscribe(callBack);
  }

  sliderModify(options: IStateEl): void {
    this.model.setStateValid(options, true);
    this.view.setState(this.model.getState);
    this.rotate = this.model.getState.rotate;
    this.view.render();
  }

  private init(): void {
    this.model.observer.subscribe(this.setStateView);
    this.view.observer.subscribe(this.setStateModel);
    this.view.render();
  }

  @boundMethod
  private setStateModel(data: UniversalSate): void {
    this.model.setState(data);
  }

  @boundMethod
  private setStateView() {
    this.view.setState(this.model.getState);
  }
}

export { Present };
