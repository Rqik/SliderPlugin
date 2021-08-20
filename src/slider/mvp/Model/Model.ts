import EventObserver from '../../utils/EventObserver';
import {
  CoordsType,
  StateProps,
  IStateEl,
  UniversalState,
} from '../../types/interfaces';
import { keyChanges, rotation } from '../../types/constants';
import defaultState from './default-state';

class Model {
  public observer: EventObserver;

  public coords: CoordsType = {
    x: 0,
    y: 0,
    height: 0,
    width: 0,
  };

  private state: StateProps = defaultState;

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
  ] as const;

  private percent = 0;

  constructor(selector = 'slider-rqik') {
    this.state.selector = selector;
    this.observer = new EventObserver();
  }

  get getState(): StateProps {
    return { ...this.state };
  }

  setState(data: UniversalState): void {
    const stateOld = this.getState;
    switch (Object.keys(data)[0]) {
      case keyChanges.ACTIVE:
        if ('isActiveLeft' in data) {
          this.activeButton(data[keyChanges.ACTIVE] as number);
        }
        break;
      case keyChanges.SHIFT_LEFT:
        this.setStateValid(data as StateProps);
        this.defineLeftVal();
        break;
      case keyChanges.SHIFT_RIGHT:
        this.setStateValid(data as StateProps);
        this.defineRightVal();
        break;
      case keyChanges.POSITION:
        if ('position' in data) {
          this.defineStep(Number(data[keyChanges.POSITION]));
        }
        break;
      case keyChanges.COORDINATES:
        if ('coordinates' in data) {
          this.updateCoordinate(data[keyChanges.COORDINATES] as CoordsType);
        }
        break;
      case keyChanges.INTERVAL:
        if ('intervalAction' in data) {
          this.state.step = Model.convertCorrectNumber(
            this.convertNumberInPercent(Number(data[keyChanges.INTERVAL])),
          );
        }
        this.setStateValid(data as StateProps);
        this.defineLeftVal();
        this.defineRightVal();
        break;
      default:
        this.setStateValid(data as StateProps, true);
        break;
    }
    this.notify(stateOld, Object.keys(data)[0]);
  }

  setStateValid(state: StateProps, validate = false): void {
    const stateOld: StateProps = this.getState;
    this.state = {
      ...this.state,
      ...state,
    };

    if (validate) {
      this.convertToValidNumber();
    }
    Object.keys(state).forEach((el) => {
      this.notify(stateOld, el);
    });
  }

  private notify(state: StateProps, key?: string): void {
    const newProps: IStateEl = {};

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
        newProps[element] = this.getState[element];
      }
    });

    if (Object.keys(newProps).length !== 0) {
      this.observer.broadcast({ ...newProps });
    }
  }

  private convertToValidNumber(): void {
    this.state.min = Model.convertCorrectNumber(this.state.min);
    this.state.max = Model.convertCorrectNumber(this.state.max);
    if (this.state.min > this.state.max) {
      [this.state.max, this.state.min] = [this.state.min, this.state.max];
    }
    this.state.stepSize = Model.convertCorrectNumber(this.state.stepSize);
    this.state.stepSize = this.state.stepSize <= 0 ? 0 : this.state.stepSize;
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
    this.state.intervalCount = this.state.intervalCount < 0
      ? 0
      : Model.convertCorrectNumber(this.state.intervalCount);
    this.state[keyChanges.INTERVAL_STEP] = this.defineIntervalStep();
  }

  private updateCoordinate(coords: CoordsType): void {
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

  private static roundNumber(value: number): number {
    return Math.round(value * 10 ** 8) / 10 ** 8;
  }

  private convertNumberInPercent(value: number): number {
    return ((value - this.state.min) / (this.state.max - this.state.min)) * 100;
  }

  private defineLeftVal(): void {
    this.state.minValue = Model.roundNumber(
      ((this.state.max - this.state.min) * this.state.shiftLeft) / 100
        + this.state.min,
    );
  }

  private defineRightVal(): void {
    this.state.maxValue = Model.roundNumber(
      ((this.state.max - this.state.min) * this.state.shiftRight) / 100
        + this.state.min,
    );
  }

  private defineIntervalStep(): number {
    let step = (this.state.max - this.state.min) / this.state.intervalCount;
    if (Math.abs(step) < this.state.stepSize) {
      return Math.sign(step) * this.state.stepSize;
    }
    if (this.state.stepSize) {
      step = Math.round(step / this.state.stepSize) * this.state.stepSize;

      step = Math.round(step * 10 ** 8) / 10 ** 8;
    }
    return step;
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

export default Model;
