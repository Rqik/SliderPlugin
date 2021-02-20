import { IState, buttonSlider } from "../interface";

import { LeftButton, RigthButton, Interval, SliderRange } from "./subView";
import Observer from "../observer";

export default class View {
  slider: HTMLElement;
  sliderIdent: number = 0;
  button: buttonSlider = {
    left: new LeftButton().button,
    right: new RigthButton().button,
  };
  currentValLeft: HTMLElement = document.createElement("div");
  currentValRight: HTMLElement = document.createElement("div");
  sliderRange: HTMLElement;
  intervalComponent: HTMLUListElement = document.createElement("ul");
  interval: Interval = new Interval();
  buttonWidth: number = 10;
  clickHandler: any = this.onMouseMove.bind(this);
  currentButton: HTMLElement = this.button.left;

  newObserver: Observer;
  state: IState;
  slideClass: SliderRange;

  constructor(state: IState) {
    this.state = state;
    this.slider = <HTMLElement>document.querySelector(this.state.selector);
    this.newObserver = new Observer();
    this.slideClass = new SliderRange(this.state.rotate);
    this.sliderRange = this.slideClass.sliderRange;

  }
  editView(newState: IState) {
    this.state = {
      ...newState,
    };
    this.slideClass.edit(this.state.rotate);
    this.interval.edit(this.state.rotate);
    // this.s = new SliderRange(this.state.rotate)
  }

  buttonLeftExpose() {
    this.button.left.addEventListener(
      "mousedown",
      this.buttonAction.bind(this)
    );
    this.sliderRange.append(this.button.left);
    if (this.state.show) {
      this.currentValLeft.className = "slider__current_value";
      this.sliderRange.append(this.currentValLeft);
    }

  }
  intervalExpose() {
    this.slider.append(this.interval.interval);
    this.renderInterval();
  }
  renderInterval() {
    this.interval.valueInterval(
      this.state.minValue,
      this.state.maxValue,
      this.state.intervalCount
    );
  }

  addElem() {
    this.sliderRange.append(this.button.right);
    this.slider.append(this.sliderRange);
  }
  addAction() {
    this.button.right.addEventListener(
      "mousedown",
      this.buttonAction.bind(this)
    );
    this.slider.addEventListener("click", this.resizeSLider.bind(this));
    this.slider.addEventListener("click", this.movePoint.bind(this));
    // this.newObserver.broadcast({
    //   procent: this.sliderRange.offsetWidth,
    // });
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
  sliderInit() {
    this.show();
    this.addElem();
    this.addAction();
    this.resizeSLider();
    this.buttonWidth = this.button.right.offsetWidth / 2;

  }
  show() {
    if (this.state.range === "two") {
      this.buttonLeftExpose();
    }
    if (this.state.showInterval) {
      this.intervalExpose();
    }
    if (this.state.show) {
      this.currentValRight.className = "slider__current_value";
      this.sliderRange.append(this.currentValRight);
    }
  }
 
  buttonAction(e: MouseEvent): void {
    document.addEventListener("mousemove", this.clickHandler);
    document.addEventListener("mouseup", this.remove.bind(this));

    // *********
    // *** нелогичность с left когда range one***
    // *********

    if (e.currentTarget === this.button.left) {
      this.currentButton = this.button.left;
    } else {
      this.currentButton = this.button.right;
    }

    if (this.state.range == "two") {
      this.button.left.ondragstart = () => false;
    }
    this.button.right.ondragstart = () => false;
  }
  remove() {
    document.removeEventListener("mousemove", this.clickHandler);
    document.onmouseup = null;
  }
  // установка значений
  installMove(min: number, max: number) {
    if (this.state.rotate === "horizontal") {
      this.sliderIdent = this.slider.offsetLeft;
    } else if (this.state.rotate === "vertical") {
      this.sliderIdent = this.slider.offsetTop;
    }

    this.initMove(this.mathValueCalc(min), this.mathValueCalc(max));
  }
  mathValueCalc(num: number): number{
    return ( num - this.state.minValue)/ (this.state.maxValue - this.state.minValue) * 100
  }
  // сброс позиций кнопок
  initMove(min: number, max: number) {

    Promise.resolve().then(() => {
      this.currentButton = this.button.left;
      
      this.moveButton(min);
      this.currentButton = this.button.right;
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
    
    if (this.currentButton === this.button.left) {
      this.newObserver.broadcast({
        shiftXl: pos,
      });
    } else if (this.currentButton === this.button.right) {
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
      this.currentValueText(this.state.currentVal1, this.state.currentVal2);
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

  currentValueText(value1: string, value2?: string) {
    if (this.currentButton === this.button.left) {
      this.currentValLeft.textContent = this.state.currentText1();
    } else {
      this.currentValRight.textContent = this.state.currentText2();
    }
  }
  showCurentValue() {
    if (this.state.rotate === "horizontal") {
      if (this.currentButton === this.button.left) {
        this.currentValLeft.style.left = `calc(${this.state.shiftXl}% - ${
        this.currentValLeft.offsetWidth / 2
          }px)`;
        
      } else {
        console.log(this.currentValRight.style.left);
        this.currentValRight.style.left = `calc(${this.state.shiftXr}% - ${
          this.currentValRight.offsetWidth/2
        }px)`;
        
      }
      
    } else if (this.state.rotate === "vertical") {
      if (this.currentButton === this.button.left) {
        this.currentValLeft.style.top = `calc(${this.state.shiftXl}% - ${
          this.currentValLeft.offsetHeight / 2
        }px)`;
        this.currentValLeft.style.left =
          -(+this.currentValLeft.offsetWidth + 15) + "px";
      } else {
        this.currentValRight.style.top = `calc(${this.state.shiftXr}% - ${
          this.currentValLeft.offsetHeight / 2
        }px)`;
        this.currentValRight.style.left =
          -(+this.currentValRight.offsetWidth + 15) + "px";
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
