import EventObserver from '../../utils/EventObserver';
import { rotation } from '../../types/constants';
import View from '../View/View';
import Presenter from './Presenter';
import defaultState from '../Model/default-state';
import { CallBack, StateProps } from '../../types/interfaces';

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
  let present: Presenter;
  const selector = 'slider-rqik';
  beforeEach(() => {
    present = new Presenter(selector);
  });

  test('test function init', () => {
    const init = jest.spyOn(Presenter.prototype as any, 'init');
    const render = jest.spyOn(View.prototype as any, 'render');

    const testPresent = new Presenter(selector);

    expect(init).toHaveBeenCalled();
    expect(render).toHaveBeenCalled();
    // present.model.getState.rotate = rotation.HORIZONTAL;
    present.setState({ rotate: rotation.HORIZONTAL } as StateProps);

    // present.model.getState.rotate = rotation.VERTICAL;
    present.setState({ rotate: rotation.VERTICAL } as StateProps);

    expect(init).toHaveBeenCalled();
    expect(init).toHaveBeenCalledTimes(1);
  });
  test('getState method', () => {
    let state = present.getState();
    expect(state).toEqual(defaultState);
  });
  test('subscribe method', () => {
    const fn: CallBack = (data) => {};
    present.subscribe(fn);
    expect(present.model.observer.observers.length).toEqual(2);
    present.unsubscribe(fn);
    expect(present.model.observer.observers.length).toEqual(1);
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
