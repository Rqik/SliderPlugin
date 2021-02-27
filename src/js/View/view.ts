import { IState } from "../interface";

import { Interval, SliderRange, CurrentValue, Button } from "./subView";
import Observer from "../observer";
import { loadPartialConfig } from "@babel/core";

export default class View {
  slider: HTMLElement;
  sliderIdent: number = 0;
  buttonLeft: Button = new Button();
  buttonRight: Button = new Button();

  currentValLeft: CurrentValue = new CurrentValue();
  currentValRight: CurrentValue = new CurrentValue();
  sliderRange: HTMLElement;
  interval: Interval = new Interval();
  buttonWidth: number = 10;
  clickHandler: any = this.onMouseMove.bind(this);
  currentButton: HTMLElement = this.buttonLeft.button; // абстрактный тумблер
  tumblerB: boolean = false;
  newObserver: Observer;
  state: IState;
  slideClass: SliderRange;

  constructor(state: IState) {
    this.state = state;
    this.slider = <HTMLElement>document.querySelector(this.state.selector);
    this.slider.style.position = "relative";
    this.newObserver = new Observer();
    this.slideClass = new SliderRange(this.state.rotate);
    this.sliderRange = this.slideClass.sliderRange;
    this.sliderInit();
  }
  editView(newState: IState) {
    this.state = {
      ...newState,
    };
    this.slideClass.edit(this.state.rotate);
    this.interval.edit(this.state.rotate);
  }

  buttonLeftExpose() {
    this.sliderRange.append(this.buttonLeft.button);
    if (this.state.show) {
      this.sliderRange.append(this.currentValLeft.currentVal);
    }
  }
  intervalExpose() {
    this.renderInterval();
    this.slider.append(this.interval.interval);
  }
  renderInterval() {
    this.interval.valueInterval(
      this.state.minValue,
      this.state.maxValue,
      this.state.intervalCount,
      this.state.round
    );
  }

  addElem() {
    this.sliderRange.append(this.buttonRight.button);
    this.slider.append(this.sliderRange);
  }
  addAction() {
    this.buttonRight.addEvent("mousedown", this.buttonAction.bind(this));
    this.slider.addEventListener("click", this.resizeSLider.bind(this));
    this.slider.addEventListener("click", this.movePoint.bind(this));
    this.buttonLeft.addEvent("mousedown", this.buttonAction.bind(this));
  }
  resizeSLider() {
    if (
      this.state.widthSlider !== this.sliderRange.offsetWidth ||
      this.state.heightSlider !== this.sliderRange.offsetHeight
    ) {
      this.newObserver.broadcast({
        widthSlider: this.sliderRange.offsetWidth,
        heightSlider: this.sliderRange.offsetHeight,
      });

      if (this.state.rotate === "horizontal") {
        this.newObserver.broadcast({
          pixelSize: this.sliderRange.offsetWidth,
        });
      } else if (this.state.rotate === "vertical") {
        this.newObserver.broadcast({
          pixelSize: this.sliderRange.offsetHeight,
        });
      }
    }
  }
  removeStyle(el: any) {
    let s = el.querySelectorAll("[style]");
    s.forEach((el: HTMLElement) => {
      el.removeAttribute("style");
    });
  }
  reRender() {
    this.slider.innerHTML = "";
    this.show();
    this.addElem();
    this.resizeSLider();
    this.buttonWidth = this.buttonRight.width();
  }
  sliderInit() {
    this.removeStyle(this.slider);
    this.show();
    this.addElem();
    this.addAction();
    this.resizeSLider();
    this.buttonWidth = this.buttonRight.width();
  }
  show() {
    if (this.state.range === "two") {
      this.buttonLeftExpose();
    }
    if (this.state.showInterval) {
      this.intervalExpose();
    }
    if (this.state.show) {
      this.sliderRange.append(this.currentValRight.currentVal);
    } else {
      this.currentValLeft.currentVal.remove();
      this.currentValRight.currentVal.remove();
    }
  }

  buttonAction(e: MouseEvent): void {
    document.addEventListener("mousemove", this.clickHandler);
    document.addEventListener("mouseup", this.remove.bind(this));

    this.currentButton = <HTMLElement>e.currentTarget;

    if (this.currentButton == this.buttonLeft.button) {
      this.tumblerB = true;
    } else {
      this.tumblerB = false;
    }

    if (this.state.range == "two") {
      this.buttonLeft.button.ondragstart = () => false;
    }
    this.buttonRight.button.ondragstart = () => false;
  }
  remove() {
    document.removeEventListener("mousemove", this.clickHandler);
    document.onmouseup = null;
  }
  installMove(min: number, max: number) {
    if (this.state.rotate === "horizontal") {
      this.sliderIdent = this.slider.offsetLeft;
    } else if (this.state.rotate === "vertical") {
      this.sliderIdent = this.slider.offsetTop;
    }

    this.initMove(this.mathValueCalc(min), this.mathValueCalc(max));
  }
  mathValueCalc(num: number): number {
    return (
      ((num - this.state.minValue) /
        (this.state.maxValue - this.state.minValue)) *
      100
    );
  }
  // сброс позиций кнопок
  initMove(min: number, max: number) {
    Promise.resolve().then(() => {
      this.currentButton = this.buttonLeft.button;
      this.tumblerB = true;
      this.moveButton(min);
      this.currentButton = this.buttonRight.button;
      this.tumblerB = false;
      this.moveButton(max);
    });
  }
  onMouseMove(e: MouseEvent) {
    let perc: number = 0;
    if (this.state.rotate === "horizontal") {
      //если изменяется на шаг то вызываю мув
      perc = this.mathPercent(e.pageX);
    } else if (this.state.rotate === "vertical") {
      //если изменяется на шаг то вызываю мув
      perc = this.mathPercent(e.pageY);
    }
    if (this.state.stepSize <= 1) {
      this.moveButton(perc);
    } else {
      this.moveButton(this.mathOperation(perc));
    }
  }
  //перевод в проценты
  mathPercent(num: number): number {
    if (this.state.rotate === "horizontal") {
      return ((num - this.slider.offsetLeft) / this.slider.offsetWidth) * 100;
    }
    return ((num - this.slider.offsetTop) / this.slider.offsetHeight) * 100;
  }
  // формула расчета для шага
  mathOperation(num: number): number {
    return Math.round(num / this.state.stepSize) * this.state.stepSize;
  }
  moveButton(pos: number): void {
    if (pos <= 0) {
      pos = 0;
    }
    if (pos >= 100) {
      pos = 100;
    }

    if (this.tumblerB) {
      this.newObserver.broadcast({
        shiftXl: pos,
      });
    } else {
      this.newObserver.broadcast({
        shiftXr: pos,
      });
    }

    if (this.state.rotate === "horizontal") {
      this.currentButton.style.left = `calc(${pos}% - ${this.buttonWidth}px)`;
      this.currentButton.style.top = -this.state.heightSlider + "px";
    } else if (this.state.rotate === "vertical") {
      this.currentButton.style.left = -this.state.widthSlider + "px";
      this.currentButton.style.top = `calc(${pos}% - ${this.buttonWidth}px)`;
    }
    if (this.state.show) {
      this.currentValueText();
      this.showCurentValue();
    }

    if (this.state.shiftXl >= this.state.shiftXr) {
      [this.state.shiftXl, this.state.shiftXr] = [
        this.state.shiftXr,
        this.state.shiftXl,
      ];
    }
    // ----
    this.activeZoneAction();
    //размеры для активной зоны
    // ------
  }

  currentValueText() {
    if (this.tumblerB) {
      this.currentValLeft.text(this.state.currentVal2);
    } else {
      this.currentValRight.text(this.state.currentVal1);
    }
  }
  showCurentValue() {
    if (this.state.rotate === "horizontal") {
      if (this.tumblerB) {
        this.currentValLeft.positionHorizont(this.state.shiftXl);
      } else {
        this.currentValRight.positionHorizont(this.state.shiftXr);
      }
    } else if (this.state.rotate === "vertical") {
      if (this.tumblerB) {
        this.currentValLeft.positionVertical(this.state.shiftXl);
      } else {
        this.currentValRight.positionVertical(this.state.shiftXr);
      }
    }
  }

  activeZoneAction() {
    this.slideClass.activeZone(this.state.shiftXl, this.state.shiftXr);
  }
  movePoint(e: MouseEvent) {
    this.onMouseMove(e);
  }
}
