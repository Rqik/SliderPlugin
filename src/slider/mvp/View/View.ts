import { IState } from '../../utils/Interface';
import { keyChanges, rotation } from '../../utils/constatnts';
import { Button, Tooltip, Interval, SliderRange } from './SubView';
import { EventObserver as Observer } from '../../utils/EventObserver';

class View {
  private slider: HTMLElement = document.createElement('div');

  private buttonLeft: Button = new Button();

  private buttonRight: Button = new Button();

  private currentValGeneral: Tooltip;

  private currentValLeft: Tooltip;

  private currentValRight: Tooltip;

  private readonly sliderRange: HTMLElement;

  private interval: Interval = new Interval();

  private buttonWidth = 10;

  private clickHandler: (e: MouseEvent | TouchEvent) => void
    = this.onMouseMove.bind(this);

  private clickMoveHandler: (e: MouseEvent | TouchEvent) => void
    = this.onClickMove.bind(this);

  private mouseDownHandler: (e: MouseEvent | TouchEvent) => void
    = this.buttonAction.bind(this);

  private currentValHandler: (e: MouseEvent | TouchEvent) => void
    = this.currentButtonAction.bind(this);

  private currentButton: HTMLElement = this.buttonRight.button; // абстрактный тумблер

  private tumbler = false;

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
    this.sliderRange = this.slideClass.sliderRange;
    this.startView(this.state.selector);
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
    this.currentValGeneral.setRotate(this.state.rotate);
  }

  private renderInterval(): void {
    this.interval.valueInterval(
      this.state.minValue,
      this.state.maxValue,
      this.state.intervalCount,
    );
  }

  private addElem(): void {
    this.sliderRange.append(this.buttonRight.button);
    this.slider.append(this.sliderRange);
  }

  private addAction(): void {
    this.buttonRight.addEvent('mousedown', this.mouseDownHandler);
    this.buttonRight.addEvent('dragstart', this.mouseDownHandler);
    this.buttonRight.addEvent('touchstart', this.mouseDownHandler);
    this.currentValRight.tooltipVal.addEventListener(
      'mousedown',
      this.currentValHandler,
    );
    this.currentValRight.tooltipVal.addEventListener(
      'touchstart',
      this.currentValHandler,
    );
    if (this.state.range === 'two') {
      this.buttonLeft.addEvent('mousedown', this.mouseDownHandler);
      this.buttonLeft.addEvent('touchstart', this.mouseDownHandler);
      this.currentValLeft.tooltipVal.addEventListener(
        'touchstart',
        this.currentValHandler,
      );
      this.currentValLeft.tooltipVal.addEventListener(
        'mousedown',
        this.currentValHandler,
      );
    }
    this.sliderRange.addEventListener('mousedown', this.clickMoveHandler);
    this.sliderRange.addEventListener('touchstart', this.clickMoveHandler);
    window.addEventListener('resize', this.resizeSlider.bind(this));
  }

  private resizeSlider(): void {
    this.observer.broadcast({
      [keyChanges.WIDTH]: this.sliderRange.offsetWidth,
      [keyChanges.HEIGHT]: this.sliderRange.offsetHeight,
    });
    this.observer.broadcast({
      [keyChanges.COORDINATES]: {
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
      this.currentValRight.tooltipVal.style.opacity = '1';
      this.sliderRange.append(this.currentValRight.tooltipVal);
    } else {
      this.currentValGeneral.tooltipVal.remove();
      this.currentValLeft.tooltipVal.remove();
      this.currentValRight.tooltipVal.remove();
    }
  }

  private buttonLeftExpose(): void {
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

  private intervalExpose(): void {
    this.renderInterval();
    this.slider.append(this.interval.interval);
  }

  private currentButtonAction(e: MouseEvent | TouchEvent): void {
    let event;
    if (e instanceof MouseEvent) {
      event = <HTMLElement>e.currentTarget;
    } else {
      event = <HTMLElement>e.targetTouches[0].target;
    }

    if (this.currentValLeft.tooltipVal === event) {
      this.overridingButtons(true);
    } else {
      this.overridingButtons(false);
    }
    if (e instanceof MouseEvent) {
      document.addEventListener('mousemove', this.clickHandler);
      document.addEventListener('mouseup', this.removeMouse.bind(this));
    } else {
      document.addEventListener('touchmove', this.clickHandler);
      document.addEventListener('touchend', this.removeTouch.bind(this));
    }
    this.currentButton.ondragstart = () => false;
  }

  private buttonAction(e: MouseEvent | TouchEvent): void {
    if (e instanceof MouseEvent) {
      document.addEventListener('mousemove', this.clickHandler);
      document.addEventListener('mouseup', this.removeMouse.bind(this));
      this.currentButton = <HTMLElement>e.currentTarget;
    } else {
      document.addEventListener('touchmove', this.clickHandler);
      document.addEventListener('touchend', this.removeTouch.bind(this));
      this.currentButton = <HTMLElement>e.targetTouches[0].target;
    }
    if (this.state.range === 'one') {
      this.currentButton = this.buttonRight.button;
    }
    this.tumbler = this.currentButton === this.buttonLeft.button;
    this.currentButton.ondragstart = () => false;
  }

  private removeTouch(): void {
    document.removeEventListener('touchmove', this.clickHandler);
    document.onmouseup = null;
  }

  private removeMouse(): void {
    document.removeEventListener('mousemove', this.clickHandler);
    document.onmouseup = null;
  }

  private installMove(): void {
    this.initMove(this.state.shiftLeft, this.state.shiftRight);
  }

  // сброс позиций кнопок
  private initMove(min: number, max: number): void {
    this.overridingButtons(true);
    this.eventButton(min);
    this.overridingButtons(false);
    this.eventButton(max);
  }

  private onMouseMove(e: MouseEvent | TouchEvent): void {
    this.observerPosition(e);
    this.eventButton(this.state.step);
  }

  private observerPosition(e: MouseEvent | TouchEvent) {
    let event;
    if (e instanceof MouseEvent) {
      event = e;
    } else {
      [event] = e.touches;
    }
    if (this.state.rotate === rotation.HORIZONTAL) {
      this.observer.broadcast({ [keyChanges.POSITION]: event.clientX });
    } else if (this.state.rotate === rotation.VERTICAL) {
      this.observer.broadcast({ [keyChanges.POSITION]: event.clientY });
    }
  }

  private onClickMove(e: MouseEvent | TouchEvent): void {
    this.buttonAction(e);
    this.observerPosition(e);
    if (this.state.range === 'two') {
      this.observer.broadcast({ [keyChanges.ACTIVE]: true });
      this.overridingButtons(this.state.isActiveLeft);
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
      pos = this.state.shiftRight < pos ? this.state.shiftRight : pos;
      this.observer.broadcast({ [keyChanges.SHIFT_LEFT]: pos });
    } else {
      pos = this.state.shiftLeft > pos ? this.state.shiftLeft : pos;
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
    if (this.tumbler) {
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
      this.currentValGeneral.position((this.state.shiftRight + this.state.shiftLeft) / 2);
    } else {
      this.currentValGeneral.tooltipVal.style.opacity = '0';
      this.currentValGeneral.tooltipVal.style.display = 'none';
      this.currentValLeft.tooltipVal.style.opacity = '1';
      this.currentValRight.tooltipVal.style.opacity = '1';
    }
  }

  private showCurrentValue(): void {
    if (this.tumbler) {
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
