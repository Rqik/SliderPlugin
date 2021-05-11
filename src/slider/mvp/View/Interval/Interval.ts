import { rotate } from '../../../types/interfaces';
import { interval as className, rotation } from '../../../types/constatnts';

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

  renderIntervals(
    minValue: number,
    maxValue: number,
    count: number,
  ): HTMLElement {
    this.interval.textContent = '';
    if (count <= 0) {
      return this.interval;
    }
    const interval: number = (maxValue - minValue) / count;
    let sum;
    const fragment = document.createDocumentFragment();

    Array(count + 1).fill('').forEach((el, i) => {
      const li = document.createElement('li');
      sum = (i * interval + minValue);
      li.className = className.INTERVAL_ITEM;
      li.innerHTML = `<div class=${className.INTERVAL_ITEM_TEXT}> ${sum} </div>`;
      fragment.append(li);
    });

    this.interval.append(fragment);
    return this.interval;
  }

  edit(rot: rotate): void {
    this.rotate = rot;
    this.init();
  }
}

export { Interval };
