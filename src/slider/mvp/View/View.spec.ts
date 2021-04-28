import {View} from './View';
import {EventObserver} from '../../utils/EventObserver';
import {IState} from '../../utils/Interface';
import {rotation} from '../../utils/constatnts';

const state: IState = {
  selector: 'slider-rqik', // селектор
  minValue: 0, // минимальное значение
  maxValue: 120, // максимальное значение
  range: 'two', // 1 или 2 указателя
  rotate: rotation.HORIZONTAL, // ориентация vertical horizontal
  show: true, // показывать текущее значение над указателем
  showInterval: true, // показать интервал
  intervalCount: 7, // количество интервалов
  stepSize: 1, // шаг движения указателя в px
  currentVal1: 0, // установка значений в числах
  currentVal2: 70, // установка значений в числах
  pixelSize: '6',
  shiftXl: 0,
  shiftXr: 100,
  step: 0,
  activeLeft: false,
};

const state2: IState = {
  selector: 'slider-rqik', // селектор
  minValue: 0, // минимальное значение
  maxValue: 120, // максимальное значение
  range: 'one', // 1 или 2 указателя
  rotate: rotation.VERTICAL, // ориентация vertical horizontal
  show: false, // показывать текущее значение над указателем
  showInterval: false, // показать интервал
  intervalCount: 7, // количество интервалов
  stepSize: 20, // шаг движения указателя в px
  currentVal1: 0, // установка значений в числах
  currentVal2: 70, // установка значений в числах
  pixelSize: '6',
  shiftXl: 0,
  shiftXr: 200,
  stepSizePercent: 0,
  step: 0,
  activeLeft: false,
};

jest.mock('../../utils/EventObserver.ts');
const ObserverMock = EventObserver as jest.MockedClass<typeof EventObserver>;

beforeEach(() => {
  // Clear all instances and calls to constructor and all methods:
  ObserverMock.mockClear();

  const sliderElem: HTMLElement = document.createElement('div');

  expect(sliderElem.style.position).toBeDefined();
  jest.spyOn(document, 'querySelector').mockImplementation((selector) => {
    switch (selector) {
      case '.slider-rqik':
        return sliderElem;
      default:
        return sliderElem;
    }
  });
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('Observer test', () => {
  test('calls observer', () => {
    expect(EventObserver).not.toHaveBeenCalled();

    const view = new View(state);

    expect(ObserverMock).toHaveBeenCalled();
    expect(ObserverMock).toHaveBeenCalledTimes(1);
    expect(ObserverMock).not.toHaveBeenCalledTimes(2);
  });
});

describe('View test', () => {
  let view: View;

  describe('state1 true', () => {
    beforeEach(() => {
      view = new View(state);
    });

    test('slider style property check', () => {
      const startView = jest.spyOn(View.prototype as any, 'startView');
      const test = new View(state);
      expect(startView).toHaveBeenCalled();
      expect(startView).toHaveBeenCalledTimes(1);
    });

    test('render calls function ', () => {
      const show = jest.spyOn(View.prototype as any, 'show');
      const addElem = jest.spyOn(View.prototype as any, 'addElem');
      const addAction = jest.spyOn(View.prototype as any, 'addAction');
      const resizeSlider = jest.spyOn(View.prototype as any, 'resizeSlider');
      const installMove = jest.spyOn(View.prototype as any, 'installMove');
      view.render();

      expect(show).toHaveBeenCalled();
      expect(show).toHaveBeenCalledTimes(1);

      expect(addElem).toHaveBeenCalled();
      expect(addElem).toHaveBeenCalledTimes(1);

      expect(addAction).toHaveBeenCalled();
      expect(addAction).toHaveBeenCalledTimes(1);

      expect(resizeSlider).toHaveBeenCalled();
      expect(resizeSlider).toHaveBeenCalledTimes(1);

      expect(installMove).toHaveBeenCalled();
      expect(installMove).toHaveBeenCalledTimes(1);
    });

    test('call render', () => {
      const init = jest.spyOn(view, 'render');
      view.render();
      expect(init).toHaveBeenCalled();
      expect(init).toHaveBeenCalledTimes(1);
    });

    test('drawing interval showInterval : true', () => {
      const buttonLeftExpose = jest.spyOn(
        View.prototype as any,
        'buttonLeftExpose',
      );
      const buttonLeftRemove = jest.spyOn(
        View.prototype as any,
        'buttonLeftRemove',
      );
      const intervalExpose = jest.spyOn(
        View.prototype as any,
        'intervalExpose',
      );
      view.editView(state);
      view.render();
      expect(buttonLeftExpose).toHaveBeenCalled();
      expect(buttonLeftExpose).toHaveBeenCalledTimes(1);
      expect(intervalExpose).toHaveBeenCalled();
      expect(intervalExpose).toHaveBeenCalledTimes(1);
      view.editView(state2);
      view.render();
      expect(buttonLeftRemove).toHaveBeenCalled();
      expect(buttonLeftRemove).toHaveBeenCalledTimes(1);
      expect(buttonLeftExpose).toHaveBeenCalledTimes(1);
      expect(intervalExpose).toHaveBeenCalledTimes(1);
    });
  });
});
