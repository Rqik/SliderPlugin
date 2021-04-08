import { Coordinate, IState, StateEl } from '../../utils/Interface';
import { EventObserver } from '../../utils/EventObserver';
import { keyChanges, rotation } from '../../utils/constatnts';

class Model {
  private state: IState = {
    selector: 'slider-range', // селектор
    minValue: 0, // минимальное значение
    maxValue: 1200, // максимальное значение
    range: 'two', // 1 или 2 указателя
    rotate: rotation.HORIZONTAL, // ориентация vertical horizontal
    show: true, // показывать текущее значение над указателем
    showInterval: true, // показать интервал
    intervalCount: 2, // количество интервалов
    stepSizePercent: 0, // шаг движения указателя в %
    stepSize: 1, // шаг движения указателя в px
    currentVal1: 22, // установка значений в числах
    currentVal2: 11, // установка значений в числах
    round: 1, // округление,
    shiftXl: 2,
    shiftXr: 100,
    step: 0,
    activeLeft: false,
  };

  public coordinates: Coordinate = {
    x: 0,
    y: 0,
    height: 0,
    width: 0,
  };

  public observer: EventObserver;

  constructor(selector = 'slider-rqik') {
    this.state.selector = selector;
    this.observer = new EventObserver();
  }

  get stateCurrent(): IState {
    return this.state;
  }

  edit(key: StateEl): void {
    this.state = {
      ...this.state,
      ...key,
    };

    this.observer.broadcast(this.stateCurrent);
  }

  editState(data: StateEl | any): void {
    switch (Object.keys(data)[0]) {
      case keyChanges.SHIFT_XL:
        this.edit(data);
        this.leftVal();
        break;
      case keyChanges.SHIFT_XR:
        this.edit(data);
        this.rightVal();
        break;
      case keyChanges.POSITION:
        this.step(+data.position);
        break;
      case keyChanges.COORDINATES:
        this.updateCoordinate(data.coordinate);
        break;
      case keyChanges.ACTIVE:
        this.activeButton();
        break;
      default:
        this.edit(data);
        break;
    }

    this.observer.broadcast(this.stateCurrent);
  }

  editMode(key: StateEl): void {
    this.edit(key);
    this.state.minValue = Number(this.state.minValue);
    this.state.maxValue = Number(this.state.maxValue);
    this.state.intervalCount = Number(this.state.intervalCount);
    this.state.stepSize = Number(this.state.stepSize);
    this.state.stepSizePercent = Number(this.state.stepSizePercent);
    this.state.currentVal1 = Number(this.state.currentVal1);
    this.state.currentVal2 = Number(this.state.currentVal2);
    this.state.round = Number(this.state.round);
    this.state.shiftXl =
      ((this.state.currentVal2 - this.state.minValue) /
        (this.state.maxValue - this.state.minValue)) *
      100;
    this.state.shiftXr =
      ((this.state.currentVal1 - this.state.minValue) /
        (this.state.maxValue - this.state.minValue)) *
      100;
  }

  private updateCoordinate(coordinate: Coordinate) {
    this.coordinates = {
      ...this.coordinates,
      ...coordinate,
    };
  }

  private step(position: number) {
    const percent = this.mathPercent(position);
    if (this.state.stepSizePercent) {
      this.state.step = this.mathStepPercent(percent);
    } else if (this.state.stepSize > 1) {
      this.state.step = this.mathStepPixel(percent);
    } else {
      this.state.step = percent;
    }
  }

  private activeButton() {
    this.state.activeLeft =
      Math.abs(this.state.shiftXl - this.state.step) <
      Math.abs(this.state.shiftXr - this.state.step);
    if (this.state.shiftXl === this.state.shiftXr) {
      this.state.activeLeft = this.state.step < this.state.shiftXr;
    }
  }

  private mathPercent(num: number): number {
    if (this.state.rotate === rotation.HORIZONTAL) {
      return ((num - this.coordinates.x) / this.coordinates.width) * 100;
    }
    return ((num - this.coordinates.y) / this.coordinates.height) * 100;
  }

  private mathStepPercent(num: number): number {
    return (
      Math.round(num / this.state.stepSizePercent) * this.state.stepSizePercent
    );
  }

  private mathStepPixel(num: number): number {
    return Math.round(num / this.state.stepSize) * this.state.stepSize;
  }

  private leftVal(): void {
    const t = this.state;
    const res = ((t.maxValue - t.minValue) * t.shiftXl) / 100 + t.minValue;
    t.currentVal2 = Math.round(res * 10 ** t.round) / 10 ** t.round;
  }

  private rightVal(): void {
    const t = this.state;
    const res = Number(
      ((t.maxValue - t.minValue) * t.shiftXr) / 100 + t.minValue,
    );
    t.currentVal1 = Number(Math.round(res * 10 ** t.round) / 10 ** t.round);
  }
}

export { Model };
