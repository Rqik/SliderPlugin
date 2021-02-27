import View from "./view";
import EventObsever from "../observer";
import { IState } from "../interface";

let state: IState = {
  selector: "slider_rqik", // селектор
  minValue: 0, // минимальное значение
  maxValue: 120, // максимальное значение
  range: "two", // 1 или 2 указателя
  rotate: "horizontal", // ориентация vertical horizontal
  show: true, // показыватьть текущее значение над указателем
  showInterval: true, // показать интервал
  intervalCount: 7, // количество интервалов
  stepSize: 1, // шаг движения указателя в px
  currentVal1: 0, // установка значений в числах
  currentVal2: 70, // установка значений в числах
  round: 1, // округление,
  pixelSize: "6",
  shiftXl: 0,
  shiftXr: 200,
};

let state2: IState = {
  selector: "slider_rqik", // селектор
  minValue: 0, // минимальное значение
  maxValue: 120, // максимальное значение
  range: "one", // 1 или 2 указателя
  rotate: "vertical", // ориентация vertical horizontal
  show: false, // показыватьть текущее значение над указателем
  showInterval: false, // показать интервал
  intervalCount: 7, // количество интервалов
  stepSize: 20, // шаг движения указателя в px
  currentVal1: 0, // установка значений в числах
  currentVal2: 70, // установка значений в числах
  round: 4, // округление,
  pixelSize: "6",
  shiftXl: 0,
  shiftXr: 200,
};

jest.mock("../observer.ts");
const ObserverMock = EventObsever as jest.MockedClass<typeof EventObsever>;

beforeEach(() => {
  // Clear all instances and calls to constructor and all methods:
  ObserverMock.mockClear();

  let sliderElem: HTMLElement = document.createElement("div");

  expect(sliderElem.style.position).toBeDefined();
  jest.spyOn(document, "querySelector").mockImplementation((selector) => {
    switch (selector) {
      case ".slider_rqik":
        return sliderElem;
      default:
        return sliderElem;
    }
  });
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe("Observer test", () => {
  test("calls observer", () => {
    expect(EventObsever).not.toHaveBeenCalled();

    const view = new View(state);

    expect(ObserverMock).toHaveBeenCalled();
    expect(ObserverMock).toHaveBeenCalledTimes(1);
    expect(ObserverMock).not.toHaveBeenCalledTimes(2);
  });
});

describe("View test", () => {
  let view: View;

  describe("state1 true", () => {
    beforeEach(() => {
      view = new View(state);
    });
    // установлено ли значение в relative
    test("slider style property check", () => {
      expect(view.slider.style.position).toBe("relative");
    });

    test("sliderinit calls function ", () => {
      view.show = jest.fn();
      view.addElem = jest.fn();
      view.addAction = jest.fn();
      view.resizeSLider = jest.fn();
      view.removeStyle = jest.fn();
      view.sliderInit();

      expect(view.removeStyle).toHaveBeenCalled();
      expect(view.removeStyle).toHaveBeenCalledTimes(1);
      expect(view.removeStyle).toHaveBeenLastCalledWith(view.slider);

      expect(view.show).toHaveBeenCalled();
      expect(view.show).toHaveBeenCalledTimes(1);

      expect(view.addElem).toHaveBeenCalled();
      expect(view.addElem).toHaveBeenCalledTimes(1);

      expect(view.addAction).toHaveBeenCalled();
      expect(view.addAction).toHaveBeenCalledTimes(1);

      expect(view.resizeSLider).toHaveBeenCalled();
      expect(view.resizeSLider).toHaveBeenCalledTimes(1);
    });

    test("removeStyle clear attribute style", () => {
      let tes = document.createElement("div");
      let chil = document.createElement("div");
      tes.append(chil);
      tes.style.width = "500px";
      chil.style.height = "500px";
      expect(tes.style.width).toBe("500px");

      view.removeStyle(tes);
      expect(JSON.stringify(chil.attributes)).toEqual("{}");
    });
    test("call sliderInit", () => {
      let init = jest.spyOn(view, "sliderInit");
      view.sliderInit();
      expect(init).toHaveBeenCalled();
      expect(init).toHaveBeenCalledTimes(1);
    });

    test("drawing interval showInterval : true", () => {
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
      let currentVal = view.sliderRange.querySelector(".slider__current_value");
      expect(!!currentVal).toBe(true);
      let currentRigth = view.currentValRight.currentVal;
      expect(currentVal).toEqual(currentRigth);
      expect(view.currentValLeft.currentVal).toEqual(
        view.currentValRight.currentVal
      );
    });

    test("add element in main slider ", () => {
      let button = view.slider.querySelector(".slider__range_button");
      expect(button).toEqual(view.buttonRight.button);

      let sliderRange = view.slider.querySelector(".slider__range");
      expect(sliderRange).toEqual(view.sliderRange);
    });
    test('movebutton function rotate: "horizontal"', () => {
      view.buttonWidth = 10;
      view.state.rotate = "horizontal";
      view.state.heightSlider = 100;
      view.state.shiftXl = 1000;
      view.state.shiftXr = 10;

      view.currentValueText = jest.fn();
      view.showCurentValue = jest.fn();
      view.activeZoneAction = jest.fn();
      view.newObserver.broadcast = jest.fn((el: any) => {
        return el;
      });

      expect(view.currentValueText).not.toHaveBeenCalled();
      expect(view.showCurentValue).not.toHaveBeenCalled();

      view.moveButton(-2201);
      expect(view.currentButton.style.left).toEqual(`calc(0% - 10px)`);
      expect(view.currentButton.style.top).toEqual("-100px");

      expect(view.newObserver.broadcast).toHaveBeenCalled();
      expect(view.newObserver.broadcast).toHaveBeenCalledWith({ shiftXr: 0 });

      expect(view.state.shiftXl).toBeLessThan(view.state.shiftXr);
      expect(view.state.shiftXl).toBeLessThanOrEqual(473);
      expect(view.state.shiftXl).toEqual(10);

      expect(view.state.shiftXr).toBeGreaterThan(view.state.shiftXl);
      expect(view.state.shiftXr).toBeGreaterThanOrEqual(900);
      expect(view.state.shiftXr).toEqual(1000);

      view.tumblerB = true;
      view.moveButton(1230);
      expect(view.currentButton.style.left).toEqual(`calc(100% - 10px)`);
      expect(view.currentButton.style.top).toEqual("-100px");

      expect(view.newObserver.broadcast).toHaveBeenLastCalledWith({
        shiftXl: 100,
      });

      view.moveButton(-0);
      expect(view.currentButton.style.left).toEqual(`calc(0% - 10px)`);
      expect(view.currentButton.style.top).toEqual("-100px");

      expect(view.currentValueText).toHaveBeenCalled();
      expect(view.currentValueText).not.toHaveBeenCalledTimes(1);
      expect(view.currentValueText).toHaveBeenCalledTimes(3);

      expect(view.showCurentValue).toHaveBeenCalled();
      expect(view.showCurentValue).not.toHaveBeenCalledTimes(1);
      expect(view.showCurentValue).toHaveBeenCalledTimes(3);

      expect(view.activeZoneAction).toHaveBeenCalled();
      expect(view.activeZoneAction).not.toHaveBeenCalledTimes(1);
      expect(view.activeZoneAction).toHaveBeenCalledTimes(3);
    });

    test("setting the current value on the prompts", () => {
      view.state.currentVal2 = 987;
      view.state.currentVal1 = 123;

      view.tumblerB = true;
      view.currentValueText();
      expect(view.currentValLeft.currentVal.textContent).toEqual("987");

      view.tumblerB = false;
      view.currentValueText();
      expect(view.currentValRight.currentVal.textContent).toEqual("123");
    });

    describe("position setting for prompts", () => {
      test("horizontal", () => {
        view.state.rotate = "horizontal";
        view.state.shiftXr = 100;
        view.state.shiftXl = 10;

        view.tumblerB = true;
        view.showCurentValue();

        expect(view.currentValLeft.currentVal.style.left).toEqual(
          `calc(10% - ${view.currentValLeft.currentVal.offsetWidth / 2}px)`
        );
        expect(view.currentValLeft.currentVal.style.left).not.toEqual(
          `calc(120% - 10px)`
        );

        view.tumblerB = false;
        view.showCurentValue();

        expect(view.currentValRight.currentVal.style.left).toEqual(
          `calc(100% - ${view.currentValRight.currentVal.offsetWidth / 2}px)`
        );

        expect(view.currentValRight.currentVal.style.left).not.toEqual(
          `calc(20% - 10px)`
        );
      });
      test("vertical", () => {
        view.state.rotate = "vertical";
        view.state.shiftXr = 100;
        view.state.shiftXl = 10;
        Object.defineProperty(view.currentValLeft.currentVal, "offsetWidth", {
          value: 20,
        });
        Object.defineProperty(view.currentValLeft.currentVal, "offsetHeight", {
          value: 10,
        });
        Object.defineProperty(view.currentValRight.currentVal, "offsetWidth", {
          value: 50,
        });
        Object.defineProperty(view.currentValRight.currentVal, "offsetHeight", {
          value: 40,
        });
        view.tumblerB = true;
        view.showCurentValue();
        expect(view.currentValLeft.currentVal.style.top).toEqual(
          `calc(10% - 5px)`
        );
        expect(view.currentValLeft.currentVal.style.top).not.toEqual(
          `calc(120% - 10px)`
        );
        expect(view.currentValLeft.currentVal.style.left).toEqual("-35px");
        expect(view.currentValLeft.currentVal.style.left).not.toEqual("25px");

        view.tumblerB = false;
        view.showCurentValue();

        expect(view.currentValRight.currentVal.style.top).toEqual(
          "calc(100% - 20px)"
        );
        expect(view.currentValRight.currentVal.style.top).not.toEqual(
          `calc(120% - 20px)`
        );
        expect(view.currentValRight.currentVal.style.left).toEqual("-65px");
        expect(view.currentValRight.currentVal.style.left).not.toEqual("225px");
      });
    });
    test("install activezone size", () => {
      view.state.shiftXr = 100;
      view.state.shiftXl = 10;

      view.activeZoneAction();
      expect(view.slideClass.sliderActiveZone.style.left).toEqual("10%");
      expect(view.slideClass.sliderActiveZone.style.width).toEqual("90%");
      expect(view.slideClass.sliderActiveZone.style.width).not.toEqual("91%");
    });
    test("making changes to state ", () => {
      view.editView(state2);
      expect(view.state).toEqual(state2);
    });

    test("button action", () => {
      let event: MouseEvent = new MouseEvent("mousedown", {
        bubbles: true,
        cancelable: true,
      });

      let event2: MouseEvent = new MouseEvent("mousedown", {
        bubbles: true,
        cancelable: true,
      });

      let move: MouseEvent = new MouseEvent("mousemove", {
        bubbles: true,
        cancelable: true,
      });

      let moveUp: MouseEvent = new MouseEvent("mouseup", {
        bubbles: true,
        cancelable: true,
      });

      Object.defineProperty(move, "pageX", { value: 100 });
      Object.defineProperty(move, "pageY", { value: 100 });

      Object.defineProperty(event, "currentTarget", {
        get: function () {
          return view.buttonLeft.button;
        },
        configurable: true,
      });

      Object.defineProperty(event2, "currentTarget", {
        get: function () {
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
      expect(view.tumblerB).toEqual(true);

      document.dispatchEvent(move);
      expect(view.remove).not.toHaveBeenCalled();
      expect(view.clickHandler).toHaveBeenCalled();
      expect(view.clickHandler).toHaveBeenCalledTimes(1);

      document.dispatchEvent(moveUp);
      expect(view.remove).toHaveBeenCalled();
      expect(view.remove).toHaveBeenCalledTimes(1);

      view.buttonAction(event2);
      expect(view.tumblerB).toEqual(false);
      expect(view.tumblerB).not.toEqual(true);
    });

    test("remove eventlistener", () => {
      view.clickHandler = jest.fn();
      let events: any = {};

      // Define the addEventListener method with a Jest mock function
      document.addEventListener = jest.fn((event, callback) => {
        events[event] = callback;
      });
      document.removeEventListener = jest.fn((event, callback) => {
        events[event] = "";
      });
      document.addEventListener("mousemove", view.clickHandler);
      expect(events["mousemove"]).toEqual(view.clickHandler);
      view.remove();
      expect(events["mousemove"]).toEqual("");
    });

    test("installation size installMove", () => {
      view.initMove = jest.fn((min, max) => {
        min + max;
      });
      Object.defineProperty(view.slider, "offsetLeft", { value: 100 });
      Object.defineProperty(view.slider, "offsetTop", { value: 200 });

      view.state.rotate = "horizontal";
      view.installMove(100, 20);
      expect(view.sliderIdent).toEqual(100);
      expect(view.initMove).toHaveBeenCalled();
      view.state.rotate = "vertical";
      view.installMove(100, 20);
      expect(view.sliderIdent).toEqual(200);
      expect(view.initMove).toHaveBeenCalledTimes(2);
    });
    test("initMove", async () => {
      let s = jest.fn((el) => el * 2);
      view.moveButton = s;
      await view.initMove(100, 220);
      expect(s.mock.calls.length).toEqual(2);
      expect(s.mock.results[0].value).toEqual(200);
      expect(s.mock.results[1].value).toEqual(440);
      expect(view.moveButton).toHaveBeenCalled();
      expect(view.moveButton).toHaveBeenCalledTimes(2);
      expect(view.moveButton).toHaveBeenLastCalledWith(220);
      expect(view.tumblerB).toBe(false);
      expect(view.currentButton).toEqual(view.buttonRight.button);
    });
  });

  describe("state2 false", () => {
    beforeEach(() => {
      view = new View(state2);
    });
    test("drawing interval showInterval : false", () => {
      view.intervalExpose = jest.fn();
      view.show();
      expect(view.intervalExpose).not.toHaveBeenCalled();
      expect(view.intervalExpose).not.toHaveBeenCalledTimes(1);
    });
    test('drawwing button left  : "two"', () => {
      view.buttonLeftExpose = jest.fn();
      view.show();
      expect(view.buttonLeftExpose).not.toHaveBeenCalled();
      expect(view.buttonLeftExpose).not.toHaveBeenCalledTimes(1);
    });
    test('drawing currentVal  show: "false"', () => {
      let currentVal = view.sliderRange.querySelector(".slider__current_value");
      expect(!!currentVal).toBe(false);
      let parentCLosest = view.currentValRight.currentVal.closest(
        ".slider_rqik"
      );
      expect(parentCLosest).toEqual(null);
      expect(!!view.currentValLeft.currentVal).toEqual(true);
      expect(!!view.currentValRight.currentVal).toEqual(true);
      expect(view.currentValLeft.currentVal).toEqual(
        view.currentValRight.currentVal
      );
    });
    test('movebutton function rotate: "vertical"', () => {
      view.buttonWidth = 10;
      view.state.rotate = "vertical";
      view.state.widthSlider = 100;

      view.currentValueText = jest.fn();
      view.showCurentValue = jest.fn();
      view.activeZoneAction = jest.fn();

      view.moveButton(-2000);
      expect(view.currentButton.style.left).toEqual("-100px");
      expect(view.currentButton.style.top).toEqual(`calc(0% - 10px)`);

      view.moveButton(2000);
      expect(view.currentButton.style.left).toEqual("-100px");
      expect(view.currentButton.style.top).toEqual(`calc(100% - 10px)`);

      view.moveButton(0);
      expect(view.currentButton.style.left).toEqual("-100px");
      expect(view.currentButton.style.top).toEqual(`calc(0% - 10px)`);

      expect(view.currentValueText).not.toHaveBeenCalled();
      expect(view.showCurentValue).not.toHaveBeenCalled();

      expect(view.activeZoneAction).toHaveBeenCalled();
      expect(view.activeZoneAction).toHaveBeenCalledTimes(3);
    });
    test("install activezone size", () => {
      view.state.shiftXr = 50;
      view.state.shiftXl = 40;
      view.slideClass.edit("vertical");
      view.activeZoneAction();
      expect(view.slideClass.sliderActiveZone.style.top).toEqual("40%");
      expect(view.slideClass.sliderActiveZone.style.height).toEqual("10%");
      expect(view.slideClass.sliderActiveZone.style.height).not.toEqual("11%");
    });
    test("mathPercent function", () => {
      Object.defineProperty(view.slider, "offsetWidth", {
        value: 220,
      });
      Object.defineProperty(view.slider, "offsetLeft", {
        value: 20,
      });
      Object.defineProperty(view.slider, "offsetTop", {
        value: 50,
      });
      Object.defineProperty(view.slider, "offsetHeight", {
        value: 400,
      });

      view.state.rotate = "horizontal";
      let first = view.mathPercent(100);
      let second = view.mathPercent(40);

      expect(first).toEqual(8000 / 220);
      expect(first).not.toEqual(400 / 220);
      expect(second).toEqual(2000 / 220);
      expect(second).not.toEqual(330 / 220);

      view.state.rotate = "vertical";
      first = view.mathPercent(100);
      second = view.mathPercent(40);

      expect(first).toEqual(5000 / 400);
      expect(first).not.toEqual(400 / 400);
      expect(second).toEqual(-1000 / 400);
      expect(second).not.toEqual(1000 / 400);
    });

    test("mathOperation function", () => {
      let array = [
        0,
        10,
        20,
        22.23123,
        38.22132,
        40.23232,
        50.212,
        49.99,
        10022.2,
      ];
      array = array.map((el) => {
        return view.mathOperation(el);
      });

      expect(array).toEqual([0, 20, 20, 20, 40, 40, 60, 40, 10020]);
    });

    test("activate function onMouseMove", () => {
      let event: MouseEvent = new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window,
      });
      view.mathPercent = jest.fn();
      view.moveButton = jest.fn();
      view.mathOperation = jest.fn();
      view.state.stepSize = 1;

      view.onMouseMove(event);

      expect(view.mathPercent).toHaveBeenCalled();
      expect(view.mathPercent).toHaveBeenCalledTimes(1);
      expect(view.moveButton).toHaveBeenCalled();
      expect(view.moveButton).toHaveBeenCalledTimes(1);
      expect(view.mathOperation).not.toHaveBeenCalled();
      expect(view.mathOperation).not.toHaveBeenCalledTimes(1);
      view.state.rotate = "horizontal";
      view.state.stepSize = 22;
      view.onMouseMove(event);
      expect(view.mathPercent).toHaveBeenCalled();
      expect(view.mathPercent).toHaveBeenCalledTimes(2);
      expect(view.moveButton).toHaveBeenCalled();
      expect(view.moveButton).toHaveBeenCalledTimes(2);
      expect(view.mathOperation).toHaveBeenCalled();
      expect(view.mathOperation).toHaveBeenCalledTimes(1);
    });

    test("movePoint function ", () => {
      let event: MouseEvent = new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window,
      });
      view.onMouseMove = jest.fn();
      view.movePoint(event);
      view.movePoint(event);
      view.movePoint(event);

      expect(view.onMouseMove).toHaveBeenCalled();
      expect(view.onMouseMove).toHaveBeenCalledTimes(3);
    });

    test("making changes to state ", () => {
      view.editView(state);
      expect(view.state).toEqual(state);
    });
    test("reinitialization function reRender", () => {
      view.show = jest.fn();
      view.addElem = jest.fn();
      view.resizeSLider = jest.fn();
      view.reRender();

      expect(view.slider.textContent).toEqual("");

      expect(view.show).toHaveBeenCalled();
      expect(view.show).toHaveBeenCalledTimes(1);

      expect(view.addElem).toHaveBeenCalled();
      expect(view.addElem).toHaveBeenCalledTimes(1);

      expect(view.resizeSLider).toHaveBeenCalled();
      expect(view.resizeSLider).toHaveBeenCalledTimes(1);
    });
  });
});
