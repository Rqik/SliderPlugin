import { Interval } from './Interval';
import { interval as className} from '../../../utils/constatnts';

describe('Interval test', () => {
  let inter: Interval;
  beforeEach(() => {
    inter = new Interval();
  });
  test('valueInterval', () => {
    // inter.valueInterval= jest.fn();
    inter.valueInterval(10, 100, 0, 2);
    const s = document.createElement('ul');
    s.className = className.INTERVAL;
    expect(inter.interval).toEqual(s);
  });
});
