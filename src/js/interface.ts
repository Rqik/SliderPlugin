type rotate = 'vertical' | 'horizontal';
type range = 'one' | 'two';

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
  stepSizePerc: number;
  currentVal1: number;
  currentVal2: number;
  shiftXl: number;
  shiftXr: number;
  round: number;
  [k: string]: any;
}

interface StateEl {
  [k: string]: any;
}
type options = number | string | boolean;

interface setingOption {
  min?: number;
  max?: number;
  interval?: number;
  step?: number;
  range?: range;
}

export { setingOption, IState, rotate, range, options, StateEl };
