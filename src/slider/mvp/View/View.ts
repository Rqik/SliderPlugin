import { boundMethod } from 'autobind-decorator';

import { IState } from '../../types/interfaces';
import { keyChanges, rotation } from '../../types/constants';
import { EventObserver as Observer } from '../../utils/EventObserver';
import { Button, Interval, SliderRange, Tooltip } from './SubView';

class View {
  private slider: HTMLElement = document.createElement('div');

  private buttonLeft: Button = new Button();

  private buttonRight: Button = new Button();

  private currentValGeneral: Tooltip;

  private currentValLeft: Tooltip;

  private currentValRight: Tooltip;

  private interval: Interval;

  private readonly sliderRange: HTMLElement;

  private buttonWidth = 10;

  private currentButton: HTMLElement = this.buttonRight.button; // абстрактный тумблер

  private isLeftOn = false;

  public observer: Observer;

  private state: IState;

  private slideClass: SliderRange;

  constructor(state: IState) {
    this.state = state;
    this.observer = new Observer();
    this.currentValLeft = new Tooltip(this.state.rotate);
    this.currentValRight = new Tooltip(this.state.rotate);
    this.currentValGeneral = new Tooltip(this.state.rotate);
    this.slideClass = new SliderRange(this.state.rotate);
    this.interval = new Interval();
    this.sliderRange = this.slideClass.sliderRange;
    this.startView(this.state.selector);
  }

  editView(newState: IState): void {
    this.state = {
      ...this.state,
      ...newState,
    };
    this.slideClass.edit(this.state.rotate);
    this.interval.edit(this.state.rotate);
    this.currentValLeft.setRotate(this.state.rotate);
    this.currentValRight.setRotate(this.state.rotate);
    this.currentValGeneral.setRotate(this.state.rotate);
  }

  render(): void {
    View.removeStyle(this.slider);
    this.show();
    this.addElem();
    this.addAction();
    this.buttonWidth = this.buttonRight.width();
    this.resizeSlider();
    this.installMove();
  }

  private startView(selector: string): void {
    this.slider = <HTMLElement>document.querySelector(selector);
    this.slider.style.position = 'relative';
  }

  private renderInterval(): void {
    this.interval.renderIntervals({
      minValue: this.state.minValue,
      maxValue: this.state.maxValue,
      count: this.state.intervalCount,
      intervalStep: this.state[keyChanges.INTERVAL_STEP],
    });
  }

  private addElem(): void {
    this.sliderRange.append(this.buttonRight.button);
    this.slider.append(this.sliderRange);
  }

  private addAction(): void {
    this.sliderRange.addEventListener('mousedown', this.onClickMove);
    this.sliderRange.addEventListener('touchstart', this.onClickMove);
    this.interval.items.forEach((item) => {
      item.addEventListener('mousedown', this.onClickInterval);
      item.addEventListener('touchstart', this.onClickInterval);
    });

    window.addEventListener('resize', this.resizeSlider);
  }

  @boundMethod
  private resizeSlider(): void {
    const { x, y, width, height } = this.slider.getBoundingClientRect();

    this.observer.broadcast({
      [keyChanges.WIDTH]: this.sliderRange.offsetWidth,
      [keyChanges.HEIGHT]: this.sliderRange.offsetHeight,
    });
    this.observer.broadcast({
      [keyChanges.COORDINATES]: {
        x,
        y,
        width,
        height,
      },
    });
  }

  private static removeStyle(el: HTMLElement): void {
    const s = el.querySelectorAll('[style]');
    s.forEach((elem: Element) => {
      elem.removeAttribute('style');
    });
  }

  private show(): void {
    if (this.state.range === 'two') {
      this.buttonLeftDisplay();
    } else {
      this.buttonLeftRemove();
    }
    if (this.state.showInterval) {
      this.intervalDisplay();
    } else {
      this.interval.interval.remove();
    }
    if (this.state.show) {
      this.currentValRight.tooltipVal.style.opacity = '1';
      this.sliderRange.append(this.currentValRight.tooltipVal);
    } else {
      this.currentValGeneral.tooltipVal.remove();
      this.currentValLeft.tooltipVal.remove();
      this.currentValRight.tooltipVal.remove();
    }
  }

  private buttonLeftDisplay(): void {
    this.sliderRange.append(this.buttonLeft.button);
    if (this.state.show) {
      this.currentValLeft.tooltipVal.style.opacity = '1';
      this.sliderRange.append(this.currentValLeft.tooltipVal);
    }
  }

  private buttonLeftRemove(): void {
    this.currentValGeneral.tooltipVal.remove();
    this.buttonLeft.button.remove();
    this.currentValLeft.tooltipVal.remove();
    this.observer.broadcast({ [keyChanges.SHIFT_LEFT]: 0 });
  }

  private intervalDisplay(): void {
    this.renderInterval();
    this.slider.append(this.interval.interval);
  }

  @boundMethod
  private onClickInterval(event: MouseEvent | TouchEvent): void {
    if (event.cancelable) {
      event.preventDefault();
    }
    const value = event.target as HTMLElement;

    this.observerPosition(event);
    if (this.state.range === 'two') {
      this.overridingButtons(this.state.isActiveLeft);
    }

    this.observer.broadcast({ [keyChanges.INTERVAL]: value.textContent });

    this.eventButton(this.state.step);
  }

  @boundMethod
  private buttonAction(e: MouseEvent | TouchEvent): void {
    if (e.cancelable) {
      e.preventDefault();
    }
    if (e instanceof MouseEvent) {
      document.addEventListener('mousemove', this.onMouseMove);
      document.addEventListener('mouseup', this.removeMouse);
      this.currentButton = <HTMLElement>e.currentTarget;
    } else {
      document.addEventListener('touchmove', this.onMouseMove);
      document.addEventListener('touchend', this.removeTouch);
      this.currentButton = <HTMLElement>e.targetTouches[0].target;
    }
    if (this.state.range === 'one') {
      this.currentButton = this.buttonRight.button;
    }

    this.isLeftOn = this.currentButton === this.buttonLeft.button;
    this.currentButton.ondragstart = () => false;
  }

  @boundMethod
  private removeTouch(): void {
    document.removeEventListener('touchmove', this.onMouseMove);
    document.ontouchend = null;
  }

  @boundMethod
  private removeMouse(): void {
    document.removeEventListener('mousemove', this.onMouseMove);
    document.onmouseup = null;
  }

  private installMove(): void {
    this.initMove(
      this.state[keyChanges.SHIFT_LEFT],
      this.state[keyChanges.SHIFT_RIGHT],
    );
  }

  // инициализация позиций кнопок
  private initMove(min: number, max: number): void {
    this.overridingButtons(true);
    this.eventButton(min);
    this.overridingButtons(false);
    this.eventButton(max);
  }

  @boundMethod
  private onMouseMove(event: MouseEvent | TouchEvent): void {
    this.observerPosition(event);
    this.eventButton(this.state.step);
  }

  private observerPosition(e: MouseEvent | TouchEvent) {
    let event;
    let cordClient;
    if (e instanceof MouseEvent) {
      event = e;
    } else {
      [event] = e.touches;
    }

    if (this.state.rotate === rotation.HORIZONTAL) {
      cordClient = event.clientX;
    } else if (this.state.rotate === rotation.VERTICAL) {
      cordClient = event.clientY;
    }

    this.observer.broadcast({ [keyChanges.POSITION]: cordClient });

    if (this.state.range === 'two') {
      this.observer.broadcast({ [keyChanges.ACTIVE]: cordClient });
    }
  }

  @boundMethod
  private onClickMove(event: MouseEvent | TouchEvent): void {
    this.buttonAction(event);
    this.observerPosition(event);
    if (this.state.range === 'two') {
      this.overridingButtons(this.state.isActiveLeft);
    }
    this.resizeSlider();
    this.eventButton(this.state.step);
  }

  private overridingButtons(bool: boolean): void {
    if (bool) {
      this.currentButton = this.buttonLeft.button;
      this.isLeftOn = true;
    } else {
      this.currentButton = this.buttonRight.button;
      this.isLeftOn = false;
    }
  }

  private eventButton(position: number): void {
    let pos = position;

    if (this.isLeftOn) {
      pos = this.state[keyChanges.SHIFT_RIGHT] < pos
        ? this.state[keyChanges.SHIFT_RIGHT]
        : pos;
      this.observer.broadcast({ [keyChanges.SHIFT_LEFT]: pos });
    } else {
      pos = this.state[keyChanges.SHIFT_LEFT] > pos
        ? this.state[keyChanges.SHIFT_LEFT]
        : pos;
      this.observer.broadcast({ [keyChanges.SHIFT_RIGHT]: pos });
    }

    this.moveButton(pos);
  }

  private moveButton(position: number): void {
    if (this.state.rotate === rotation.HORIZONTAL) {
      this.currentButton.style.left = `calc(${position}% - ${this.buttonWidth}px)`;
      this.currentButton.style.top = `${-this.state.heightSlider}px`;
    } else if (this.state.rotate === rotation.VERTICAL) {
      this.currentButton.style.left = `${-this.state.widthSlider}px`;
      this.currentButton.style.top = `calc(${position}% - ${this.buttonWidth}px)`;
    }

    if (this.state.show) {
      this.currentValueText();
      this.showCurrentValue();
      if (this.state.range === 'two') {
        const oneCurrent = this.currentValLeft.rectRight() > this.currentValRight.rectLeft();
        this.responsiveCurrent(oneCurrent);
      }
    }
    // размеры для активной зоны
    this.activeZoneAction();
  }

  private currentValueText(): void {
    if (this.isLeftOn) {
      this.currentValLeft.text(this.state.currentValLeft);
    } else {
      this.currentValRight.text(this.state.currentValRight);
    }
  }

  private responsiveCurrent(oneCurrent: boolean): void {
    if (oneCurrent) {
      this.sliderRange.append(this.currentValGeneral.tooltipVal);
      this.currentValLeft.tooltipVal.style.opacity = '0';
      this.currentValRight.tooltipVal.style.opacity = '0';
      this.currentValGeneral.tooltipVal.style.opacity = '1';
      this.currentValGeneral.tooltipVal.style.display = 'block';

      if (this.state.currentValLeft === this.state.currentValRight) {
        this.currentValGeneral.text(`${this.state.currentValLeft}`);
      } else {
        this.currentValGeneral.text(
          `${this.state.currentValLeft} — ${+this.state.currentValRight}`,
        );
      }
      this.currentValGeneral.position(
        (this.state.shiftRight + this.state.shiftLeft) / 2,
      );
    } else {
      this.currentValGeneral.tooltipVal.style.opacity = '0';
      this.currentValGeneral.tooltipVal.style.display = 'none';
      this.currentValLeft.tooltipVal.style.opacity = '1';
      this.currentValRight.tooltipVal.style.opacity = '1';
    }
  }

  private showCurrentValue(): void {
    if (this.isLeftOn) {
      this.currentValLeft.position(this.state.shiftLeft);
    } else {
      this.currentValRight.position(this.state.shiftRight);
    }
  }

  private activeZoneAction(): void {
    if (this.state.shiftLeft > this.state.shiftRight) {
      this.slideClass.activeZone(this.state.shiftRight, this.state.shiftLeft);
    } else {
      this.slideClass.activeZone(this.state.shiftLeft, this.state.shiftRight);
    }
  }
}

export { View };
