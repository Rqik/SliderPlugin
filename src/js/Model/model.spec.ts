import { IState } from '../interface';
import Model from './model';

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
  stepSizePerc: 0, // шаг движения указателя в %

};

const state2: IState = {
  selector: 'slider_rqik', // селектор
  minValue: 112, // минимальное значение
  maxValue: 120, // максимальное значение
  range: 'one', // 1 или 2 указателя
  rotate: 'vertical', // ориентация vertical horizontal
  show: false, // показыватьть текущее значение над указателем
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
  stepSizePerc: 0, // шаг движения указателя в %
};

describe('Model test', () => {
  let model: Model;
  beforeEach(() => {
    model = new Model();
  });

  test('edit state', () => {
    model.edit(state);
    expect(model.state).toEqual(state);

    model.edit(state2);
    expect(model.state).toEqual(state2);
  });
  test('editMode state', () => {
    model.editMode({
      minValue: '222',
      maxValue: '222 ',
      round: '144',
      intervalCount: '211',
      currentVal2: '290',
    });

    expect(model.state.minValue).not.toEqual('222');
    expect(model.state.minValue).toEqual(222);
    expect(model.state.maxValue).not.toEqual('222');
    expect(model.state.maxValue).toEqual(222);
    expect(model.state.intervalCount).not.toEqual('211');
    expect(model.state.intervalCount).toEqual(211);

    expect(model.state.currentVal2).not.toEqual('290');
    expect(model.state.currentVal2).toEqual(290);

    expect(model.state.round).not.toEqual('144');
    expect(model.state.round).toEqual(144);

    model.edit = jest.fn();
    model.editMode({ minValue: '222' });
    expect(model.edit).toHaveBeenCalled();
    expect(model.edit).toHaveBeenCalledTimes(1);
  });
  test('leftvalue function ', () => {
    model.edit(state);

    model.leftVal();
    expect(model.state.currentVal2).toEqual(145.3);
    expect(model.state.currentVal2).not.toEqual(145);

    model.edit(state2);

    model.leftVal();
    expect(model.state.currentVal2).toEqual(122.5776);
    expect(model.state.currentVal2).not.toEqual(122.577);
  });
  test('rightVal function ', () => {
    model.edit(state);

    model.rightVal();
    expect(model.state.currentVal1).toEqual(241.24);
    expect(model.state.currentVal1).not.toEqual(241.2422);

    model.edit(state2);

    model.rightVal();
    expect(model.state.currentVal1).toEqual(128.81768);
    expect(model.state.currentVal1).not.toEqual(122.577);
  });
  test('return state', () => {
    model.edit(state);

    expect(model.stateCurrent).toEqual(state);
    expect(model.stateCurrent).not.toEqual(state2);
  });
});
