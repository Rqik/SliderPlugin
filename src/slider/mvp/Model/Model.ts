import { EventObserver } from '../../utils/EventObserver';
import {
  ICoords,
  IState,
  IStateEl,
  UniversalSate,
} from '../../types/interfaces';
import { keyChanges, rotation } from '../../types/constants';

class Model {
  public observer: EventObserver;

  public coords: ICoords = {
    x: 0,
    y: 0,
    height: 0,
    width: 0,
  };

  private state: IState = {
    selector: 'slider-range', // селектор
    min: 0, // минимальное значение
    max: 1000, // максимальное значение
    range: 'one', // 1 или 2 указателя
    rotate: rotation.HORIZONTAL, // ориентация vertical || horizontal
    showTooltip: true, // показывать текущее значение над указателем
    showInterval: true, // показать интервал
    intervalCount: 2, // количество интервалов
    stepSize: 1, // шаг движения указателя в числах
    maxValue: 50, // установка значений в числах
    minValue: 0, // установка значений в числах
    [keyChanges.SHIFT_LEFT]: 0,
    [keyChanges.SHIFT_RIGHT]: 0,
    step: 0, // процентные значение от 0 до 100
    isActiveLeft: false,
    intervalStep: 0,
  };

  private stateKey = [
    'selector',
    'min',
    'max',
    'range',
    'rotate',
    'showTooltip',
    'showInterval',
    'stepSize',
    'maxValue',
    'minValue',
    'shiftLeft',
    'shiftRight',
    'step',
    'isActiveLeft',
    'intervalStep',
    'widthSlider',
    'heightSlider',
    'round',
    'show',
  ];

  private percent = 0;

  constructor(selector = 'slider-rqik') {
    this.state.selector = selector;
    this.observer = new EventObserver();
  }

  get getState(): IState {
    return { ...this.state };
  }

  setState(data: UniversalSate): void {
    const stateOld = this.getState;
    switch (Object.keys(data)[0]) {
      case keyChanges.ACTIVE:
        this.activeButton(data[keyChanges.ACTIVE] as number);
        break;
      case keyChanges.SHIFT_LEFT:
        this.setStateValid(data);
        this.defineLeftVal();
        break;
      case keyChanges.SHIFT_RIGHT:
        this.setStateValid(data);
        this.defineRightVal();
        break;
      case keyChanges.POSITION:
        this.defineStep(Number(data[keyChanges.POSITION]));
        break;
      case keyChanges.COORDINATES:
        this.updateCoordinate(data[keyChanges.COORDINATES] as ICoords);
        break;
      case keyChanges.INTERVAL:
        this.state.step = Model.convertCorrectNumber(this.convertNumberInPercent(
          Number(data[keyChanges.INTERVAL]),
        ));
        this.setStateValid(data);
        this.defineLeftVal();
        this.defineRightVal();
        break;
      default:
        this.setStateValid(data, true);
        break;
    }
    this.notify(stateOld, Object.keys(data)[0]);
  }

  setStateValid(key: IStateEl, validate = false): void {
    const stateOld = this.getState;
    this.state = {
      ...this.state,
      ...key,
    };
    if (validate) {
      this.convertToNumber();
    }
    Object.keys(key).forEach((el) => {
      this.notify(stateOld, el);
    });
  }

  private notify(state: IState, key: string): void {
    if (key === keyChanges.POSITION) {
      this.observer.broadcast({ [keyChanges.POSITION]: this.getState.step });
      return;
    }
    if (key === keyChanges.COORDINATES) {
      this.observer.broadcast({ [keyChanges.COORDINATES]: this.coords });
      return;
    }
    this.stateKey.forEach((element) => {
      if (state[element] !== this.getState[element]) {
        this.observer.broadcast({ [element]: this.getState[element] });
      }
    });
  }

  private convertToNumber(): void {
    this.state.min = Model.convertCorrectNumber(this.state.min);
    this.state.max = Model.convertCorrectNumber(this.state.max);

    this.state.stepSize = Model.convertCorrectNumber(this.state.stepSize);
    this.state.stepSize = this.state.stepSize < 0 ? 0 : this.state.stepSize;
    this.state.maxValue = Model.convertCorrectNumber(this.state.maxValue);
    this.state.minValue = Model.convertCorrectNumber(this.state.minValue);

    this.state.shiftLeft = this.validStep(
      this.convertNumberInPercent(this.state.minValue),
    );
    this.state.shiftRight = this.validStep(
      this.convertNumberInPercent(this.state.maxValue),
    );
    this.state.shiftRight = Number.isFinite(this.state.shiftRight)
      ? Model.transformRange(this.state.shiftRight)
      : 0;
    this.state.shiftLeft = Number.isFinite(this.state.shiftLeft)
      ? Model.transformRange(this.state.shiftLeft)
      : 0;
    this.state[keyChanges.INTERVAL_STEP] = this.defineIntervalStep();
  }

  private updateCoordinate(coords: ICoords): void {
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
    const difference = Math.abs(this.state.max - this.state.min);
    if (difference === 0) {
      return Math.round(percent / this.state.stepSize) * this.state.stepSize;
    }

    this.percent = (this.state.stepSize / Math.abs(this.state.max - this.state.min)) * 100;
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
    return ((value - this.state.min) / (this.state.max - this.state.min)) * 100;
  }

  private defineLeftVal(): void {
    const leftValue = ((this.state.max - this.state.min) * this.state.shiftLeft) / 100
      + this.state.min;

    this.state.minValue = Number(
      leftValue.toFixed(this.defineDecimalPlacesCount()),
    );
  }

  private defineRightVal(): void {
    const rightValue = ((this.state.max - this.state.min) * this.state.shiftRight) / 100
      + this.state.min;
    this.state.maxValue = Number(
      rightValue.toFixed(this.defineDecimalPlacesCount()),
    );
  }

  private defineIntervalStep(): number {
    const step = (this.state.max - this.state.min) / this.state.intervalCount;

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
