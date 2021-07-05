import { EventObserver } from '../../utils/EventObserver';
import {
  Coords,
  IState,
  IStateEl,
  UniversalSate,
} from '../../types/interfaces';
import { keyChanges, rotation } from '../../types/constants';

class Model {
  public observer: EventObserver;

  public coords: Coords = {
    x: 0,
    y: 0,
    height: 0,
    width: 0,
  };

  private state: IState = {
    selector: 'slider-range', // селектор
    minValue: 0, // минимальное значение
    maxValue: 1000, // максимальное значение
    range: 'one', // 1 или 2 указателя
    rotate: rotation.HORIZONTAL, // ориентация vertical || horizontal
    showTooltip: true, // показывать текущее значение над указателем
    showInterval: true, // показать интервал
    intervalCount: 2, // количество интервалов
    stepSize: 1, // шаг движения указателя в числах
    currentValRight: 50, // установка значений в числах
    currentValLeft: 0, // установка значений в числах
    [keyChanges.SHIFT_LEFT]: 0,
    [keyChanges.SHIFT_RIGHT]: 0,
    step: 0, // процентные значение от 0 до 100
    isActiveLeft: false,
    intervalStep: 0,
  };

  private percent = 0;

  constructor(selector = 'slider-rqik') {
    this.state.selector = selector;
    this.observer = new EventObserver();
  }

  get stateCurrent(): IState {
    return { ...this.state };
  }

  editState(data: UniversalSate): void {
    switch (Object.keys(data)[0]) {
      case keyChanges.ACTIVE:
        this.activeButton(data[keyChanges.ACTIVE] as number);
        break;
      case keyChanges.SHIFT_LEFT:
        this.edit(data);
        this.defineLeftVal();
        break;
      case keyChanges.SHIFT_RIGHT:
        this.edit(data);
        this.defineRightVal();
        break;
      case keyChanges.POSITION:
        this.defineStep(Number(data[keyChanges.POSITION]));
        break;
      case keyChanges.COORDINATES:
        this.updateCoordinate(data[keyChanges.COORDINATES] as Coords);
        break;
      case keyChanges.INTERVAL:
        this.state.step = this.convertNumberInPercent(
          Number(data[keyChanges.INTERVAL]),
        );
        break;
      default:
        this.edit(data);
        break;
    }
    this.observer.broadcast(this.stateCurrent);
  }

  editMode(key: IStateEl): void {
    this.state = {
      ...this.state,
      ...key,
    };
    this.convertToNumber();
    this.observer.broadcast(this.stateCurrent);
  }

  private edit(key: IStateEl): void {
    this.state = {
      ...this.state,
      ...key,
    };
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

    this.state.shiftLeft = this.validStep(
      this.convertNumberInPercent(this.state.currentValLeft),
    );
    this.state.shiftRight = this.validStep(
      this.convertNumberInPercent(this.state.currentValRight),
    );
    this.state.shiftRight = Number.isFinite(this.state.shiftRight)
      ? Model.transformRange(this.state.shiftRight)
      : 0;
    this.state.shiftLeft = Number.isFinite(this.state.shiftLeft)
      ? Model.transformRange(this.state.shiftLeft)
      : 0;
    this.state[keyChanges.INTERVAL_STEP] = this.defineIntervalStep();
  }

  private updateCoordinate(coords: Coords): void {
    this.coords = {
      ...this.coords,
      ...coords,
    };
  }

  private defineStep(position: number): void {
    const percent = this.mathPositionToPercent(position);
    this.state.step = this.validStep(percent);
  }

  private validStep(percent: number): number {
    if (percent >= 100 || percent <= 0) {
      return Model.transformRange(percent);
    }
    if (this.state.stepSize > 0) {
      return Model.transformRange(this.mathStepCount(percent));
    }
    return Model.transformRange(percent);
  }

  private activeButton(position: number): void {
    this.state.isActiveLeft = Math.abs(this.state[keyChanges.SHIFT_LEFT] - this.state.step)
      <= Math.abs(this.state[keyChanges.SHIFT_RIGHT] - this.state.step);

    if (
      this.state[keyChanges.SHIFT_LEFT] === this.state[keyChanges.SHIFT_RIGHT]
    ) {
      this.state.isActiveLeft = this.mathPositionToPercent(position) < this.state.shiftRight;

      this.checkExtremePoint();
    }
  }

  private checkExtremePoint(): void {
    const isRightEdge = this.state.step <= 0 && this.state.shiftRight <= 0;
    const isLeftEdge = this.state.step >= 100 && this.state.shiftLeft >= 100;
    if (isRightEdge) {
      this.state.isActiveLeft = false;
    }
    if (isLeftEdge) {
      this.state.isActiveLeft = true;
    }
  }

  private mathPositionToPercent(position: number): number {
    if (this.state.rotate === rotation.HORIZONTAL) {
      return ((position - this.coords.x) / this.coords.width) * 100;
    }
    return ((position - this.coords.y) / this.coords.height) * 100;
  }

  private mathStepCount(percent: number): number {
    const difference = Math.abs(this.state.maxValue - this.state.minValue);
    if (difference === 0) {
      return Math.round(percent / this.state.stepSize) * this.state.stepSize;
    }

    this.percent = (this.state.stepSize
        / Math.abs(this.state.maxValue - this.state.minValue))
      * 100;
    this.percent = Model.transformRange(this.percent);
    return Math.round(percent / this.percent) * this.percent;
  }

  private defineDecimalPlacesCount(): number {
    const str: string = this.state.stepSize.toString();
    let decimalPlaces = 10;

    if (str.includes('.')) {
      decimalPlaces = Number(str.split('.').pop()?.length || 0);
    }
    return decimalPlaces;
  }

  private convertNumberInPercent(value: number): number {
    return (
      ((value - this.state.minValue)
        / (this.state.maxValue - this.state.minValue))
      * 100
    );
  }

  private defineLeftVal(): void {
    const leftValue = ((this.state.maxValue - this.state.minValue) * this.state.shiftLeft)
        / 100
      + this.state.minValue;

    this.state.currentValLeft = Number(
      leftValue.toFixed(this.defineDecimalPlacesCount()),
    );
  }

  private defineRightVal(): void {
    const rightValue = ((this.state.maxValue - this.state.minValue) * this.state.shiftRight)
        / 100
      + this.state.minValue;
    this.state.currentValRight = Number(
      rightValue.toFixed(this.defineDecimalPlacesCount()),
    );
  }

  private defineIntervalStep(): number {
    const step = (this.state.maxValue - this.state.minValue) / this.state.intervalCount;

    return Number(step.toFixed(this.defineDecimalPlacesCount()));
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
    if (num <= 0) {
      return 0;
    }
    if (num >= 100) {
      return 100;
    }
    return num;
  }
}

export { Model };
