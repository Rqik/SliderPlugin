import { keyChanges, rotation } from './constants';

type Rotate = rotation.HORIZONTAL | rotation.VERTICAL;
type Range = 'one' | 'two';
type CallBack = (args?: any) => void;

interface ICoords {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface ISlider {
  data: (opt: IStateEl) => ISlider;
  getData: () => IState[];
}

interface IState {
  selector: string;
  min: number;
  max: number;
  showTooltip: boolean;
  showInterval: boolean;
  range: Range;
  rotate: Rotate;
  intervalCount: number;
  stepSize: number;
  maxValue: number;
  minValue: number;
  [keyChanges.SHIFT_LEFT]: number;
  [keyChanges.SHIFT_RIGHT]: number;
  step: number;
  isActiveLeft: boolean;
  [keyChanges.INTERVAL_STEP]: number;

  [k: string]: Options;
}

interface IStateEl {
  [k: string]: Options;
}

type UniversalSate = {
  [keyChanges.ACTIVE]?: number;
  [keyChanges.COORDINATES]?: ICoords;
} & IStateEl | IState;

type Options = number | string | boolean;

export {
  ICoords,
  IState,
  Rotate,
  Range,
  CallBack,
  Options,
  IStateEl,
  ISlider,
  UniversalSate,
};
