import { keyChanges, rotation } from './constants';

type rotate = rotation.HORIZONTAL | rotation.VERTICAL;
type range = 'one' | 'two';
type callBack = (args?: any) => void;

interface Coords {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface Slider {
  data: (opt: StateEl) => Slider;
  getData: () => IState[];
}

interface IState {
  selector: string;
  minValue: number;
  maxValue: number;
  show: boolean;
  showInterval: boolean;
  range: range;
  rotate: rotate;
  intervalCount: number;
  stepSize: number;
  currentValRight: number;
  currentValLeft: number;
  [keyChanges.SHIFT_LEFT]: number;
  [keyChanges.SHIFT_RIGHT]: number;
  step: number;
  isActiveLeft: boolean;

  [k: string]: options;
}

type IUniversalSate = {
  [keyChanges.ACTIVE]: number;
  [keyChanges.COORDINATES]: Coords;
} & StateEl;

interface StateEl {
  [k: string]: options;
}

type options = number | string | boolean;

export {
  Coords,
  IState,
  rotate,
  range,
  callBack,
  options,
  StateEl,
  Slider,
  IUniversalSate,
};
