import { rotate } from "./../interface";
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

      switch (Object.keys(data)[0]) {
        case "shiftXl":
          this.model.leftVal();
          break;
        case "shiftXr":
          this.model.rightVal();
          break;
        default:
          this.model.edit(data);
          this.view.editView(this.model.stateCurrent);
          break;
      }
    });

    this.start();
  }

  sliderMode(options: object) {
    let rotate = this.model.stateCurrent.rotate;
    this.model.edit(options);

    if (rotate !== this.model.stateCurrent.rotate) {
      this.view = new View(this.model.stateCurrent);
    }
    this.view.editView(this.model.stateCurrent);
    this.init();
    this.start();
  }
  start() {
    this.view.reRender();

    this.view.installMove(
      this.model.stateCurrent.currentVal1,
      this.model.stateCurrent.currentVal2
    );
    this.view.editView(this.model.stateCurrent);
  }
}
