import View from "../View/view";
import Model from "../Model/model";
import { setingOption } from "../interface";

export default class Present {
  model: Model;
  view: View;
  options: setingOption = {};

  constructor(public selector: string) {
    this.model = new Model(selector);
    this.view = new View(this.model.stateCurrent);
    this.init();
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
      this.model.stateCurrent.currentVal[0],
      this.model.stateCurrent.currentVal[1]
    );
    this.view.editView(this.model.stateCurrent);
  }
}
