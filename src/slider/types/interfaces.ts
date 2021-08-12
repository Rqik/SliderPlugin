import { keyChanges, rotation } from './constants';

type Rotate = rotation.HORIZONTAL | rotation.VERTICAL;
type Range = 'one' | 'two';
type Options = number | string | boolean;

type CoordsType = {
  x: number;
  y: number;
  width: number;
  height: number;
};
type CoordsProps = {
  [keyChanges.COORDINATES]: CoordsType;
};
type ActiveButton = {
  [keyChanges.ACTIVE]: number;
};
type PositionProps = {
  [keyChanges.POSITION]: number | string;
};
type IntervalProps = {
  [keyChanges.INTERVAL]: number;
};

type StateProps = {
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
  widthSlider: number;
  heightSlider: number;
};

interface IStateEl {
  [k: string]: Options;
}

interface ISlider {
  data: (opt: IStateEl) => ISlider;
  getData: () => StateProps[];
}
type PStateProps = Partial<StateProps>;

type UniversalState =
  | CoordsProps
  | StateProps
  | ActiveButton
  | PositionProps
  | IntervalProps
  | PStateProps;

type CallBack = (args?: UniversalState) => void;

export {
  PStateProps,
  CoordsType,
  StateProps,
  Rotate,
  Range,
  CallBack,
  Options,
  IStateEl,
  ISlider,
  ActiveButton,
  UniversalState,
  CoordsProps,
  IntervalProps,
  PositionProps,
};
