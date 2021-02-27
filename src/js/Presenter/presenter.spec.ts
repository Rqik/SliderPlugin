import { rotate } from "./../interface";
import Present from "./presenter";
import View from "../View/view";
import Model from "../Model/model";
import EventObsever from "../observer";

// jest.mock("../Model/model.ts");

// const ObserverMock = EventObsever as jest.MockedClass<typeof EventObsever>;
beforeEach(() => {
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
describe("Presenter test", () => {
  let present: Present;
  let selector = "test_selecor";
  beforeEach(() => {
    present = new Present(selector);
  });

  test("test function start", () => {
    present.init = jest.fn();
    present.start = jest.fn();
    present.view.editView = jest.fn();
    present.model.edit = jest.fn();

    present.sliderMode({ rotate: "horizontal" });
    expect(present.init).toHaveBeenCalled();
    expect(present.init).toHaveBeenCalledTimes(1);

    expect(present.start).toHaveBeenCalled();
    expect(present.start).toHaveBeenCalledTimes(1);
    expect(present.view.editView).toHaveBeenCalled();
    expect(present.view.editView).toHaveBeenCalledTimes(1);
    expect(present.model.edit).toHaveBeenCalled();
    expect(present.model.edit).toHaveBeenCalledTimes(1);
  });
  test("unsubscribe ", () => {
    let kek = jest.fn((el) => {
      return el * 2;
    });
    function les() {
      return 2;
    }
    let obs = new EventObsever();
    obs.subscribe(les);
    expect(obs.observers).toEqual([les]);

    obs.unsubscribe(les);
    expect(obs.observers).toEqual([]);
  });
});