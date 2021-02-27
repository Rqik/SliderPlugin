export interface IState {
  selector: string;
  minValue: number;
  maxValue: number;
  show: boolean;
  showInterval: boolean;
  range: range;
  rotate: rotate;
  intervalCount: number;
  stepSize: number;
  currentVal1: number;
  currentVal2: number;
  [k: string]: any;
}
export type rotate = "vertical" | "horizontal";
export type range = "one" | "two";

export interface setingOption {
  min?: number;
  max?: number;
  interval?: number;
  step?: number;
  range?: range;
}
