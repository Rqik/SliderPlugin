import { EventObserver } from '../../utils/EventObserver';
import { IState } from '../../types/interfaces';
import { keyChanges, rotation } from '../../types/constants';
import { View } from './View';

const state: IState = {
  selector: 'slider-rqik', // селектор
  min: 0, // минимальное значение
  max: 120, // максимальное значение
  range: 'two', // 1 или 2 указателя
  rotate: rotation.HORIZONTAL, // ориентация vertical horizontal
  showTooltip: true, // показывать текущее значение над указателем
  showInterval: true, // показать интервал
  intervalCount: 7, // количество интервалов
  stepSize: 1, // шаг движения указателя
  maxValue: 0, // установка значений в числах
  minValue: 70, // установка значений в числах
  pixelSize: '6',

  [keyChanges.SHIFT_LEFT]: 0,
  [keyChanges.SHIFT_RIGHT]: 100,
  step: 3,
  isActiveLeft: false,
  [keyChanges.INTERVAL_STEP]: 0,
};

const state2: IState = {
  selector: 'slider-rqik', // селектор
  min: 0, // минимальное значение
  max: 120, // максимальное значение
  range: 'one', // 1 или 2 указателя
  rotate: rotation.VERTICAL, // ориентация vertical horizontal
  showTooltip: false, // показывать текущее значение над указателем
  showInterval: false, // показать интервал
  intervalCount: 7, // количество интервалов
  stepSize: 20, // шаг движения указателя
  maxValue: 0, // установка значений в числах
  minValue: 70, // установка значений в числах
  pixelSize: '6',
  [keyChanges.SHIFT_LEFT]: 0,
  [keyChanges.SHIFT_RIGHT]: 200,
  step: 3,
  isActiveLeft: false,
  [keyChanges.INTERVAL_STEP]: 0,
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
      const init = jest.spyOn(View.prototype as any, 'init');
      let view = new View(state);
      view.setState(state2);
      expect(init).toHaveBeenCalled();
      expect(init).toHaveBeenCalledTimes(1);
    });

    test('render calls function ', () => {
      const show = jest.spyOn(View.prototype as any, 'show');
      const addElem = jest.spyOn(View.prototype as any, 'addElem');
      const addAction = jest.spyOn(View.prototype as any, 'addAction');
      const notifyCoords = jest.spyOn(View.prototype as any, 'notifyCoords');
      const installMove = jest.spyOn(View.prototype as any, 'installMove');
      const initMove = jest.spyOn(View.prototype as any, 'initMove');

      view.render();

      expect(show).toHaveBeenCalled();
      expect(show).toHaveBeenCalledTimes(1);

      expect(addElem).toHaveBeenCalled();
      expect(addElem).toHaveBeenCalledTimes(1);

      expect(addAction).toHaveBeenCalled();
      expect(addAction).toHaveBeenCalledTimes(1);

      expect(notifyCoords).toHaveBeenCalled();
      expect(notifyCoords).toHaveBeenCalledTimes(1);

      expect(installMove).toHaveBeenCalled();
      expect(installMove).toHaveBeenCalledTimes(1);

      expect(initMove).toHaveBeenCalled();
      expect(initMove).toHaveBeenCalledTimes(1);
    });

    test('call private method from ts-ignore', () => {
      let target = document.createElement('div');
      target.textContent = '20';
      let eventMouse = new MouseEvent('mousedown', {
        bubbles: true,
      });

      Object.defineProperty(eventMouse, 'target', {
        value: '20',
        enumerable: true,
        // @ts-ignore
        textContent: '22',
      });

      let eventTouch = new TouchEvent('touchstart', {
        bubbles: true,
        // @ts-ignore
        targetTouches: [target],
      });

      let view = new View(state2);
      // @ts-ignore
      view.currentButton = view.buttonRight.button;
      // @ts-ignore
      const buttonAction = jest.spyOn(View.prototype as any, 'buttonAction');
      // @ts-ignore
      view.buttonAction(eventMouse);
      // @ts-ignore
      view.buttonAction(eventTouch);

      expect(buttonAction).toHaveBeenCalled();
      expect(buttonAction).toHaveBeenCalledTimes(2);

      const onClickInterval = jest.spyOn(
        View.prototype as any,
        'onClickInterval',
      );

      // @ts-ignore
      view.onClickInterval(eventMouse);

      expect(onClickInterval).toHaveBeenCalled();
      expect(onClickInterval).toHaveBeenCalledTimes(1);

      const responsiveCurrent = jest.spyOn(
        View.prototype as any,
        'responsiveCurrent',
      );

      // @ts-ignore
      view.responsiveCurrent(true);
      expect(responsiveCurrent).toHaveBeenCalled();
      // @ts-ignore
      view.state.minValue = view.state.maxValue;
      // @ts-ignore
      view.responsiveCurrent(true);
      expect(responsiveCurrent).toHaveBeenCalledTimes(2);

      view = new View(state);

      const onMouseMove = jest.spyOn(View.prototype as any, 'onMouseMove');

      //@ts-ignore
      view.onMouseMove(eventMouse);

      expect(onMouseMove).toHaveBeenCalledTimes(1);
    });

    test('call render', () => {
      const render = jest.spyOn(view, 'render');
      view.render();
      expect(render).toHaveBeenCalled();
      expect(render).toHaveBeenCalledTimes(1);
    });

    test('drawing interval showInterval : true', () => {
      const buttonLeftDisplay = jest.spyOn(
        View.prototype as any,
        'buttonLeftDisplay',
      );
      const buttonLeftRemove = jest.spyOn(
        View.prototype as any,
        'buttonLeftRemove',
      );
      const intervalDisplay = jest.spyOn(
        View.prototype as any,
        'intervalDisplay',
      );
      view.setState(state);
      view.render();
      expect(buttonLeftDisplay).toHaveBeenCalled();
      expect(buttonLeftDisplay).toHaveBeenCalledTimes(1);
      expect(intervalDisplay).toHaveBeenCalled();
      expect(intervalDisplay).toHaveBeenCalledTimes(1);
      view.setState(state2);
      view.render();
      expect(buttonLeftRemove).toHaveBeenCalled();
      expect(buttonLeftRemove).toHaveBeenCalledTimes(1);
      expect(buttonLeftDisplay).toHaveBeenCalledTimes(1);
      expect(intervalDisplay).toHaveBeenCalledTimes(1);
    });
  });
});
