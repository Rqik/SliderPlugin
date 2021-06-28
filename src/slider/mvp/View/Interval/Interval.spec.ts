import { interval as className } from '../../../types/constants';
import { Interval } from './Interval';

describe('Interval test', () => {
  let inter: Interval;
  beforeEach(() => {
    inter = new Interval();
  });
  test('renderIntervals', () => {
    inter.renderIntervals({
      minValue: 10,
      maxValue: 100,
      count: 0,
      intervalStep: 0,
    });
    const s = document.createElement('ul');
    s.className = className.INTERVAL;
    expect(inter.interval).toEqual(s);
    expect(inter.interval.textContent).toEqual('');
  });
});
