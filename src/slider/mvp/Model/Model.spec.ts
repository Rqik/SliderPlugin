import { IState } from '../../types/interfaces';
import { Model } from './Model';
import { keyChanges, rotation } from '../../types/constants';

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
  afterEach(() => {
    jest.clearAllMocks();
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
    const defineLeftVal = jest.spyOn(Model.prototype as any, 'defineLeftVal');
    const defineRightVal = jest.spyOn(Model.prototype as any, 'defineRightVal');
    const edit = jest.spyOn(Model.prototype as any, 'edit');
    const defineStep = jest.spyOn(Model.prototype as any, 'defineStep');
    const updateCoordinate = jest.spyOn(
      Model.prototype as any,
      'updateCoordinate',
    );
    const activeButton = jest.spyOn(Model.prototype as any, 'activeButton');
    const isActiveLeftButton = jest.spyOn(
      Model.prototype as any,
      'isActiveLeftButton',
    );
    const mathPercent = jest.spyOn(Model.prototype as any, 'mathPercent');
    model.editState({ shiftLeft: '44' });
    expect(defineLeftVal).toHaveBeenCalled();
    expect(edit).toHaveBeenCalled();

    model.editState({ shiftRight: '44' });
    expect(edit).toHaveBeenCalledTimes(2);
    expect(defineRightVal).toHaveBeenCalled();

    model.editState({ notCorrect: '44' });
    expect(edit).toHaveBeenCalledTimes(3);

    model.editState({ position: '44' });
    expect(defineStep).toHaveBeenCalled();
    expect(mathPercent).toHaveBeenCalled();

    model.editState({ stepSize: -1.32 });
    model.editState({ position: '87' });
    expect(defineStep).toHaveBeenCalledTimes(2);

    model.editState({ coordinates: '44' });
    expect(updateCoordinate).toHaveBeenCalled();

    model.editState({ active: '44' });
    expect(activeButton).toHaveBeenCalled();
    expect(isActiveLeftButton).toHaveBeenCalled();

    model.editState({ [keyChanges.SHIFT_LEFT]: 24 });
    model.editState({ [keyChanges.SHIFT_RIGHT]: 24 });
    model.editMode({ step: -10 });
    model.editState({ [keyChanges.ACTIVE]: 24 });
    expect(isActiveLeftButton).toHaveBeenCalledTimes(2);
    expect(model.stateCurrent.isActiveLeft).toEqual(false);

    model.editMode({ step: 210 });
    model.editState({ [keyChanges.ACTIVE]: 24 });
    expect(model.stateCurrent.isActiveLeft).toEqual(true);
  });

  test('call mathStepCount methods', () => {
    const defineStep = jest.spyOn(Model.prototype as any, 'defineStep');
    const mathStepCount = jest.spyOn(Model.prototype as any, 'mathStepCount');
    model.editMode({ maxValue: 10, minValue: 10 });

    model.editState({ [keyChanges.POSITION]: 5 });
    expect(defineStep).toHaveBeenCalled();
    expect(mathStepCount).toHaveBeenCalled();
  });

  test('call mathPercent methods', () => {
    const mathPercent = jest.spyOn(Model.prototype as any, 'mathPercent');
    model.editState({ position: '44' });
    expect(mathPercent).toHaveBeenCalled();
    expect(mathPercent).toHaveBeenCalledTimes(1);
    model.editMode({ stepSize: 10 });
    model.editState({ position: '23' });
    expect(mathPercent).toHaveBeenCalledTimes(2);
    model.editState({ position: '23' });
    expect(mathPercent).toHaveBeenCalledTimes(3);

    model.editMode({ rotate: 'vertical' });
    model.editState({ position: '73' });
    expect(mathPercent).toHaveBeenCalledTimes(4);
  });

  test('return state', () => {
    model.editState(stateHorizontal);

    expect(model.stateCurrent).toEqual(stateHorizontal);
    expect(model.stateCurrent).not.toEqual(stateVertical);
  });
});
