import { IState } from '../../types/interfaces';
import { keyChanges, rotation } from '../../types/constants';
import { Model } from './Model';

const stateHorizontal: IState = {
  selector: 'slider-rqik', // селектор
  minValue: 10, // минимальное значение
  maxValue: 120, // максимальное значение
  range: 'two', // 1 или 2 указателя
  rotate: rotation.HORIZONTAL, // ориентация vertical horizontal
  showTooltip: true, // показывать текущее значение над указателем
  showInterval: true, // показать интервал
  intervalCount: 7, // количество интервалов
  stepSize: 1, // шаг движения указателя
  currentValRight: 0, // установка значений в числах
  currentValLeft: 70, // установка значений в числах
  pixelSize: '6',
  [keyChanges.SHIFT_LEFT]: -22,
  [keyChanges.SHIFT_RIGHT]: 43,
  currentMin: 10, // установка значений в числах
  currentMax: 40, // установка значений в числах
  step: 0,
  isActiveLeft: false,
  [keyChanges.INTERVAL_STEP]: 0,
};

const stateVertical: IState = {
  selector: 'slider-rqik', // селектор
  minValue: 112, // минимальное значение
  maxValue: 120, // максимальное значение
  range: 'one', // 1 или 2 указателя
  rotate: rotation.VERTICAL, // ориентация vertical horizontal
  showTooltip: false, // показывать текущее значение над указателем
  showInterval: false, // показать интервал
  intervalCount: 7, // количество интервалов
  stepSize: 20, // шаг движения указателя
  currentValRight: 0, // установка значений в числах
  currentValLeft: 70, // установка значений в числах
  pixelSize: '6',
  [keyChanges.SHIFT_LEFT]: 0,
  [keyChanges.SHIFT_RIGHT]: 54,
  currentMin: 10, // установка значений в числах
  currentMax: 40, // установка значений в числах
  step: 0,
  isActiveLeft: false,
  [keyChanges.INTERVAL_STEP]: 0,
};

const stateHorCorrect: IState = {
  selector: 'slider-rqik', // селектор
  minValue: 10, // минимальное значение
  maxValue: 120, // максимальное значение
  range: 'two', // 1 или 2 указателя
  rotate: rotation.HORIZONTAL, // ориентация vertical horizontal
  showTooltip: true, // показывать текущее значение над указателем
  showInterval: true, // показать интервал
  intervalCount: 7, // количество интервалов
  stepSize: 1, // шаг движения указателя
  currentValRight: 0, // установка значений в числах
  currentValLeft: 70, // установка значений в числах
  pixelSize: '6',
  [keyChanges.SHIFT_LEFT]: 54.54545454545455,
  [keyChanges.SHIFT_RIGHT]: 0,
  currentMin: 10, // установка значений в числах
  currentMax: 40, // установка значений в числах
  step: 0,
  isActiveLeft: false,
  [keyChanges.INTERVAL_STEP]: 15.7142857143,
};
const stateVerCorrect: IState = {
  selector: 'slider-rqik', // селектор
  minValue: 112, // минимальное значение
  maxValue: 120, // максимальное значение
  range: 'one', // 1 или 2 указателя
  rotate: rotation.VERTICAL, // ориентация vertical horizontal
  showTooltip: false, // показывать текущее значение над указателем
  showInterval: false, // показать интервал
  intervalCount: 7, // количество интервалов
  stepSize: 20, // шаг движения указателя
  currentValRight: 0, // установка значений в числах
  currentValLeft: 70, // установка значений в числах
  pixelSize: '6',
  [keyChanges.SHIFT_LEFT]: 0,
  [keyChanges.SHIFT_RIGHT]: 0,
  currentMin: 10, // установка значений в числах
  currentMax: 40, // установка значений в числах
  step: 0,
  isActiveLeft: false,
  [keyChanges.INTERVAL_STEP]: 1.1428571429,
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
    const checkExtremePoint = jest.spyOn(
      Model.prototype as any,
      'checkExtremePoint',
    );
    const mathPositionToPercent = jest.spyOn(
      Model.prototype as any,
      'mathPositionToPercent',
    );
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
    expect(mathPositionToPercent).toHaveBeenCalled();

    model.editState({ stepSize: -1.32 });
    model.editState({ position: '87' });
    expect(defineStep).toHaveBeenCalledTimes(2);

    expect(updateCoordinate).toHaveBeenCalledTimes(0);

    model.editState({ [keyChanges.ACTIVE]: 44 });
    expect(activeButton).toHaveBeenCalled();
    expect(checkExtremePoint).toHaveBeenCalled();

    model.editState({ [keyChanges.SHIFT_LEFT]: 24 });
    model.editState({ [keyChanges.SHIFT_RIGHT]: 24 });
    model.editMode({ step: 10 });
    model.editState({ [keyChanges.ACTIVE]: 55 });
    expect(checkExtremePoint).toHaveBeenCalledTimes(2);
    expect(model.stateCurrent.isActiveLeft).toEqual(false);

    model.editMode({ step: 97 });
    model.editState({ [keyChanges.ACTIVE]: -10 });
    expect(model.stateCurrent.isActiveLeft).toEqual(true);
  });

  test('call validStep methods', () => {
    model.editState({ stepSize: 42 });
    const defineStep = jest.spyOn(Model.prototype as any, 'defineStep');
    const validStep = jest.spyOn(Model.prototype as any, 'validStep');
    model.editMode({ maxValue: 10, minValue: 10 });

    model.editState({ [keyChanges.POSITION]: 5 });
    expect(defineStep).toHaveBeenCalled();
    expect(validStep).toHaveBeenCalled();
  });

  test('call mathPositionToPercent methods', () => {
    const mathPositionToPercent = jest.spyOn(
      Model.prototype as any,
      'mathPositionToPercent',
    );
    model.editState({ position: '44' });
    expect(mathPositionToPercent).toHaveBeenCalled();
    expect(mathPositionToPercent).toHaveBeenCalledTimes(1);
    model.editMode({ stepSize: 10 });
    model.editState({ position: '23' });
    expect(mathPositionToPercent).toHaveBeenCalledTimes(2);
    model.editState({ position: '23' });
    expect(mathPositionToPercent).toHaveBeenCalledTimes(3);

    model.editMode({ rotate: 'vertical' });
    model.editState({ position: '73' });
    expect(mathPositionToPercent).toHaveBeenCalledTimes(4);
  });

  test('return state', () => {
    model.editState(stateHorizontal);

    expect(model.stateCurrent).toEqual(stateHorizontal);
    expect(model.stateCurrent).not.toEqual(stateVertical);
  });
});
