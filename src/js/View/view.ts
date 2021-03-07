import { IState } from '../Interface';

import { Interval, SliderRange, CurrentValue, Button } from './SubView';
import { EventObsever as Observer } from '../Observer';

class View {
  slider: HTMLElement = document.createElement('div');

  sliderIdent = 0;

  buttonLeft: Button = new Button();

  buttonRight: Button = new Button();

  currentVal: CurrentValue;

  currentValLeft: CurrentValue;

  currentValRight: CurrentValue;

  sliderRange: HTMLElement;

  interval: Interval = new Interval();

  buttonWidth = 10;

  clickHandler: (e: MouseEvent) => void = this.onMouseMove.bind(this);

  clickMovehandler: (e: MouseEvent) => void = this.onClickMove.bind(this);

  mouseDownHandler: (e: MouseEvent) => void = this.buttonAction.bind(this);

  currentButton: HTMLElement = this.buttonRight.button; // абстрактный тумблер

  tumbler = false;

  newObserver: Observer;

  state: IState;

  slideClass: SliderRange;

  constructor(state: IState) {
    this.state = state;
    this.newObserver = new Observer();
    this.currentValLeft = new CurrentValue(this.state.rotate);
    this.currentValRight = new CurrentValue(this.state.rotate);
    this.currentVal = new CurrentValue(this.state.rotate);
    this.slideClass = new SliderRange(this.state.rotate);
    this.sliderRange = this.slideClass.sliderRange;
    this.startView(this.state.selector);
    // this.sliderInit();
  }

  startView(selector: string): void {
    this.slider = <HTMLElement>document.querySelector(selector);
    this.slider.style.position = 'relative';
  }

  editView(newState: IState): void {
    this.state = {
      ...newState,
    };
    this.slideClass.edit(this.state.rotate);
    this.interval.edit(this.state.rotate);
    this.currentValLeft.setRotate(this.state.rotate);
    this.currentValRight.setRotate(this.state.rotate);
    this.currentVal.setRotate(this.state.rotate);
  }

  buttonLeftExpose(): void {
    this.sliderRange.append(this.buttonLeft.button);
    if (this.state.show) {
      this.sliderRange.append(this.currentValLeft.currentVal);
    }
  }

  buttonLeftRemove(): void {
    this.currentVal.currentVal.remove();

    this.buttonLeft.button.remove();
    this.currentValLeft.currentVal.remove();
  }

  intervalExpose(): void {
    this.renderInterval();
    this.slider.append(this.interval.interval);
  }

  renderInterval(): void {
    this.interval.valueInterval(
      this.state.minValue,
      this.state.maxValue,
      this.state.intervalCount,
      this.state.round,
    );
  }

  addElem(): void {
    this.sliderRange.append(this.buttonRight.button);
    this.slider.append(this.sliderRange);
  }

  addAction(): void {
    this.buttonRight.addEvent('mousedown', this.mouseDownHandler);
    this.slider.addEventListener('click', this.clickMovehandler);
    this.buttonLeft.addEvent('mousedown', this.mouseDownHandler);

    window.addEventListener('resize', this.resizeSLider.bind(this));
  }

  resizeSLider(): void {
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

  // eslint-disable-next-line class-methods-use-this
  removeStyle(el: HTMLElement): void {
    const s = el.querySelectorAll('[style]');
    s.forEach((elem: Element) => {
      elem.removeAttribute('style');
    });
  }

  reRender(): void {
    this.slider.innerHTML = '';
    this.removeStyle(this.slider);
    this.show();
    this.addElem();
    this.buttonWidth = this.buttonRight.width();
  }

  sliderInit(): void {
    this.removeStyle(this.slider);
    this.show();
    this.addElem();
    this.addAction();
    this.resizeSLider();
    this.buttonWidth = this.buttonRight.width();
  }

  show(): void {
    if (this.state.range === 'two') {
      this.buttonLeftExpose();
    } else {
      this.buttonLeftRemove();
    }
    if (this.state.showInterval) {
      this.intervalExpose();
    } else {
      this.interval.interval.remove();
    }
    if (this.state.show) {
      this.currentValRight.currentVal.style.opacity = '1';
      this.sliderRange.append(this.currentValRight.currentVal);
    } else {
      this.currentVal.currentVal.remove();
      this.currentValLeft.currentVal.remove();
      this.currentValRight.currentVal.remove();
    }
  }

  buttonAction(e: MouseEvent): void {
    document.addEventListener('mousemove', this.clickHandler);
    document.addEventListener('mouseup', this.remove.bind(this));

    this.currentButton = <HTMLElement>e.currentTarget;

    if (this.currentButton === this.buttonLeft.button) {
      this.tumbler = true;
    } else {
      this.tumbler = false;
    }
    this.currentButton.ondragstart = () => false;
  }

  remove(): void {
    document.removeEventListener('mousemove', this.clickHandler);
    document.onmouseup = null;
  }

  installMove(min: number, max: number): void {
    if (this.state.rotate === 'horizontal') {
      this.sliderIdent = this.slider.offsetLeft;
    } else if (this.state.rotate === 'vertical') {
      this.sliderIdent = this.slider.offsetTop;
    }
    if (this.state.range === 'two') {
      this.initMove(this.mathValueCalc(min), this.mathValueCalc(max));
    } else {
      this.initMove(
        this.mathValueCalc(this.state.minValue),
        this.mathValueCalc(max),
      );
    }
  }

  mathValueCalc(num: number): number {
    return (
      ((num - this.state.minValue) /
        (this.state.maxValue - this.state.minValue)) *
      100
    );
  }

  // сброс позиций кнопок
  initMove(min: number, max: number): void {
    this.overridingButtons(true);
    this.eventButton(min);
    this.overridingButtons(false);
    this.eventButton(max);
  }

  overridingButtons(bool: boolean): void {
    if (bool) {
      this.currentButton = this.buttonLeft.button;
      this.tumbler = true;
    } else {
      this.currentButton = this.buttonRight.button;
      this.tumbler = false;
    }
  }

  onMouseMove(e: MouseEvent): void {
    let perc = 0;
    if (this.state.rotate === 'horizontal') {
      perc = this.mathPercent(e.pageX);
    } else if (this.state.rotate === 'vertical') {
      perc = this.mathPercent(e.pageY);
    }

    if (this.state.stepSizePerc) {
      this.eventButton(this.mathStepPercent(perc));
    } else if (this.state.stepSize > 1) {
      this.eventButton(this.mathStepPixel(perc));
    } else {
      this.eventButton(perc);
    }
  }

  onClickMove(e: MouseEvent): void {
    let perc;
    if (this.state.rotate === 'horizontal') {
      perc = this.mathPercent(e.pageX);
    } else {
      perc = this.mathPercent(e.pageY);
    }
    if (this.state.range === 'two') {
      const bool =
        Math.abs(perc - this.state.shiftXl) <
        Math.abs(perc - this.state.shiftXr);

      this.overridingButtons(bool);
    }

    this.onMouseMove(e);
  }

  mathStepPercent(num: number): number {
    return Math.round(num / this.state.stepSizePerc) * this.state.stepSizePerc;
  }

  // перевод в проценты
  mathPercent(num: number): number {
    if (this.state.rotate === 'horizontal') {
      return ((num - this.slider.offsetLeft) / this.slider.offsetWidth) * 100;
    }
    return ((num - this.slider.offsetTop) / this.slider.offsetHeight) * 100;
  }

  mathStepPixel(num: number): number {
    return Math.round(num / this.state.stepSize) * this.state.stepSize;
  }

  mathBalanceLeft(position: number): number {
    let pos = position;
    if (this.state.stepSizePerc) {
      pos = this.state.shiftXr - this.state.stepSizePerc;
    } else if (this.state.stepSize) {
      pos = this.state.shiftXr - this.mathPercent(this.state.stepSize);
    } else {
      pos = this.state.shiftXr;
    }

    return pos;
  }

  mathBalanceRigth(position: number): number {
    let pos = position;
    if (this.state.stepSizePerc) {
      pos = this.state.shiftXl + this.state.stepSizePerc;
    } else if (this.state.stepSize) {
      pos = this.state.shiftXl + this.mathPercent(this.state.stepSize);
    } else {
      pos = this.state.shiftXl;
    }
    return pos;
  }

  // формула расчета для шага

  eventButton(position: number): void {
    let pos = position;

    if (pos <= 0) {
      pos = 0;
    } else if (pos >= 100) {
      pos = 100;
    }

    if (this.tumbler) {
      pos = this.state.shiftXr > pos ? pos : this.mathBalanceLeft(pos);
      this.newObserver.broadcast({
        shiftXl: pos,
      });
    } else {
      pos = this.state.shiftXl < pos ? pos : this.mathBalanceRigth(pos);
      this.newObserver.broadcast({
        shiftXr: pos,
      });
    }

    this.moveButton(pos);
  }

  moveButton(position: number): void {
    if (this.state.rotate === 'horizontal') {
      this.currentButton.style.left = `calc(${position}% - ${this.buttonWidth}px)`;
      this.currentButton.style.top = `${-this.state.heightSlider}px`;
    } else if (this.state.rotate === 'vertical') {
      this.currentButton.style.left = `${-this.state.widthSlider}px`;
      this.currentButton.style.top = `calc(${position}% - ${this.buttonWidth}px)`;
    }

    if (this.state.show) {
      this.currentValueText();
      this.showCurentValue();
      if (this.state.range === 'two') {
        const oneCurrent =
          this.currentValLeft.rectRigth() > this.currentValRight.rectLeft();
        this.responsiveCurrent(oneCurrent);
      }
    }

    // ----
    this.activeZoneAction();
    // размеры для активной зоны
    // ------
  }

  currentValueText(): void {
    if (this.tumbler) {
      this.currentValLeft.text(this.state.currentVal2);
    } else {
      this.currentValRight.text(this.state.currentVal1);
    }
  }

  responsiveCurrent(oneCurrent: boolean): void {
    if (oneCurrent) {
      this.sliderRange.append(this.currentVal.currentVal);
      this.currentValLeft.currentVal.style.opacity = '0';
      this.currentValRight.currentVal.style.opacity = '0';
      this.currentVal.currentVal.style.opacity = '1';
      this.currentVal.currentVal.style.display = 'block';

      if (this.state.currentVal2 === this.state.currentVal1) {
        this.currentVal.text(`${this.state.currentVal2}`);
      } else {
        this.currentVal.text(
          `${this.state.currentVal2} - ${+this.state.currentVal1}`,
        );
      }
      this.currentVal.position((this.state.shiftXr + this.state.shiftXl) / 2);
    } else {
      this.currentVal.currentVal.style.opacity = '0';
      this.currentVal.currentVal.style.display = 'none';
      this.currentValLeft.currentVal.style.opacity = '1';
      this.currentValRight.currentVal.style.opacity = '1';
    }
  }

  showCurentValue(): void {
    if (this.tumbler) {
      this.currentValLeft.position(this.state.shiftXl);
    } else {
      this.currentValRight.position(this.state.shiftXr);
    }
  }

  activeZoneAction(): void {
    if (this.state.shiftXl > this.state.shiftXr) {
      this.slideClass.activeZone(this.state.shiftXr, this.state.shiftXl);
    } else {
      this.slideClass.activeZone(this.state.shiftXl, this.state.shiftXr);
    }
  }
}

export { View };
