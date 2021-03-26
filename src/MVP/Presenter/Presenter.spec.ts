import { rotate } from '../Interface';
import { Present } from './Presenter';
import { View } from '../View/View';
import { Model } from '../Model/Model';
import { EventObserver } from '../EventObserver';

// jest.mock("../Model/model.ts");

// const ObserverMock = EventObserver as jest.MockedClass<typeof EvenObserver>;
beforeEach(() => {
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
describe('Presenter test', () => {
  let present: Present;
  const selector = 'test_selector';
  beforeEach(() => {
    present = new Present(selector);
  });

  test('test function start', () => {
    present.init = jest.fn();
    // present.start = jest.fn();
    present.view.editView = jest.fn();
    present.model.edit = jest.fn();
    present.model.stateCurrent.rotate = 'horizontal';

    present.sliderMode({ rotate: 'horizontal' });
    expect(present.init).not.toHaveBeenCalled();
    // expect(present.start).toHaveBeenCalled();
    // expect(present.start).toHaveBeenCalledTimes(1);

    present.model.stateCurrent.rotate = 'vertical';
    present.sliderMode({ rotate: 'horizontal' });
    expect(present.init).toHaveBeenCalled();
    expect(present.init).toHaveBeenCalledTimes(1);

    expect(present.view.editView).toHaveBeenCalled();
    expect(present.view.editView).toHaveBeenCalledTimes(2);
    expect(present.model.edit).toHaveBeenCalled();
    expect(present.model.edit).toHaveBeenCalledTimes(2);
  });
  test('unsubscribe ', () => {
    const kek = jest.fn((el) => el * 2);
    function les() {
      return 2;
    }
    const obs = new EventObserver();
    obs.subscribe(les);
    expect(obs.observers).toEqual([les]);

    obs.unsubscribe(les);
    expect(obs.observers).toEqual([]);
  });
});