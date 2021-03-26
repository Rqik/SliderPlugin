import { IState } from '../Interface';
import { Model } from './Model';

const state: IState = {
  selector: 'slider_rqik', // селектор
  minValue: 10, // минимальное значение
  maxValue: 120, // максимальное значение
  range: 'two', // 1 или 2 указателя
  rotate: 'horizontal', // ориентация vertical horizontal
  show: true, // показыватьть текущее значение над указателем
  showInterval: true, // показать интервал
  intervalCount: 7, // количество интервалов
  stepSize: 1, // шаг движения указателя в px
  currentVal1: 0, // установка значений в числах
  currentVal2: 70, // установка значений в числах
  round: 2, // округление,
  pixelSize: '6',
  shiftXl: 123,
  shiftXr: 210.221,
  currentMin: 10, // установка значений в числах
  currentMax: 40, // установка значений в числах
  stepSizePercent: 0, // шаг движения указателя в %
  step:0,
  activeLeft: false

};

const state2: IState = {
  selector: 'slider_rqik', // селектор
  minValue: 112, // минимальное значение
  maxValue: 120, // максимальное значение
  range: 'one', // 1 или 2 указателя
  rotate: 'vertical', // ориентация vertical horizontal
  show: false, // показывать текущее значение над указателем
  showInterval: false, // показать интервал
  intervalCount: 7, // количество интервалов
  stepSize: 20, // шаг движения указателя в px
  currentVal1: 0, // установка значений в числах
  currentVal2: 70, // установка значений в числах
  round: 5, // округление,
  pixelSize: '6',
  shiftXl: 132.22,
  shiftXr: 210.221,
  currentMin: 10, // установка значений в числах
  currentMax: 40, // установка значений в числах
  stepSizePercent: 0, // шаг движения указателя в %
  step:0,
  activeLeft: false

};

describe('Model test', () => {
  let model: Model;
  beforeEach(() => {
    model = new Model();
  });

  test('edit state', () => {
    model.edit(state);
    expect(model.stateCurrent).toEqual(state);

    model.edit(state2);
    expect(model.stateCurrent).toEqual(state2);
  });
  test('editMode state', () => {
    model.editMode({
      minValue: '222',
      maxValue: '222 ',
      round: '144',
      intervalCount: '211',
      currentVal2: '290',
    });

    expect(model.stateCurrent.minValue).not.toEqual('222');
    expect(model.stateCurrent.minValue).toEqual(222);
    expect(model.stateCurrent.maxValue).not.toEqual('222');
    expect(model.stateCurrent.maxValue).toEqual(222);
    expect(model.stateCurrent.intervalCount).not.toEqual('211');
    expect(model.stateCurrent.intervalCount).toEqual(211);

    expect(model.stateCurrent.currentVal2).not.toEqual('290');
    expect(model.stateCurrent.currentVal2).toEqual(290);

    expect(model.stateCurrent.round).not.toEqual('144');
    expect(model.stateCurrent.round).toEqual(144);

    model.edit = jest.fn();
    model.editMode({ minValue: '222' });
    expect(model.edit).toHaveBeenCalled();
    expect(model.edit).toHaveBeenCalledTimes(1);
  });
  test('leftvalue function ', () => {
    model.edit(state);

    model.leftVal();
    expect(model.stateCurrent.currentVal2).toEqual(145.3);
    expect(model.stateCurrent.currentVal2).not.toEqual(145);

    model.edit(state2);

    model.leftVal();
    expect(model.stateCurrent.currentVal2).toEqual(122.5776);
    expect(model.stateCurrent.currentVal2).not.toEqual(122.577);
  });
  test('rightVal function ', () => {
    model.edit(state);

    model.rightVal();
    expect(model.stateCurrent.currentVal1).toEqual(241.24);
    expect(model.stateCurrent.currentVal1).not.toEqual(241.2422);

    model.edit(state2);

    model.rightVal();
    expect(model.stateCurrent.currentVal1).toEqual(128.81768);
    expect(model.stateCurrent.currentVal1).not.toEqual(122.577);
  });
  test('return state', () => {
    model.edit(state);

    expect(model.stateCurrent).toEqual(state);
    expect(model.stateCurrent).not.toEqual(state2);
  });
});
