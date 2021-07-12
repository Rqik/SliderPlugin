import { EventObserver } from '../../utils/EventObserver';
import { rotation } from '../../types/constants';
import { View } from '../View/View';
import { Present } from './Presenter';

const ObserverMock = EventObserver as jest.MockedClass<typeof EventObserver>;
beforeEach(() => {
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
    // present.model.getState.rotate = rotation.HORIZONTAL;
    present.setState({ rotate: rotation.HORIZONTAL });

    // present.model.getState.rotate = rotation.VERTICAL;
    present.setState({ rotate: rotation.VERTICAL });

    expect(init).toHaveBeenCalled();
    expect(init).toHaveBeenCalledTimes(3);
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
