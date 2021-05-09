import { Interval } from './Interval';
import { interval as className } from '../../../types/constatnts';

describe('Interval test', () => {
  let inter: Interval;
  beforeEach(() => {
    inter = new Interval();
  });
  test('renderInterval', () => {
    inter.renderInterval(10, 100, 0);
    const s = document.createElement('ul');
    s.className = className.INTERVAL;
    expect(inter.interval).toEqual(s);
    expect(inter.interval.textContent).toEqual('')
  });
});
