import { IState } from '../../utils/Interface';
import { Model } from './Model';
import { keyChanges, rotation } from '../../utils/constatnts';

const stateHorizontal: IState = {
  selector: 'slider-rqik', // селектор
  minValue: 10, // минимальное значение
  maxValue: 120, // максимальное значение
  range: 'two', // 1 или 2 указателя
  rotate: rotation.HORIZONTAL, // ориентация vertical horizontal
  show: true, // показывать текущее значение над указателем
  showInterval: true, // показать интервал
  intervalCount: 7, // количество интервалов
  stepSize: 1, // шаг движения указателя в px
  currentValRight: 0, // установка значений в числах
  currentValLeft: 70, // установка значений в числах
  pixelSize: '6',
  [keyChanges.SHIFT_LEFT]: -22,
  [keyChanges.SHIFT_RIGHT]: 43,
  currentMin: 10, // установка значений в числах
  currentMax: 40, // установка значений в числах
  step: 0,
  isActiveLeft: false,
};

const stateVertical: IState = {
  selector: 'slider-rqik', // селектор
  minValue: 112, // минимальное значение
  maxValue: 120, // максимальное значение
  range: 'one', // 1 или 2 указателя
  rotate: rotation.VERTICAL, // ориентация vertical horizontal
  show: false, // показывать текущее значение над указателем
  showInterval: false, // показать интервал
  intervalCount: 7, // количество интервалов
  stepSize: 20, // шаг движения указателя в px
  currentValRight: 0, // установка значений в числах
  currentValLeft: 70, // установка значений в числах
  pixelSize: '6',
  [keyChanges.SHIFT_LEFT]: 0,
  [keyChanges.SHIFT_RIGHT]: 54,
  currentMin: 10, // установка значений в числах
  currentMax: 40, // установка значений в числах
  stepSizePercent: 0, // шаг движения указателя в %
  step: 0,
  isActiveLeft: false,
};

const stateHorCorrect: IState = {
  selector: 'slider-rqik', // селектор
  minValue: 10, // минимальное значение
  maxValue: 120, // максимальное значение
  range: 'two', // 1 или 2 указателя
  rotate: rotation.HORIZONTAL, // ориентация vertical horizontal
  show: true, // показывать текущее значение над указателем
  showInterval: true, // показать интервал
  intervalCount: 7, // количество интервалов
  stepSize: 1, // шаг движения указателя в px
  currentValRight: 0, // установка значений в числах
  currentValLeft: 70, // установка значений в числах
  pixelSize: '6',
  [keyChanges.SHIFT_LEFT]: ((70 - 10) / 110) * 100,
  [keyChanges.SHIFT_RIGHT]: 0,
  currentMin: 10, // установка значений в числах
  currentMax: 40, // установка значений в числах
  step: 0,
  isActiveLeft: false,
};
const stateVerCorrect: IState = {
  selector: 'slider-rqik', // селектор
  minValue: 112, // минимальное значение
  maxValue: 120, // максимальное значение
  range: 'one', // 1 или 2 указателя
  rotate: rotation.VERTICAL, // ориентация vertical horizontal
  show: false, // показывать текущее значение над указателем
  showInterval: false, // показать интервал
  intervalCount: 7, // количество интервалов
  stepSize: 20, // шаг движения указателя в px
  currentValRight: 0, // установка значений в числах
  currentValLeft: 70, // установка значений в числах
  pixelSize: '6',
  [keyChanges.SHIFT_LEFT]: 0,
  [keyChanges.SHIFT_RIGHT]: 0,
  currentMin: 10, // установка значений в числах
  currentMax: 40, // установка значений в числах
  stepSizePercent: 0, // шаг движения указателя в %
  step: 0,
  isActiveLeft: false,
};

describe('Model test', () => {
  let model: Model;
  beforeEach(() => {
    model = new Model();
  });

  test('editMode', () => {
    model.editMode(stateHorizontal);
    expect(model.stateCurrent).toEqual(stateHorCorrect);

    model.editMode(stateVertical);
    expect(model.stateCurrent).toEqual(stateVerCorrect);
  });
  test('editMode', () => {
    model.editMode({
      minValue: '232',
      maxValue: '322',
      intervalCount: '5',
      currentValRight: '190',
      currentValLeft: '290',
    });

    expect(model.stateCurrent.minValue).not.toEqual('232');
    expect(model.stateCurrent.minValue).toEqual(232);

    expect(model.stateCurrent.maxValue).not.toEqual('322');
    expect(model.stateCurrent.maxValue).toEqual(322);

    expect(model.stateCurrent.intervalCount).not.toEqual('5');
    expect(model.stateCurrent.intervalCount).toEqual(5);

    expect(model.stateCurrent.currentValRight).not.toEqual('190');
    expect(model.stateCurrent.currentValRight).toEqual(190);

    expect(model.stateCurrent.currentValLeft).not.toEqual('290');
    expect(model.stateCurrent.currentValLeft).toEqual(290);
  });

  test('editState', () => {
    const leftVal = jest.spyOn(Model.prototype as any, 'leftVal');
    const rightVal = jest.spyOn(Model.prototype as any, 'rightVal');
    const edit = jest.spyOn(Model.prototype as any, 'edit');
    const step = jest.spyOn(Model.prototype as any, 'step');
    const updateCoordinate = jest.spyOn(
      Model.prototype as any,
      'updateCoordinate',
    );
    const activeButton = jest.spyOn(Model.prototype as any, 'activeButton');

    model.editState({ shiftLeft: '44' });
    expect(leftVal).toHaveBeenCalled();
    expect(edit).toHaveBeenCalled();

    model.editState({ shiftRight: '44' });
    expect(edit).toHaveBeenCalledTimes(2);
    expect(rightVal).toHaveBeenCalled();

    model.editState({ notCorrect: '44' });
    expect(edit).toHaveBeenCalledTimes(3);

    model.editState({ position: '44' });
    expect(step).toHaveBeenCalled();

    model.editState({ coordinates: '44' });
    expect(updateCoordinate).toHaveBeenCalled();

    model.editState({ active: '44' });
    expect(activeButton).toHaveBeenCalled();
  });
  test('call math methods', () => {
    const mathPercent = jest.spyOn(Model.prototype as any, 'mathPercent');
    model.editState({ position: '44' });
    expect(mathPercent).toHaveBeenCalled();
    expect(mathPercent).toHaveBeenCalledTimes(1);
    model.editMode({ stepSize: 10 });
    model.editState({ position: '23' });
    expect(mathPercent).toHaveBeenCalledTimes(2);
    model.editState({ position: '23' });
    expect(mathPercent).toHaveBeenCalledTimes(3);
  });

  test('return state', () => {
    model.editState(stateHorizontal);

    expect(model.stateCurrent).toEqual(stateHorizontal);
    expect(model.stateCurrent).not.toEqual(stateVertical);
  });
});
