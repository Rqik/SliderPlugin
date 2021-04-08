import {rotate} from '../../../utils/Interface';
import {interval as className, rotation} from '../../../utils/constatnts';

class Interval {
  interval: HTMLUListElement = document.createElement('ul');

  private rotate: rotate = rotation.HORIZONTAL;

  constructor() {
    this.init();
  }

  private init(): void {
    this.interval.className = className.INTERVAL;

    if (this.rotate === rotation.VERTICAL) {
      this.interval.classList.add(className.INTERVAL_VERTICAL);
    }
  }

  valueInterval(
    minValue: number,
    maxValue: number,
    count: number,
    round: number,
  ): HTMLElement {
    // interval это кол подписей минимум 2
    this.interval.textContent = '';
    if (count <= 0) {
      return this.interval;
    }
    const interval: number = (maxValue - minValue) / count;
    let sum;
    for (let i = 0; i <= count; i += 1) {
      const li = document.createElement('li');
      li.className = className.INTERVAL_ITEM;
      sum = Math.round((i * interval + minValue) * 10 ** round) / 10 ** round;
      li.innerHTML = `<div class=${className.INTERVAL_ITEM_TEXT}> ${sum} </div>`;
      this.interval.append(li);
    }

    return this.interval;
  }

  edit(rot: rotate): void {
    this.rotate = rot;
    this.init();
  }
}
export { Interval };
