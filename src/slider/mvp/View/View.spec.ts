import { View } from './View';
import { EventObserver } from '../../utils/EventObserver';
import { IState } from '../../types/interfaces';
import { rotation } from '../../types/constants';

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
  currentValRight: 0, // установка значений в числах
  currentValLeft: 70, // установка значений в числах
  pixelSize: '6',
  shiftLeft: 0,
  shiftRight: 100,
  step: 3,
  isActiveLeft: false,
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
  currentValRight: 0, // установка значений в числах
  currentValLeft: 70, // установка значений в числах
  pixelSize: '6',
  shiftLeft: 0,
  shiftRight: 200,
  step: 3,
  isActiveLeft: false,
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

    new View(state);
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
    afterEach(() => {
      jest.restoreAllMocks();
    });

    test('slider style property check', () => {
      const startView = jest.spyOn(View.prototype as any, 'startView');
      let view = new View(state);
      view.editView(state2);
      expect(startView).toHaveBeenCalled();
      expect(startView).toHaveBeenCalledTimes(1);
    });

    test('render calls function ', () => {
      const show = jest.spyOn(View.prototype as any, 'show');
      const addElem = jest.spyOn(View.prototype as any, 'addElem');
      const addAction = jest.spyOn(View.prototype as any, 'addAction');
      const resizeSlider = jest.spyOn(View.prototype as any, 'resizeSlider');
      const installMove = jest.spyOn(View.prototype as any, 'installMove');
      const initMove = jest.spyOn(View.prototype as any, 'initMove');
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

      expect(initMove).toHaveBeenCalled();
      expect(initMove).toHaveBeenCalledTimes(1);
    });

    test('call private method from ts-ignore', () => {
      let eventMouse = new MouseEvent('mousedown', {
        bubbles: true,
      });
      let target = document.createElement('div');
      let eventTouch = new TouchEvent('touchstart', {
        bubbles: true,
        // @ts-ignore
        targetTouches: [target],
      });
      let view = new View(state);

      // @ts-ignore
      const currentButtonAction = jest.spyOn(
        View.prototype as any,
        'currentButtonAction',
      );
      // @ts-ignore
      view.currentButtonAction(eventMouse);
      // @ts-ignore
      view.currentButtonAction(eventTouch);

      expect(currentButtonAction).toHaveBeenCalled();
      expect(currentButtonAction).toHaveBeenCalledTimes(2);

      const responsiveCurrent = jest.spyOn(
        View.prototype as any,
        'responsiveCurrent',
      );

      // @ts-ignore
      view.responsiveCurrent(true);
      expect(responsiveCurrent).toHaveBeenCalled();
      // @ts-ignore
      view.state.currentValLeft = view.state.currentValRight;
      // @ts-ignore
      view.responsiveCurrent(true);
      expect(responsiveCurrent).toHaveBeenCalledTimes(2);

      const onMouseMove = jest.spyOn(View.prototype as any, 'onMouseMove');
      const observerPosition = jest.spyOn(
        View.prototype as any,
        'observerPosition',
      );
      // @ts-ignore
      view.onMouseMove(eventMouse);
      expect(onMouseMove).toHaveBeenCalled();
    });

    test('call render', () => {
      const render = jest.spyOn(view, 'render');
      view.render();
      expect(render).toHaveBeenCalled();
      expect(render).toHaveBeenCalledTimes(1);
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
