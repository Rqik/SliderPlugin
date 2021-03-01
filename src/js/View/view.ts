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
  currentButton: HTMLElement = this.buttonRight.button; // абстрактный тумблер
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
  buttonLeftRemove() {
    this.buttonLeft.button.remove();
    this.currentValLeft.currentVal.remove();
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
    } else {
      this.buttonLeftRemove();
    }
    if (this.state.showInterval) {
      this.intervalExpose();
    } else {
      this.interval.interval.remove;
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
    this.currentButton.ondragstart = () => false;
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
    if (this.state.range == 'two') {
      this.initMove(this.mathValueCalc(min), this.mathValueCalc(max));
    }
    this.initMove(this.mathValueCalc(this.state.minValue), this.mathValueCalc(max));
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
    this.currentButton = this.buttonLeft.button;
    this.tumblerB = true;
    this.moveButton(min);
    this.currentButton = this.buttonRight.button;
    this.tumblerB = false;
    this.moveButton(max);
  }
  onMouseMove(e: MouseEvent) {
    let perc: number = 0;
    if (this.state.rotate === "horizontal") {
      perc = this.mathPercent(e.pageX);
    } else if (this.state.rotate === "vertical") {
      perc = this.mathPercent(e.pageY);
    }
    if (!!this.state.stepSizePerc) {
      this.moveButton(this.mathStepPercent(perc));
    } else if (this.state.stepSize > 1) {
      this.moveButton(this.mathOperation(perc));
    } else {
      this.moveButton(perc);
    }
  }
  mathStepPercent(num: number): number {
    return Math.round(num / this.state.stepSizePerc) * this.state.stepSizePerc;
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
    } else if (pos >= 100) {
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
    if (this.state.shiftXl > this.state.shiftXr) {
      this.slideClass.activeZone(this.state.shiftXr, this.state.shiftXl);
    } else {
      this.slideClass.activeZone(this.state.shiftXl, this.state.shiftXr);
    }
  }
  movePoint(e: MouseEvent) {
    this.onMouseMove(e);
  }
}
