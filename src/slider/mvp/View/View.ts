import { boundMethod } from 'autobind-decorator';

import { CoordsType, StateProps } from '../../types/interfaces';
import { keyChanges, rotation } from '../../types/constants';
import Observer from '../../utils/EventObserver';
import {
  Button, Interval, SliderRange, Tooltip,
} from './SubView';

class View {
  private slider: HTMLElement = document.createElement('div');

  private buttonLeft: Button = new Button();

  private buttonRight: Button = new Button();

  private tooltipGeneral: Tooltip;

  private tooltipLeft: Tooltip;

  private tooltipRight: Tooltip;

  private interval: Interval;

  private readonly sliderRange: HTMLElement;

  private buttonWidth = 10;

  private positionEventTarget = 0;

  // абстрактный тумблер
  private currentButton: HTMLElement = this.buttonRight.button;

  private isLeftOn = false;

  public observer: Observer;

  private state: StateProps;

  private sliderClass: SliderRange;

  private coords: CoordsType = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  };

  constructor(state: StateProps) {
    this.state = state;
    this.observer = new Observer();
    this.tooltipLeft = new Tooltip(this.state.rotate);
    this.tooltipRight = new Tooltip(this.state.rotate);
    this.tooltipGeneral = new Tooltip(this.state.rotate);
    this.sliderClass = new SliderRange(this.state.rotate);
    this.interval = new Interval();
    this.sliderRange = this.sliderClass.sliderRange;
    this.init(this.state.selector);
  }

  setState(newState: StateProps): void {
    this.state = {
      ...this.state,
      ...newState,
    };
    this.sliderClass.edit(this.state.rotate);
    this.interval.edit(this.state.rotate);
    this.tooltipLeft.setRotate(this.state.rotate);
    this.tooltipRight.setRotate(this.state.rotate);
    this.tooltipGeneral.setRotate(this.state.rotate);
  }

  render(): void {
    View.removeStyle(this.slider);
    this.show();
    this.addElem();
    this.addAction();
    this.buttonWidth = this.buttonRight.width();
    this.notifyCoords(true);
    this.installMove();
  }

  private init(selector: string): void {
    this.slider = <HTMLElement>document.querySelector(selector);
    this.slider.style.position = 'relative';
    this.render();
  }

  private renderInterval(): void {
    this.interval.renderIntervals({
      min: this.state.min,
      max: this.state.max,
      count: this.state.intervalCount,
      intervalStep: this.state[keyChanges.INTERVAL_STEP],
    });
  }

  private addElem(): void {
    this.sliderRange.append(this.buttonRight.button);
    this.slider.append(this.sliderRange);
  }

  private addAction(): void {
    this.sliderRange.addEventListener('mousedown', this.handleClickMove);
    this.sliderRange.addEventListener('touchstart', this.handleClickMove);

    this.interval.items.forEach((item) => {
      item.addEventListener('mousedown', this.handleIntervalClick);
      item.addEventListener('touchstart', this.handleIntervalClick);
    });

    window.addEventListener('resize', this.handleResizeSlider);
  }

  @boundMethod
  private handleResizeSlider(): void {
    const {
      x, y, width, height,
    } = this.slider.getBoundingClientRect();
    const isChanged = width !== this.coords.width
      || height !== this.coords.height
      || x !== this.coords.x
      || y !== this.coords.y;
    this.notifyCoords(isChanged);
  }

  private notifyCoords(isNotify: boolean) {
    const {
      x, y, width, height,
    } = this.slider.getBoundingClientRect();
    if (isNotify) {
      this.coords = {
        x, y, width, height,
      };
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
        } as CoordsType,
      });
    }
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
    if (this.state.showTooltip) {
      this.tooltipRight.element.style.opacity = '1';
      this.sliderRange.append(this.tooltipRight.element);
    } else {
      this.tooltipGeneral.element.remove();
      this.tooltipLeft.element.remove();
      this.tooltipRight.element.remove();
      this.positionEventTarget = 0;
    }
  }

  private buttonLeftDisplay(): void {
    this.sliderRange.append(this.buttonLeft.button);
    if (this.state.showTooltip) {
      this.tooltipLeft.element.style.opacity = '1';
      this.sliderRange.append(this.tooltipLeft.element);
    }
  }

  private buttonLeftRemove(): void {
    this.tooltipGeneral.element.remove();
    this.buttonLeft.button.remove();
    this.tooltipLeft.element.remove();
    this.observer.broadcast({
      [keyChanges.SHIFT_LEFT]: 0,
    });
  }

  private intervalDisplay(): void {
    this.renderInterval();
    this.slider.append(this.interval.interval);
  }

  @boundMethod
  private handleIntervalClick(event: MouseEvent | TouchEvent): void {
    this.handleResizeSlider();
    if (event.cancelable) {
      event.preventDefault();
    }
    const value = event.target as HTMLElement;

    this.observerPosition(event);
    if (this.state.range === 'two') {
      this.overridingButtons(this.state.isActiveLeft);
    }

    this.observer.broadcast({
      [keyChanges.INTERVAL]: Number(value.textContent),
    });

    this.eventButton(this.state.step);
  }

  @boundMethod
  private buttonAction(event: MouseEvent | TouchEvent): void {
    if (event.cancelable) {
      event.preventDefault();
    }
    if (event instanceof MouseEvent) {
      document.addEventListener('mousemove', this.onMouseMove);
      document.addEventListener('mouseup', this.removeMouse);
      this.currentButton = <HTMLElement>event.currentTarget;
    } else {
      document.addEventListener('touchmove', this.onMouseMove);
      document.addEventListener('touchend', this.removeTouch);
      this.currentButton = <HTMLElement>event.targetTouches[0].target;
    }
    if (this.state.range === 'one') {
      this.currentButton = this.buttonRight.button;
    }

    this.isLeftOn = this.currentButton === this.buttonLeft.button;
    this.currentButton.ondragstart = () => false;
  }

  private getPositionEventTarget(target: HTMLElement, cordClient: number) {
    if (this.state.rotate === rotation.HORIZONTAL) {
      this.positionEventTarget = cordClient
        - target.getBoundingClientRect().left
        - target.offsetWidth / 2;
    } else {
      this.positionEventTarget = cordClient
        - target.getBoundingClientRect().top
        - target.offsetHeight / 2;
    }
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

  private observerPosition(evt: MouseEvent | TouchEvent) {
    const { cordClient, event } = this.getCordClientAndEvent(evt);

    const { target } = event;
    const isNotTooltip = target === this.sliderRange
      || target === this.sliderClass.sliderActiveZone
      || target === this.tooltipGeneral.element
      || this.state[keyChanges.SHIFT_LEFT] === this.state[keyChanges.SHIFT_RIGHT];

    if (isNotTooltip) {
      this.positionEventTarget = 0;
    }

    this.observer.broadcast({
      [keyChanges.POSITION]: cordClient - this.positionEventTarget,
    });

    if (this.state.range === 'two') {
      this.observer.broadcast({
        [keyChanges.ACTIVE]: cordClient - this.positionEventTarget,
      });
    }
  }

  private getCordClientAndEvent(evt: MouseEvent | TouchEvent) {
    let event;
    let cordClient = 0;

    if (evt instanceof MouseEvent) {
      event = evt;
    } else {
      [event] = evt.touches;
    }
    if (this.state.rotate === rotation.HORIZONTAL) {
      cordClient = event.clientX;
    }
    if (this.state.rotate === rotation.VERTICAL) {
      cordClient = event.clientY;
    }
    return { event, cordClient };
  }

  @boundMethod
  private handleClickMove(event: MouseEvent | TouchEvent): void {
    if (event.cancelable) {
      event.preventDefault();
    }

    let target;
    this.handleResizeSlider();

    const { cordClient } = this.getCordClientAndEvent(event);

    if (event instanceof MouseEvent) {
      target = <HTMLElement>event.target;
    } else {
      target = <HTMLElement>event.targetTouches[0].target;
    }

    this.getPositionEventTarget(target, cordClient);

    this.buttonAction(event);
    this.observerPosition(event);
    if (this.state.range === 'two') {
      this.overridingButtons(this.state.isActiveLeft);
    }

    const isTargetSlider = target === this.sliderRange
      || target === this.sliderClass.sliderActiveZone;

    if (isTargetSlider) {
      this.eventButton(this.state.step);
    }
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
      this.observer.broadcast({
        [keyChanges.SHIFT_LEFT]: pos,
      });
    } else {
      pos = this.state[keyChanges.SHIFT_LEFT] > pos
        ? this.state[keyChanges.SHIFT_LEFT]
        : pos;
      this.observer.broadcast({
        [keyChanges.SHIFT_RIGHT]: pos,
      });
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

    if (this.state.showTooltip) {
      this.currentValueText();
      this.showCurrentValue();
      if (this.state.range === 'two') {
        const oneCurrent = this.tooltipLeft.rectRight() >= this.tooltipRight.rectLeft();
        this.responsiveCurrent(oneCurrent);
      }
    }
    // размеры для активной зоны
    this.activeZoneAction();
  }

  private currentValueText(): void {
    if (this.isLeftOn) {
      this.tooltipLeft.text(this.state.minValue);
    } else {
      this.tooltipRight.text(this.state.maxValue);
    }
  }

  private responsiveCurrent(oneCurrent: boolean): void {
    if (oneCurrent) {
      this.sliderRange.append(this.tooltipGeneral.element);
      this.tooltipLeft.element.style.opacity = '0.4';
      this.tooltipRight.element.style.opacity = '0.4';
      this.tooltipGeneral.element.style.opacity = '1';
      this.tooltipGeneral.element.style.display = 'block';
      if (this.state.minValue === this.state.maxValue) {
        this.tooltipGeneral.text(`${this.state.minValue}`);
      } else {
        this.tooltipGeneral.text(
          `${this.state.minValue} — ${+this.state.maxValue}`,
        );
      }
      this.tooltipGeneral.position(
        (this.state.shiftRight + this.state.shiftLeft) / 2,
      );
    } else {
      this.tooltipGeneral.element.style.opacity = '0';
      this.tooltipGeneral.element.style.display = 'none';
      this.tooltipLeft.element.style.opacity = '1';
      this.tooltipRight.element.style.opacity = '1';
    }
  }

  private showCurrentValue(): void {
    if (this.isLeftOn) {
      this.tooltipLeft.position(this.state.shiftLeft);
    } else {
      this.tooltipRight.position(this.state.shiftRight);
    }
  }

  private activeZoneAction(): void {
    if (this.state.shiftLeft > this.state.shiftRight) {
      this.sliderClass.activeZone(this.state.shiftRight, this.state.shiftLeft);
    } else {
      this.sliderClass.activeZone(this.state.shiftLeft, this.state.shiftRight);
    }
  }
}

export default View;
