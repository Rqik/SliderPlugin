import { rotate } from '../../utils/Interface';
import { Present } from './Presenter';
import { View } from '../View/View';
import { Model } from '../Model/Model';
import { EventObserver } from '../../utils/EventObserver';

// jest.mock('../Model/Model.ts');
// jest.mock('../View/View.ts');

const ObserverMock = EventObserver as jest.MockedClass<typeof EventObserver>;
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
    const init = jest.spyOn(Present.prototype as any, 'init');
    const render = jest.spyOn(View.prototype as any, 'render');

    const testPresent = new Present(selector);

    expect(init).toHaveBeenCalled();
    expect(render).toHaveBeenCalled();
    present.model.edit = jest.fn();
    present.model.stateCurrent.rotate = 'horizontal';

    present.sliderMode({ rotate: 'horizontal' });

    present.model.stateCurrent.rotate = 'vertical';
    present.sliderMode({ rotate: 'horizontal' });

    expect(init).toHaveBeenCalled();
    expect(init).toHaveBeenCalledTimes(3);

    expect(present.model.edit).toHaveBeenCalled();
    expect(present.model.edit).toHaveBeenCalledTimes(11);
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