import { IState } from '../../utils/Interface';

import { Button, CurrentValue, Interval, SliderRange } from './SubView';
import { EventObserver as Observer } from '../../utils/EventObserver';

class View {
  private slider: HTMLElement = document.createElement('div');

  private buttonLeft: Button = new Button();

  private buttonRight: Button = new Button();

  private currentVal: CurrentValue;

  private currentValLeft: CurrentValue;

  private currentValRight: CurrentValue;

  private readonly sliderRange: HTMLElement;

  private interval: Interval = new Interval();

  private buttonWidth = 10;

  private clickHandler: (e: MouseEvent) => void = this.onMouseMove.bind(this);

  private clickMoveHandler: (e: MouseEvent) => void = this.onClickMove.bind(
    this,
  );

  private mouseDownHandler: (e: MouseEvent) => void = this.buttonAction.bind(
    this,
  );

  private currentButton: HTMLElement = this.buttonRight.button; // абстрактный тумблер

  private tumbler = false;

  public observer: Observer;

  private state: IState;

  private slideClass: SliderRange;

  constructor(state: IState) {
    this.state = state;
    this.observer = new Observer();
    this.currentValLeft = new CurrentValue(this.state.rotate);
    this.currentValRight = new CurrentValue(this.state.rotate);
    this.currentVal = new CurrentValue(this.state.rotate);
    this.slideClass = new SliderRange(this.state.rotate);
    this.sliderRange = this.slideClass.sliderRange;
    this.startView(this.state.selector);
    // this.sliderInit();
  }

  private startView(selector: string): void {
    this.slider = <HTMLElement>document.querySelector(selector);
    this.slider.style.position = 'relative';
  }

  public editView(newState: IState): void {
    this.state = {
      ...this.state,
      ...newState,
    };
    this.slideClass.edit(this.state.rotate);
    this.interval.edit(this.state.rotate);
    this.currentValLeft.setRotate(this.state.rotate);
    this.currentValRight.setRotate(this.state.rotate);
    this.currentVal.setRotate(this.state.rotate);
  }

  private renderInterval(): void {
    this.interval.valueInterval(
      this.state.minValue,
      this.state.maxValue,
      this.state.intervalCount,
      this.state.round,
    );
  }

  private addElem(): void {
    this.sliderRange.append(this.buttonRight.button);
    this.slider.append(this.sliderRange);
  }

  private addAction(): void {
    this.buttonRight.addEvent('mousedown', this.mouseDownHandler);
    this.buttonLeft.addEvent('mousedown', this.mouseDownHandler);
    this.currentValLeft.currentVal.addEventListener(
      'mousedown',
      this.mouseDownHandler,
    );
    this.currentValRight.currentVal.addEventListener(
      'mousedown',
      this.mouseDownHandler,
    );
    this.slider.addEventListener('mousedown', this.clickMoveHandler);
    window.addEventListener('resize', this.resizeSlider.bind(this));
  }

  private resizeSlider(): void {
    this.observer.broadcast({
      widthSlider: this.sliderRange.offsetWidth,
      heightSlider: this.sliderRange.offsetHeight,
    });
    this.observer.broadcast({
      coordinate: {
        x: this.slider.getBoundingClientRect().x,
        y: this.slider.getBoundingClientRect().y,
        width: this.slider.getBoundingClientRect().width,
        height: this.slider.getBoundingClientRect().height,
      },
    });
  }

  public render(): void {
    View.removeStyle(this.slider);
    this.show();
    this.addElem();
    this.addAction();
    this.buttonWidth = this.buttonRight.width();
    this.resizeSlider();
    this.installMove();
  }

  // eslint-disable-next-line class-methods-use-this
  private static removeStyle(el: HTMLElement): void {
    const s = el.querySelectorAll('[style]');
    s.forEach((elem: Element) => {
      elem.removeAttribute('style');
    });
  }

  private show(): void {
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

  private buttonLeftExpose(): void {
    this.sliderRange.append(this.buttonLeft.button);
    if (this.state.show) {
      this.currentValLeft.currentVal.style.opacity = '1';
      this.sliderRange.append(this.currentValLeft.currentVal);
    }
  }

  private buttonLeftRemove(): void {
    this.currentVal.currentVal.remove();
    this.buttonLeft.button.remove();
    this.currentValLeft.currentVal.remove();
    this.observer.broadcast({ shiftXl: 0 });
  }

  private intervalExpose(): void {
    this.renderInterval();
    this.slider.append(this.interval.interval);
  }

  private buttonAction(e: MouseEvent): void {
    document.addEventListener('mousemove', this.clickHandler);
    document.addEventListener('mouseup', this.remove.bind(this));

    this.currentButton = <HTMLElement>e.currentTarget;

    this.tumbler = this.currentButton === this.buttonLeft.button;
    this.currentButton.ondragstart = () => false;
  }

  private remove(): void {
    document.removeEventListener('mousemove', this.clickHandler);
    document.onmouseup = null;
  }

  private installMove(): void {
    this.initMove(this.state.shiftXl, this.state.shiftXr);
  }

  // сброс позиций кнопок
  private initMove(min: number, max: number): void {
    this.overridingButtons(true);
    this.eventButton(min);
    this.overridingButtons(false);
    this.eventButton(max);
  }

  private onMouseMove(e: MouseEvent): void {
    if (this.state.rotate === 'horizontal') {
      this.observer.broadcast({ position: e.clientX });
    } else if (this.state.rotate === 'vertical') {
      this.observer.broadcast({ position: e.clientY });
    }
    this.eventButton(this.state.step);
  }

  private onClickMove(e: MouseEvent): void {
    if (this.state.rotate === 'horizontal') {
      this.observer.broadcast({ position: e.clientX });
    } else if (this.state.rotate === 'vertical') {
      this.observer.broadcast({ position: e.clientY });
    }
    if (this.state.range === 'two') {
      this.observer.broadcast({ active: true });
      this.overridingButtons(this.state.activeLeft);
    }
    this.resizeSlider();
    this.onMouseMove(e);
  }

  private overridingButtons(bool: boolean): void {
    if (bool) {
      this.currentButton = this.buttonLeft.button;
      this.tumbler = true;
    } else {
      this.currentButton = this.buttonRight.button;
      this.tumbler = false;
    }
  }

  private eventButton(position: number): void {
    let pos = position;
    if (pos <= 0) {
      pos = 0;
    } else if (pos >= 100) {
      pos = 100;
    }
    if (this.tumbler) {
      pos = this.state.shiftXr < pos ? this.state.shiftXr : pos;
      this.observer.broadcast({ shiftXl: pos });
    } else {
      pos = this.state.shiftXl > pos ? this.state.shiftXl : pos;
      this.observer.broadcast({ shiftXr: pos });
    }
    this.moveButton(pos);
  }

  private moveButton(position: number): void {
    if (this.state.rotate === 'horizontal') {
      this.currentButton.style.left = `calc(${position}% - ${this.buttonWidth}px)`;
      this.currentButton.style.top = `${-this.state.heightSlider}px`;
    } else if (this.state.rotate === 'vertical') {
      this.currentButton.style.left = `${-this.state.widthSlider}px`;
      this.currentButton.style.top = `calc(${position}% - ${this.buttonWidth}px)`;
    }

    if (this.state.show) {
      this.currentValueText();
      this.showCurrentValue();
      if (this.state.range === 'two') {
        const oneCurrent =
          this.currentValLeft.rectRight() > this.currentValRight.rectLeft();
        this.responsiveCurrent(oneCurrent);
      }
    }

    // ----
    this.activeZoneAction();
    // размеры для активной зоны
    // ------
  }

  private currentValueText(): void {
    if (this.tumbler) {
      this.currentValLeft.text(this.state.currentVal2);
    } else {
      this.currentValRight.text(this.state.currentVal1);
    }
  }

  private responsiveCurrent(oneCurrent: boolean): void {
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

  private showCurrentValue(): void {
    if (this.tumbler) {
      this.currentValLeft.position(this.state.shiftXl);
    } else {
      this.currentValRight.position(this.state.shiftXr);
    }
  }

  private activeZoneAction(): void {
    if (this.state.shiftXl > this.state.shiftXr) {
      this.slideClass.activeZone(this.state.shiftXr, this.state.shiftXl);
    } else {
      this.slideClass.activeZone(this.state.shiftXl, this.state.shiftXr);
    }
  }
}

export { View };
