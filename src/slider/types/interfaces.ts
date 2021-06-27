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
  data: (opt: IStateEl) => Slider;
  getData: () => IState[];
}

interface IState {
  selector: string;
  minValue: number;
  maxValue: number;
  showTooltip: boolean;
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

type UniversalSate = {
  [keyChanges.ACTIVE]?: number;
  [keyChanges.COORDINATES]?: Coords;
} & IStateEl;

interface IStateEl {
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
  IStateEl,
  Slider,
  UniversalSate,
};
