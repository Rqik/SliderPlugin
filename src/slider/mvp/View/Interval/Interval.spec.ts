import { Interval } from './Interval';

describe('Interval test', () => {
  let inter: Interval;
  beforeEach(() => {
    inter = new Interval();
  });
  test('valueInterval', () => {
    // inter.valueInterval= jest.fn();
    inter.valueInterval(10, 100, 0, 2);
    const s = document.createElement('ul');
    s.className = 'interval-point';
    expect(inter.interval).toEqual(s);
  });
});
