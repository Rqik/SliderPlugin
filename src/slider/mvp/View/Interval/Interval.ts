import { rotate } from '../../../types/interfaces';
import { interval as className, rotation } from '../../../types/constants';

interface IRenderInterval {
  minValue: number;
  maxValue: number;
  count: number;
  intervalStep: number;
}
class Interval {
  interval: HTMLUListElement = document.createElement('ul');

  items: HTMLLIElement[] = [document.createElement('li')];

  private rotate: rotate = rotation.HORIZONTAL;

  constructor() {
    this.init();
  }

  renderIntervals({
    minValue,
    maxValue,
    count,
    intervalStep,
  }: IRenderInterval): HTMLElement {
    this.interval.textContent = '';

    if (count <= 0) {
      return this.interval;
    }

    let sum;
    const fragment = document.createDocumentFragment();

    this.items = Array(count + 1)
      .fill('')
      .map((_, i) => {
        const li = document.createElement('li');
        sum = Math.round((i * intervalStep + minValue) * 10e6) / 10e6;
        li.className = className.INTERVAL_ITEM;

        li.innerHTML = i !== count
          ? `<div class=${className.INTERVAL_ITEM_TEXT}> ${sum} </div>`
          : `<div class=${className.INTERVAL_ITEM_TEXT}> ${maxValue} </div>`;
        fragment.append(li);
        return li;
      });

    this.interval.append(fragment);
    return this.interval;
  }

  edit(rot: rotate): void {
    this.rotate = rot;
    this.init();
  }

  private init(): void {
    this.interval.className = className.INTERVAL;

    if (this.rotate === rotation.VERTICAL) {
      this.interval.classList.add(className.INTERVAL_VERTICAL);
    }
  }
}

export { Interval };
