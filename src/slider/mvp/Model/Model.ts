import { Coords, IState, StateEl } from '../../utils/Interface';
import { EventObserver } from '../../utils/EventObserver';
import { keyChanges, rotation } from '../../utils/constatnts';

class Model {
  private state: IState = {
    selector: 'slider-range', // селектор
    minValue: 0, // минимальное значение
    maxValue: 1200, // максимальное значение
    range: 'one', // 1 или 2 указателя
    rotate: rotation.HORIZONTAL, // ориентация vertical horizontal
    show: true, // показывать текущее значение над указателем
    showInterval: true, // показать интервал
    intervalCount: 2, // количество интервалов
    stepSize: 10, // шаг движения указателя в числах
    currentVal1: 22, // установка значений в числах
    currentVal2: 11, // установка значений в числах
    [keyChanges.SHIFT_XL]: 2,
    [keyChanges.SHIFT_XR]: 100,
    step: 0,
    activeLeft: false,
  };

  private percent = 0;

  public coords: Coords = {
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

  private edit(key: StateEl): void {
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
        this.step(+data[keyChanges.POSITION]);
        break;
      case keyChanges.COORDINATES:
        this.updateCoordinate(data[keyChanges.COORDINATES]);
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
    this.state = {
      ...this.state,
      ...key,
    };
    this.convertToNumber();
    this.observer.broadcast(this.stateCurrent);
  }

  private convertToNumber(): void {
    this.state.minValue = Model.convertCorrectNumber(this.state.minValue);
    this.state.maxValue = Model.convertCorrectNumber(this.state.maxValue);
    this.state.intervalCount = Model.convertCorrectNumber(
      this.state.intervalCount,
    );
    this.state.stepSize = Model.convertCorrectNumber(this.state.stepSize);
    this.state.currentVal1 = Model.convertCorrectNumber(this.state.currentVal1);
    this.state.currentVal2 = Model.convertCorrectNumber(this.state.currentVal2);
    this.state.shiftXl = ((this.state.currentVal2 - this.state.minValue)
        / (this.state.maxValue - this.state.minValue))
      * 100;
    this.state.shiftXr = ((this.state.currentVal1 - this.state.minValue)
        / (this.state.maxValue - this.state.minValue))
      * 100;
    this.state.shiftXr = Number.isFinite(this.state.shiftXr)
      ? Model.transformRange(this.state.shiftXr)
      : 0;
    this.state.shiftXl = Number.isFinite(this.state.shiftXl)
      ? Model.transformRange(this.state.shiftXl)
      : 0;
  }

  private updateCoordinate(coords: Coords): void {
    this.coords = {
      ...this.coords,
      ...coords,
    };
  }

  private step(position: number): void {
    const percent = this.mathPercent(position);
    if (this.state.stepSize) {
      this.state.step = this.mathStepCount(percent);
    } else {
      this.state.step = percent;
    }
  }

  private activeButton(): void {
    this.state.activeLeft = Math.abs(this.state.shiftXl - this.state.step)
      < Math.abs(this.state.shiftXr - this.state.step);
    if (this.state.shiftXl === this.state.shiftXr) {
      this.state.activeLeft = this.state.step < this.state.shiftXr;
    }
  }

  private mathPercent(num: number): number {
    if (this.state.rotate === rotation.HORIZONTAL) {
      return ((num - this.coords.x) / this.coords.width) * 100;
    }
    return ((num - this.coords.y) / this.coords.height) * 100;
  }

  private mathStepCount(num: number): number {
    this.percent = (this.state.stepSize
        / (this.state.maxValue - Math.abs(this.state.minValue)))
      * 100;
    return Math.round(num / this.percent) * this.percent;
  }

  private fixedCount(): number {
    let res = 0;
    const str: any = this.state.stepSize.toString();
    if (str.includes('.')) {
      res = str.split('.').pop().length;
    }
    return res;
  }

  private leftVal(): void {
    const res = ((this.state.maxValue - this.state.minValue) * this.state.shiftXl) / 100
      + this.state.minValue;
    this.state.currentVal2 = +res.toFixed(this.fixedCount());
  }

  private rightVal(): void {
    const res = ((this.state.maxValue - this.state.minValue) * this.state.shiftXr) / 100
      + this.state.minValue;
    this.state.currentVal1 = +res.toFixed(this.fixedCount());
  }

  private static convertCorrectNumber(num: string | number): number {
    const result = Number(num);
    if (Number.isNaN(result)) {
      return 0;
    }
    if (!Number.isFinite(result)) {
      return 0;
    }
    return result;
  }

  private static transformRange(num: number): number {
    let pos = num;
    if (pos <= 0) {
      pos = 0;
    } else if (pos >= 100) {
      pos = 100;
    }
    return pos;
  }
}

export { Model };
