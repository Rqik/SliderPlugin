import {Coords, IState, StateEl} from '../../utils/Interface';
import {EventObserver} from '../../utils/EventObserver';
import {keyChanges, rotation} from '../../utils/constatnts';

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
    currentValRight: 22, // установка значений в числах
    currentValLeft: 11, // установка значений в числах
    [keyChanges.SHIFT_LEFT]: 2,
    [keyChanges.SHIFT_RIGHT]: 100,
    step: 0,
    isActiveLeft: false,
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
      case keyChanges.SHIFT_LEFT:
        this.edit(data);
        this.defineLeftVal();
        break;
      case keyChanges.SHIFT_RIGHT:
        this.edit(data);
        this.defineRightVal();
        break;
      case keyChanges.POSITION:
        this.defineStep(+data[keyChanges.POSITION]);
        break;
      case keyChanges.COORDINATES:
        this.updateCoordinate(data[keyChanges.COORDINATES]);
        break;
      case keyChanges.ACTIVE:
        this.activeButton(data[keyChanges.ACTIVE]);
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
    this.state.currentValRight = Model.convertCorrectNumber(
      this.state.currentValRight,
    );
    this.state.currentValLeft = Model.convertCorrectNumber(
      this.state.currentValLeft,
    );
    this.state.shiftLeft = ((this.state.currentValLeft - this.state.minValue)
      / (this.state.maxValue - this.state.minValue))
      * 100;
    this.state.shiftRight = ((this.state.currentValRight - this.state.minValue)
      / (this.state.maxValue - this.state.minValue))
      * 100;
    this.state.shiftRight = Number.isFinite(this.state.shiftRight)
      ? Model.transformRange(this.state.shiftRight)
      : 0;
    this.state.shiftLeft = Number.isFinite(this.state.shiftLeft)
      ? Model.transformRange(this.state.shiftLeft)
      : 0;
  }

  private updateCoordinate(coords: Coords): void {
    this.coords = {
      ...this.coords,
      ...coords,
    };
  }

  private defineStep(position: number): void {
    const percent = this.mathPercent(position);
    if (this.state.stepSize > 0) {
      this.state.step = Model.transformRange(this.mathStepCount(percent));
    } else {
      this.state.step = Model.transformRange(percent);
    }
  }

  private activeButton(position : number): void {
    this.state.isActiveLeft = Math.abs(this.state[keyChanges.SHIFT_LEFT] - this.state.step)
      <= Math.abs(this.state[keyChanges.SHIFT_RIGHT] - this.state.step);
    if (
      this.state[keyChanges.SHIFT_LEFT] === this.state[keyChanges.SHIFT_RIGHT]
    ) {
      this.state.isActiveLeft = this.mathPercent(position) < this.state.shiftRight;
      if (this.state.step <= 0) {
        this.state.isActiveLeft = false;
      }
      if (this.state.step >= 100) {
        this.state.isActiveLeft = true;
      }
    }
  }

  private mathPercent(num: number): number {
    if (this.state.rotate === rotation.HORIZONTAL) {
      return ((num - this.coords.x) / this.coords.width) * 100;
    }
    return ((num - this.coords.y) / this.coords.height) * 100;
  }

  private mathStepCount(num: number): number {
    const difference = Math.abs(this.state.maxValue - this.state.minValue);
    if (difference === 0) {
      return Math.round(num / this.state.stepSize) * this.state.stepSize;
    }
    this.percent = (this.state.stepSize
      / Math.abs(this.state.maxValue - this.state.minValue))
      * 100;
    this.percent = Model.transformRange(this.percent);
    return Math.round(num / this.percent)* this.percent;
  }

  private fixedCount(): number {
    let res = 12;
    const str: any = this.state.stepSize.toString();
    if (str.includes('.')) {
      res = str.split('.').pop().length;
    }
    return res;
  }

  private defineLeftVal(): void {
    const res = (((this.state.maxValue - this.state.minValue) * this.state.shiftLeft)
      / 100) + this.state.minValue;
    this.state.currentValLeft = +res.toFixed(this.fixedCount());
  }

  private defineRightVal(): void {
    const res = (((this.state.maxValue - this.state.minValue) * this.state.shiftRight)
      / 100) + this.state.minValue;
    this.state.currentValRight = +res.toFixed(this.fixedCount());
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

export {Model};
