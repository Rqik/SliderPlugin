import { IState } from '../../utils/Interface';
import { Model } from './Model';
import { keyChanges, rotation } from '../../utils/constatnts';

const state: IState = {
  selector: 'slider-rqik', // селектор
  minValue: 10, // минимальное значение
  maxValue: 120, // максимальное значение
  range: 'two', // 1 или 2 указателя
  rotate: rotation.HORIZONTAL, // ориентация vertical horizontal
  show: true, // показыватьть текущее значение над указателем
  showInterval: true, // показать интервал
  intervalCount: 7, // количество интервалов
  stepSize: 1, // шаг движения указателя в px
  currentVal1: 0, // установка значений в числах
  currentVal2: 70, // установка значений в числах
  round: 2, // округление,
  pixelSize: '6',
  [keyChanges.SHIFT_XL]: 123,
  [keyChanges.SHIFT_XR]: 210.221,
  currentMin: 10, // установка значений в числах
  currentMax: 40, // установка значений в числах
  stepSizePercent: 0, // шаг движения указателя в %
  step: 0,
  activeLeft: false,
};

const state2: IState = {
  selector: 'slider-rqik', // селектор
  minValue: 112, // минимальное значение
  maxValue: 120, // максимальное значение
  range: 'one', // 1 или 2 указателя
  rotate: rotation.VERTICAL, // ориентация vertical horizontal
  show: false, // показывать текущее значение над указателем
  showInterval: false, // показать интервал
  intervalCount: 7, // количество интервалов
  stepSize: 20, // шаг движения указателя в px
  currentVal1: 0, // установка значений в числах
  currentVal2: 70, // установка значений в числах
  round: 5, // округление,
  pixelSize: '6',
  [keyChanges.SHIFT_XL]: 132.22,
  [keyChanges.SHIFT_XR]: 210.221,
  currentMin: 10, // установка значений в числах
  currentMax: 40, // установка значений в числах
  stepSizePercent: 0, // шаг движения указателя в %
  step: 0,
  activeLeft: false,
};

describe('Model test', () => {
  let model: Model;
  beforeEach(() => {
    model = new Model();
  });

  test('edit', () => {
    model.edit(state);
    expect(model.stateCurrent).toEqual(state);

    model.edit(state2);
    expect(model.stateCurrent).toEqual(state2);
  });
  test('editMode', () => {
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

  test('editState', () => {
    const leftVal = jest.spyOn(Model.prototype as any, 'leftVal');
    const rightVal = jest.spyOn(Model.prototype as any, 'rightVal');
    const step = jest.spyOn(Model.prototype as any, 'step');
    const updateCoordinate = jest.spyOn(
      Model.prototype as any,
      'updateCoordinate',
    );
    const activeButton = jest.spyOn(Model.prototype as any, 'activeButton');

    model.edit = jest.fn();
    model.editState({ shiftXl: '44' });
    expect(leftVal).toHaveBeenCalled();
    expect(model.edit).toHaveBeenCalled();

    model.editState({ shiftXr: '44' });
    expect(model.edit).toHaveBeenCalledTimes(2);
    expect(rightVal).toHaveBeenCalled();

    model.editState({ notCorrect: '44' });
    expect(model.edit).toHaveBeenCalledTimes(3);

    model.editState({ position: '44' });
    expect(step).toHaveBeenCalled();

    model.editState({ coordinates: '44' });
    expect(updateCoordinate).toHaveBeenCalled();

    model.editState({ active: '44' });
    expect(activeButton).toHaveBeenCalled();
  });
  test('call math methods', () => {
    const mathPercent = jest.spyOn(Model.prototype as any, 'mathPercent');
    const mathStepPercent = jest.spyOn(
      Model.prototype as any,
      'mathStepPercent',
    );
    const mathStepPixel = jest.spyOn(Model.prototype as any, 'mathStepPixel');

    model.edit({ stepSize: 0, stepSizePercent: 0 });
    model.editState({ position: '44' });
    expect(mathPercent).toHaveBeenCalled();
    expect(mathPercent).toHaveBeenCalledTimes(1);
    model.edit({ stepSize: 10 });
    model.editState({ position: '23' });
    expect(mathPercent).toHaveBeenCalledTimes(2);
    expect(mathStepPixel).toHaveBeenCalled();
    expect(mathStepPixel).toHaveBeenCalledTimes(1);
    model.edit({ stepSizePercent: 10 });
    model.editState({ position: '23' });
    expect(mathPercent).toHaveBeenCalledTimes(3);
    expect(mathStepPercent).toHaveBeenCalled();
    expect(mathStepPercent).toHaveBeenCalledTimes(1);
  });
  // test('leftvalue function ', () => {
  //   model.edit(state);
  //   const leftVal = jest.spyOn(Model.prototype as any, 'leftVal')
  //   // model.leftVal() = jest.fn();
  //   expect(model.stateCurrent.currentVal2).toEqual(145.3);
  //   expect(model.stateCurrent.currentVal2).not.toEqual(145);
  //
  //   model.edit(state2);
  //
  //   // model.leftVal();
  //   expect(model.stateCurrent.currentVal2).toEqual(122.5776);
  //   expect(model.stateCurrent.currentVal2).not.toEqual(122.577);
  // });
  // test('rightVal function ', () => {
  //   model.edit(state);
  //
  //   // model.rightVal();
  //   expect(model.stateCurrent.currentVal1).toEqual(241.24);
  //   expect(model.stateCurrent.currentVal1).not.toEqual(241.2422);
  //
  //   model.edit(state2);
  //
  //   // model.rightVal();
  //   expect(model.stateCurrent.currentVal1).toEqual(128.81768);
  //   expect(model.stateCurrent.currentVal1).not.toEqual(122.577);
  // });
  test('return state', () => {
    model.edit(state);

    expect(model.stateCurrent).toEqual(state);
    expect(model.stateCurrent).not.toEqual(state2);
  });
});
