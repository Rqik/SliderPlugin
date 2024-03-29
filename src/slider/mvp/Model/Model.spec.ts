import { IntervalProps, StateProps } from '../../types/interfaces';
import { keyChanges, rotation } from '../../types/constants';
import Model from './Model';

const stateHorizontal: StateProps = {
  selector: 'slider-rqik', // селектор
  min: 10, // минимальное значение
  max: 120, // максимальное значение
  range: 'two', // 1 или 2 указателя
  rotate: rotation.HORIZONTAL, // ориентация vertical horizontal
  showTooltip: true, // показывать текущее значение над указателем
  showInterval: true, // показать интервал
  intervalCount: 7, // количество интервалов
  stepSize: 1, // шаг движения указателя
  maxValue: 0, // установка значений в числах
  minValue: 70, // установка значений в числах
  [keyChanges.SHIFT_LEFT]: -22,
  [keyChanges.SHIFT_RIGHT]: 43,
  step: 0,
  isActiveLeft: false,
  [keyChanges.INTERVAL_STEP]: 0,
  widthSlider: 0,
  heightSlider: 0,
};

const stateVertical: StateProps = {
  selector: 'slider-rqik', // селектор
  min: 112, // минимальное значение
  max: 120, // максимальное значение
  range: 'one', // 1 или 2 указателя
  rotate: rotation.VERTICAL, // ориентация vertical horizontal
  showTooltip: false, // показывать текущее значение над указателем
  showInterval: false, // показать интервал
  intervalCount: 7, // количество интервалов
  stepSize: 20, // шаг движения указателя
  maxValue: 0, // установка значений в числах
  minValue: 70, // установка значений в числах
  [keyChanges.SHIFT_LEFT]: 0,
  [keyChanges.SHIFT_RIGHT]: 54,
  step: 0,
  isActiveLeft: false,
  [keyChanges.INTERVAL_STEP]: 0,
  widthSlider: 0,
  heightSlider: 0,
};

const stateHorCorrect: StateProps = {
  selector: 'slider-rqik', // селектор
  min: 10, // минимальное значение
  max: 120, // максимальное значение
  range: 'two', // 1 или 2 указателя
  rotate: rotation.HORIZONTAL, // ориентация vertical horizontal
  showTooltip: true, // показывать текущее значение над указателем
  showInterval: true, // показать интервал
  intervalCount: 7, // количество интервалов
  stepSize: 1, // шаг движения указателя
  maxValue: 0, // установка значений в числах
  minValue: 70, // установка значений в числах
  [keyChanges.SHIFT_LEFT]: 54.54545454545455,
  [keyChanges.SHIFT_RIGHT]: 0,
  step: 0,
  isActiveLeft: false,
  [keyChanges.INTERVAL_STEP]: 16,
  widthSlider: 0,
  heightSlider: 0,
};
const stateVerCorrect: StateProps = {
  selector: 'slider-rqik', // селектор
  min: 112, // минимальное значение
  max: 120, // максимальное значение
  range: 'one', // 1 или 2 указателя
  rotate: rotation.VERTICAL, // ориентация vertical horizontal
  showTooltip: false, // показывать текущее значение над указателем
  showInterval: false, // показать интервал
  intervalCount: 7, // количество интервалов
  stepSize: 20, // шаг движения указателя
  maxValue: 0, // установка значений в числах
  minValue: 70, // установка значений в числах
  [keyChanges.SHIFT_LEFT]: 0,
  [keyChanges.SHIFT_RIGHT]: 0,
  step: 0,
  isActiveLeft: false,
  [keyChanges.INTERVAL_STEP]: 20,
  widthSlider: 0,
  heightSlider: 0,
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
    model.setStateValid(stateHorizontal, true);
    expect(model.getState).toEqual(stateHorCorrect);

    model.setStateValid(stateVertical, true);
    expect(model.getState).toEqual(stateVerCorrect);
  });
  test('editMode', () => {
    model.setStateValid(
      {
        min: '232',
        max: '322',
        intervalCount: '5',
        maxValue: '190',
        minValue: '290',
      } as unknown as StateProps,
      true,
    );

    expect(model.getState.min).not.toEqual('232');
    expect(model.getState.min).toEqual(232);

    expect(model.getState.max).not.toEqual('322');
    expect(model.getState.max).toEqual(322);

    expect(model.getState.intervalCount).not.toEqual('5');
    expect(model.getState.intervalCount).toEqual(5);

    expect(model.getState.maxValue).not.toEqual('190');
    expect(model.getState.maxValue).toEqual(190);

    expect(model.getState.minValue).not.toEqual('290');
    expect(model.getState.minValue).toEqual(290);
  });

  test('setState', () => {
    const defineLeftVal = jest.spyOn(Model.prototype as any, 'defineLeftVal');
    const defineRightVal = jest.spyOn(Model.prototype as any, 'defineRightVal');
    const setState = jest.spyOn(Model.prototype as any, 'setState');
    const defineStep = jest.spyOn(Model.prototype as any, 'defineRightVal');
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
    model.setState({ shiftLeft: 44 } as StateProps);
    expect(defineLeftVal).toHaveBeenCalled();
    expect(setState).toHaveBeenCalled();

    model.setState({ shiftRight: 44 } as StateProps);
    expect(setState).toHaveBeenCalledTimes(2);
    expect(defineRightVal).toHaveBeenCalled();

    model.setState({ position: '44' });
    expect(defineStep).toHaveBeenCalled();
    expect(mathPositionToPercent).toHaveBeenCalled();

    model.setState({ position: '87' });
    expect(defineStep).toHaveBeenCalledTimes(1);

    expect(updateCoordinate).toHaveBeenCalledTimes(0);

    model.setState({ [keyChanges.ACTIVE]: 44 });
    expect(activeButton).toHaveBeenCalled();
    expect(checkExtremePoint).toHaveBeenCalled();

    model.setState({ [keyChanges.INTERVAL]: 20 } as IntervalProps);
    model.setState({ [keyChanges.SHIFT_LEFT]: 24 } as StateProps);
    model.setState({ [keyChanges.SHIFT_RIGHT]: 24 } as StateProps);
    model.setStateValid({ step: 10 } as StateProps);
    model.setState({ [keyChanges.ACTIVE]: 55 });
    expect(checkExtremePoint).toHaveBeenCalledTimes(2);
    expect(model.getState.isActiveLeft).toEqual(false);

    model.setStateValid({ step: 97 } as StateProps);
    model.setState({ [keyChanges.ACTIVE]: -10 });
    expect(model.getState.isActiveLeft).toEqual(true);
  });

  test('call validStep methods', () => {
    model.setState({ stepSize: 42 } as StateProps);
    model.setState({ stepSize: -42 } as StateProps);

    const defineStep = jest.spyOn(Model.prototype as any, 'defineStep');
    const validStep = jest.spyOn(Model.prototype as any, 'validStep');
    model.setStateValid({ max: 10, min: 10 } as StateProps);

    model.setState({ [keyChanges.POSITION]: 5 });
    expect(defineStep).toHaveBeenCalled();
    expect(validStep).toHaveBeenCalled();
  });

  test('call mathPositionToPercent methods', () => {
    const mathPositionToPercent = jest.spyOn(
      Model.prototype as any,
      'mathPositionToPercent',
    );
    model.setState({ position: '44' });
    expect(mathPositionToPercent).toHaveBeenCalled();
    expect(mathPositionToPercent).toHaveBeenCalledTimes(1);
    model.setStateValid({ stepSize: 10 } as StateProps);
    model.setState({ position: '23' });
    expect(mathPositionToPercent).toHaveBeenCalledTimes(2);
    model.setState({ position: '13' });
    expect(mathPositionToPercent).toHaveBeenCalledTimes(3);

    model.setStateValid({ rotate: 'vertical' } as StateProps);
    model.setState({ position: '73' });
    expect(mathPositionToPercent).toHaveBeenCalledTimes(4);
  });

  test('return state', () => {
    model.setState(stateHorizontal);

    expect(model.getState).toEqual(stateHorCorrect);
    expect(model.getState).not.toEqual(stateVertical);
  });
});
