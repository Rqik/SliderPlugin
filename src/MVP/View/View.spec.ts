import { View } from './View';
import { EventObserver } from '../EventObserver';
import { IState } from '../Interface';

const state: IState = {
  selector: 'slider_rqik', // селектор
  minValue: 0, // минимальное значение
  maxValue: 120, // максимальное значение
  range: 'two', // 1 или 2 указателя
  rotate: 'horizontal', // ориентация vertical horizontal
  show: true, // показыватьть текущее значение над указателем
  showInterval: true, // показать интервал
  intervalCount: 7, // количество интервалов
  stepSize: 1, // шаг движения указателя в px
  currentVal1: 0, // установка значений в числах
  currentVal2: 70, // установка значений в числах
  round: 1, // округление,
  pixelSize: '6',
  shiftXl: 0,
  shiftXr: 100,
  stepSizePercent: 0,
  step:0,
  activeLeft: false

};

const state2: IState = {
  selector: 'slider_rqik', // селектор
  minValue: 0, // минимальное значение
  maxValue: 120, // максимальное значение
  range: 'one', // 1 или 2 указателя
  rotate: 'vertical', // ориентация vertical horizontal
  show: false, // показыватьть текущее значение над указателем
  showInterval: false, // показать интервал
  intervalCount: 7, // количество интервалов
  stepSize: 20, // шаг движения указателя в px
  currentVal1: 0, // установка значений в числах
  currentVal2: 70, // установка значений в числах
  round: 4, // округление,
  pixelSize: '6',
  shiftXl: 0,
  shiftXr: 200,
  stepSizePercent: 0,
  step:0,
  activeLeft: false

};

jest.mock('../observer.ts');
const ObserverMock = EventObserver as jest.MockedClass<typeof EventObserver>;

beforeEach(() => {
  // Clear all instances and calls to constructor and all methods:
  ObserverMock.mockClear();

  const sliderElem: HTMLElement = document.createElement('div');

  expect(sliderElem.style.position).toBeDefined();
  jest.spyOn(document, 'querySelector').mockImplementation((selector) => {
    switch (selector) {
      case '.slider_rqik':
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
    // установлено ли значение в relative
    test('slider style property check', () => {
      expect(view.slider.style.position).toBe('relative');
    });

    test('render calls function ', () => {
      view.show = jest.fn();
      view.addElem = jest.fn();
      view.addAction = jest.fn();
      view.resizeSlider = jest.fn();
      view.removeStyle = jest.fn();
      view.render();

      expect(view.removeStyle).toHaveBeenCalled();
      expect(view.removeStyle).toHaveBeenCalledTimes(1);
      expect(view.removeStyle).toHaveBeenLastCalledWith(view.slider);

      expect(view.show).toHaveBeenCalled();
      expect(view.show).toHaveBeenCalledTimes(1);

      expect(view.addElem).toHaveBeenCalled();
      expect(view.addElem).toHaveBeenCalledTimes(1);

      expect(view.addAction).toHaveBeenCalled();
      expect(view.addAction).toHaveBeenCalledTimes(1);

      expect(view.resizeSlider).toHaveBeenCalled();
      expect(view.resizeSlider).toHaveBeenCalledTimes(1);
    });

    test('removeStyle clear attribute style', () => {
      const tes = document.createElement('div');
      const chil = document.createElement('div');
      tes.append(chil);
      tes.style.width = '500px';
      chil.style.height = '500px';
      expect(tes.style.width).toBe('500px');

      view.removeStyle(tes);
      expect(JSON.stringify(chil.attributes)).toEqual('{}');
    });
    test('call render', () => {
      const init = jest.spyOn(view, 'render');
      view.render();
      expect(init).toHaveBeenCalled();
      expect(init).toHaveBeenCalledTimes(1);
    });

    test('drawing interval showInterval : true', () => {
      expect(view.intervalExpose).toBeDefined();
      expect(view.intervalExpose).not.toBeUndefined();
      view.intervalExpose = jest.fn();
      view.show();
      expect(view.intervalExpose).toHaveBeenCalled();
      expect(view.intervalExpose).toHaveBeenCalledTimes(1);
    });
    test('drawwing button left  : "two"', () => {
      expect(view.buttonLeftExpose).toBeDefined();
      expect(view.buttonLeftExpose).not.toBeUndefined();
      view.buttonLeftExpose = jest.fn();
      view.show();
      expect(view.buttonLeftExpose).toHaveBeenCalled();
      expect(view.buttonLeftExpose).toHaveBeenCalledTimes(1);
    });

    test('drawing currentVal  show: "true"', () => {
      view.state.range = 'two';
      view.render();
      const currentVal = view.sliderRange.querySelector(
        '.slider__current_value',
      );
      expect(!!currentVal).toBe(true);
      const currentRigth = view.currentValRight.currentVal;

      expect(currentVal).toEqual(currentRigth);

      expect(view.currentValLeft.currentVal).toEqual(
        view.currentValRight.currentVal,
      );
    });

    test('add element in main slider ', () => {
      view.render();
      const button = view.slider.querySelector('.slider__range_button');
      expect(button).toEqual(view.buttonRight.button);

      const sliderRange = view.slider.querySelector('.slider__range');
      expect(sliderRange).toEqual(view.sliderRange);
    });
    test('movebutton function rotate: "horizontal"', () => {
      view.buttonWidth = 10;
      view.state.rotate = 'horizontal';
      view.state.heightSlider = 100;
      view.state.shiftXl = 10;
      view.state.shiftXr = 100;
      view.state.tumbler = false;
      view.currentValueText = jest.fn();
      view.showCurrentValue = jest.fn();
      view.activeZoneAction = jest.fn();
      view.observer.broadcast = jest.fn((el: any) => el);

      expect(view.currentValueText).not.toHaveBeenCalled();
      expect(view.showCurrentValue).not.toHaveBeenCalled();
      view.overridingButtons(false);
      view.eventButton(100);
      expect(view.currentButton.style.left).toEqual('calc(100% - 10px)');
      expect(view.currentButton.style.top).toEqual('-100px');

      expect(view.observer.broadcast).toHaveBeenCalled();
      expect(view.observer.broadcast).toHaveBeenCalledWith({ shiftXr: 100 });

      expect(view.state.shiftXr).toBeGreaterThan(view.state.shiftXl);
      expect(view.state.shiftXr).toBeLessThanOrEqual(473);
      expect(view.state.shiftXl).toBeLessThan(view.state.shiftXr);
      expect(view.state.shiftXr).toBeGreaterThan(90);

      view.overridingButtons(true);
      view.eventButton(40);
      expect(view.currentButton.style.left).toEqual('calc(40% - 10px)');
      expect(view.currentButton.style.top).toEqual('-100px');

      expect(view.observer.broadcast).toHaveBeenLastCalledWith({
        shiftXl: 40,
      });

      view.eventButton(-0);
      expect(view.currentButton.style.left).toEqual('calc(0% - 10px)');
      expect(view.currentButton.style.top).toEqual('-100px');

      expect(view.currentValueText).toHaveBeenCalled();
      expect(view.currentValueText).not.toHaveBeenCalledTimes(1);
      expect(view.currentValueText).toHaveBeenCalledTimes(3);

      expect(view.showCurrentValue).toHaveBeenCalled();
      expect(view.showCurrentValue).not.toHaveBeenCalledTimes(1);
      expect(view.showCurrentValue).toHaveBeenCalledTimes(3);

      expect(view.activeZoneAction).toHaveBeenCalled();
      expect(view.activeZoneAction).not.toHaveBeenCalledTimes(1);
      expect(view.activeZoneAction).toHaveBeenCalledTimes(3);
    });

    test('setting the current value on the prompts', () => {
      view.state.currentVal2 = 987;
      view.state.currentVal1 = 123;

      view.tumbler = true;
      view.currentValueText();
      expect(view.currentValLeft.currentVal.textContent).toEqual('987');

      view.tumbler = false;
      view.currentValueText();
      expect(view.currentValRight.currentVal.textContent).toEqual('123');
    });

    describe('position setting for prompts', () => {
      test('horizontal', () => {
        view.state.rotate = 'horizontal';
        view.state.shiftXr = 100;
        view.state.shiftXl = 10;

        view.tumbler = true;
        view.showCurrentValue();

        expect(view.currentValLeft.currentVal.style.left).toEqual(
          `calc(10% - ${view.currentValLeft.currentVal.offsetWidth / 2}px)`,
        );
        expect(view.currentValLeft.currentVal.style.left).not.toEqual(
          'calc(120% - 10px)',
        );

        view.tumbler = false;
        view.showCurrentValue();

        expect(view.currentValRight.currentVal.style.left).toEqual(
          `calc(100% - ${view.currentValRight.currentVal.offsetWidth / 2}px)`,
        );

        expect(view.currentValRight.currentVal.style.left).not.toEqual(
          'calc(20% - 10px)',
        );
      });
      test('vertical', () => {
        view.state.rotate = 'vertical';
        view.state.shiftXr = 100;
        view.state.shiftXl = 10;
        Object.defineProperty(view.currentValLeft.currentVal, 'offsetWidth', {
          value: 20,
        });
        Object.defineProperty(view.currentValLeft.currentVal, 'offsetHeight', {
          value: 10,
        });
        Object.defineProperty(view.currentValRight.currentVal, 'offsetWidth', {
          value: 50,
        });
        Object.defineProperty(view.currentValRight.currentVal, 'offsetHeight', {
          value: 40,
        });
        view.overridingButtons(true);
        view.currentValLeft.setRotate(view.state.rotate);
        view.showCurrentValue();
        expect(view.currentValLeft.currentVal.style.top).toEqual(
          'calc(10% - 5px)',
        );
        expect(view.currentValLeft.currentVal.style.top).not.toEqual(
          'calc(120% - 10px)',
        );
        expect(view.currentValLeft.currentVal.style.left).toEqual('-35px');
        expect(view.currentValLeft.currentVal.style.left).not.toEqual('25px');
        view.currentValRight.setRotate(view.state.rotate);
        view.tumbler = false;
        view.showCurrentValue();

        expect(view.currentValRight.currentVal.style.top).toEqual(
          'calc(100% - 20px)',
        );
        expect(view.currentValRight.currentVal.style.top).not.toEqual(
          'calc(120% - 20px)',
        );
        expect(view.currentValRight.currentVal.style.left).toEqual('-65px');
        expect(view.currentValRight.currentVal.style.left).not.toEqual('225px');
      });
    });
    test('install activezone size', () => {
      view.state.shiftXr = 100;
      view.state.shiftXl = 10;

      view.activeZoneAction();
      expect(view.slideClass.sliderActiveZone.style.left).toEqual('10%');
      expect(view.slideClass.sliderActiveZone.style.width).toEqual('90%');
      expect(view.slideClass.sliderActiveZone.style.width).not.toEqual('91%');
      view.state.shiftXr = 10;
      view.state.shiftXl = 100;
      view.activeZoneAction();
      expect(view.slideClass.sliderActiveZone.style.left).toEqual('10%');
      expect(view.slideClass.sliderActiveZone.style.width).toEqual('90%');
      expect(view.slideClass.sliderActiveZone.style.width).not.toEqual('91%');
    });
    test('making changes to state ', () => {
      view.editView(state2);
      expect(view.state).toEqual(state2);
    });

    test('button action', () => {
      const event: MouseEvent = new MouseEvent('mousedown', {
        bubbles: true,
        cancelable: true,
      });

      const event2: MouseEvent = new MouseEvent('mousedown', {
        bubbles: true,
        cancelable: true,
      });

      const move: MouseEvent = new MouseEvent('mousemove', {
        bubbles: true,
        cancelable: true,
      });

      const moveUp: MouseEvent = new MouseEvent('mouseup', {
        bubbles: true,
        cancelable: true,
      });

      Object.defineProperty(move, 'pageX', { value: 100 });
      Object.defineProperty(move, 'pageY', { value: 100 });

      Object.defineProperty(event, 'currentTarget', {
        get() {
          return view.buttonLeft.button;
        },
        configurable: true,
      });

      Object.defineProperty(event2, 'currentTarget', {
        get() {
          return view.buttonRight.button;
        },
        configurable: true,
      });

      expect(view.buttonLeft.button).toEqual(event.currentTarget);
      expect(view.buttonRight.button).toEqual(event2.currentTarget);
      expect(event).toEqual(event2);
      view.clickHandler = jest.fn();
      view.remove = jest.fn();
      view.buttonAction(event);
      expect(view.tumbler).toEqual(true);

      document.dispatchEvent(move);
      expect(view.remove).not.toHaveBeenCalled();
      expect(view.clickHandler).toHaveBeenCalled();
      expect(view.clickHandler).toHaveBeenCalledTimes(1);

      document.dispatchEvent(moveUp);
      expect(view.remove).toHaveBeenCalled();
      expect(view.remove).toHaveBeenCalledTimes(1);

      view.buttonAction(event2);
      expect(view.tumbler).toEqual(false);
      expect(view.tumbler).not.toEqual(true);
    });

    test('remove event listener', () => {
      view.clickHandler = jest.fn();
      const events: any = {};

      // Define the addEventListener method with a Jest mock function
      document.addEventListener = jest.fn((event, callback) => {
        events[event] = callback;
      });
      document.removeEventListener = jest.fn((event, callback) => {
        events[event] = '';
      });
      document.addEventListener('mousemove', view.clickHandler);
      expect(events.mousemove).toEqual(view.clickHandler);
      view.remove();
      expect(events.mousemove).toEqual('');
    });

    test('installation size installMove', () => {
      view.initMove = jest.fn((min, max) => {
        min + max;
      });
      Object.defineProperty(view.slider, 'offsetLeft', { value: 100 });
      Object.defineProperty(view.slider, 'offsetTop', { value: 200 });

      view.state.rotate = 'horizontal';
      view.installMove();
      // expect(view.sliderIdent).toEqual(100);
      expect(view.initMove).toHaveBeenCalled();
      view.state.rotate = 'vertical';
      view.installMove();
      // expect(view.sliderIdent).toEqual(200);
      expect(view.initMove).toHaveBeenCalledTimes(2);
    });
    test('initMove', async () => {
      const s = jest.fn((el) => el * 2);
      view.eventButton = s;
      await view.initMove(100, 220);
      expect(s.mock.calls).toHaveLength(2);
      expect(s.mock.results[0].value).toEqual(200);
      expect(s.mock.results[1].value).toEqual(440);
      expect(view.eventButton).toHaveBeenCalled();
      expect(view.eventButton).toHaveBeenCalledTimes(2);
      expect(view.eventButton).toHaveBeenLastCalledWith(220);
      expect(view.tumbler).toBe(false);
      expect(view.currentButton).toEqual(view.buttonRight.button);
    });
  });

  describe('state2 false', () => {
    beforeEach(() => {
      view = new View(state2);
    });
    test('drawing interval showInterval : false', () => {
      view.intervalExpose = jest.fn();
      view.show();
      expect(view.intervalExpose).not.toHaveBeenCalled();
      expect(view.intervalExpose).not.toHaveBeenCalledTimes(1);
    });
    test('drawing button left  : "two"', () => {
      view.buttonLeftExpose = jest.fn();
      view.show();
      expect(view.buttonLeftExpose).not.toHaveBeenCalled();
      expect(view.buttonLeftExpose).not.toHaveBeenCalledTimes(1);
    });
    test('drawing currentVal  show: "false"', () => {
      const currentVal = view.sliderRange.querySelector(
        '.slider__current_value',
      );
      expect(!!currentVal).toBe(false);
      const parentClosest = view.currentValRight.currentVal.closest(
        '.slider_rqik',
      );
      expect(parentClosest).toEqual(null);
      expect(!!view.currentValLeft.currentVal).toEqual(true);
      expect(!!view.currentValRight.currentVal).toEqual(true);
      expect(view.currentValLeft.currentVal).toEqual(
        view.currentValRight.currentVal,
      );
    });
    test('move button function rotate: "vertical"', () => {
      view.buttonWidth = 10;
      view.state.rotate = 'vertical';
      view.state.widthSlider = 100;

      view.currentValueText = jest.fn();
      view.showCurrentValue = jest.fn();
      view.activeZoneAction = jest.fn();

      view.moveButton(20);
      expect(view.currentButton.style.left).toEqual('-100px');
      expect(view.currentButton.style.top).toEqual('calc(20% - 10px)');

      view.moveButton(50);
      expect(view.currentButton.style.left).toEqual('-100px');
      expect(view.currentButton.style.top).toEqual('calc(50% - 10px)');

      view.moveButton(0);
      expect(view.currentButton.style.left).toEqual('-100px');
      expect(view.currentButton.style.top).toEqual('calc(0% - 10px)');

      expect(view.currentValueText).not.toHaveBeenCalled();
      expect(view.showCurrentValue).not.toHaveBeenCalled();

      expect(view.activeZoneAction).toHaveBeenCalled();
      expect(view.activeZoneAction).toHaveBeenCalledTimes(3);
    });
    test('install active zone size', () => {
      view.state.shiftXr = 50;
      view.state.shiftXl = 40;
      view.slideClass.edit('vertical');
      view.activeZoneAction();
      expect(view.slideClass.sliderActiveZone.style.top).toEqual('40%');
      expect(view.slideClass.sliderActiveZone.style.height).toEqual('10%');
      expect(view.slideClass.sliderActiveZone.style.height).not.toEqual('11%');
    });
    // test('mathPercent function', () => {
    //   Object.defineProperty(view.slider, 'offsetWidth', {
    //     value: 220,
    //   });
    //   Object.defineProperty(view.slider, 'offsetLeft', {
    //     value: 20,
    //   });
    //   Object.defineProperty(view.slider, 'offsetTop', {
    //     value: 50,
    //   });
    //   Object.defineProperty(view.slider, 'offsetHeight', {
    //     value: 400,
    //   });
    //
    //   view.state.rotate = 'horizontal';
    //   let first = view.mathPercent(100);
    //   let second = view.mathPercent(40);
    //
    //   expect(first).toEqual(8000 / 220);
    //   expect(first).not.toEqual(400 / 220);
    //   expect(second).toEqual(2000 / 220);
    //   expect(second).not.toEqual(330 / 220);
    //
    //   view.state.rotate = 'vertical';
    //   first = view.mathPercent(100);
    //   second = view.mathPercent(40);
    //
    //   expect(first).toEqual(5000 / 400);
    //   expect(first).not.toEqual(400 / 400);
    //   expect(second).toEqual(-1000 / 400);
    //   expect(second).not.toEqual(1000 / 400);
    // });

    // test('mathStepPercent function', () => {
    //   view.state.stepSizePerc = 25;
    //   let array = [0, 10, 20, 22.23123, 38.22132, 40.23232, 50.212, 49.99, 100];
    //   // array = array.map((el) => view.mathStepPercent(el));
    //
    //   // expect(array).toEqual([0, 0, 25, 25, 50, 50, 50, 50, 100]);
    // });
    // test('mathStepPixel function', () => {
    //   let array = [
    //     0,
    //     10,
    //     20,
    //     22.23123,
    //     38.22132,
    //     40.23232,
    //     50.212,
    //     49.99,
    //     10022.2,
    //   ];
    //   // array = array.map((el) => view.mathStepPixel(el));
    //
    //   // expect(array).toEqual([0, 20, 20, 20, 40, 40, 60, 40, 10020]);
    // });

    // test('activate function onMouseMove', () => {
    //   const event: MouseEvent = new MouseEvent('click', {
    //     bubbles: true,
    //     cancelable: true,
    //     view: window,
    //   });
    //   view.mathPercent = jest.fn();
    //   view.mathStepPixel = jest.fn();
    //   view.mathStepPercent = jest.fn();
    //   view.eventButton = jest.fn();
    //   view.state.stepSize = 1;
    //   view.state.stepSizePerc = 0;
    //   view.onMouseMove(event);
    //
    //   expect(view.mathPercent).toHaveBeenCalled();
    //   expect(view.mathPercent).toHaveBeenCalledTimes(1);
    //   expect(view.mathStepPercent).not.toHaveBeenCalled();
    //   expect(view.mathStepPixel).not.toHaveBeenCalled();
    //   expect(view.mathStepPixel).not.toHaveBeenCalledTimes(1);
    //   view.state.rotate = 'horizontal';
    //   view.state.stepSize = 22;
    //   view.onMouseMove(event);
    //   expect(view.mathPercent).toHaveBeenCalled();
    //   expect(view.mathPercent).toHaveBeenCalledTimes(2);
    //
    //   expect(view.mathStepPixel).toHaveBeenCalled();
    //   expect(view.mathStepPixel).toHaveBeenCalledTimes(1);
    //   expect(view.mathStepPercent).not.toHaveBeenCalled();
    //
    //   view.state.stepSizePerc = 10;
    //   view.onMouseMove(event);
    //   expect(view.mathStepPercent).toHaveBeenCalled();
    //   expect(view.mathStepPercent).toHaveBeenCalledTimes(1);
    // });

    test('onClickMove function ', () => {
      const event: MouseEvent = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window,
      });
      view.onMouseMove = jest.fn();
      view.onClickMove(event);
      view.onClickMove(event);
      view.onClickMove(event);

      expect(view.onMouseMove).toHaveBeenCalled();
      expect(view.onMouseMove).toHaveBeenCalledTimes(3);
    });

    test('making changes to state ', () => {
      view.editView(state);
      expect(view.state).toEqual(state);
    });
    test('reinitialization function reRender', () => {
      view.show = jest.fn();
      view.addElem = jest.fn();
      view.removeStyle = jest.fn();
      view.reRender();

      expect(view.slider.textContent).toEqual('');

      expect(view.show).toHaveBeenCalled();
      expect(view.show).toHaveBeenCalledTimes(1);

      expect(view.addElem).toHaveBeenCalled();
      expect(view.addElem).toHaveBeenCalledTimes(1);

      expect(view.removeStyle).toHaveBeenCalled();
      expect(view.removeStyle).toHaveBeenCalledTimes(1);
    });
  });
});
