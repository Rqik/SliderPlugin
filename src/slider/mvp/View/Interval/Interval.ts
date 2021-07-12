import { Rotate } from '../../../types/interfaces';
import {
  interval as className,
  rotation,
} from '../../../types/constants';

interface IRenderInterval {
  min: number;
  max: number;
  count: number;
  intervalStep: number;
}

class Interval {
  interval: HTMLUListElement = document.createElement('ul');

  items: HTMLLIElement[] = [];

  private rotate: Rotate = rotation.HORIZONTAL;

  constructor() {
    this.init();
  }

  renderIntervals({
    min,
    max,
    count,
    intervalStep,
  }: IRenderInterval): HTMLElement {
    this.interval.textContent = '';
    let maxVal = max;
    let minVal = min;
    if (min > max) {
      [maxVal, minVal] = [minVal, maxVal];
    }
    if (count <= 0) {
      return this.interval;
    }
    const rangeSize = Math.abs(max - min);
    let step;
    const fragment = document.createDocumentFragment();

    const intervalSteps: Set<number> = new Set();
    Array(count + 1)
      .fill('')
      .forEach((_, i) => {
        step = Math.round((i * intervalStep + min) * 10 ** 5) / 10 ** 5;

        if (step > maxVal) {
          step -= min;
        }
        if (step > maxVal) {
          step = max;
        }
        if (step < minVal) {
          step = min;
        }
        if (i === 0) {
          step = min;
        }
        if (i === count) {
          step = max;
        }
        intervalSteps.add(step);
      });
    intervalSteps.forEach((size) => {
      const li = document.createElement('li');

      li.className = className.INTERVAL_ITEM;

      li.innerHTML = `<div class=${className.INTERVAL_ITEM_TEXT}> ${size} </div>`;
      const percent = Math.abs((size - min) / rangeSize) * 100;
      if (this.rotate === rotation.HORIZONTAL) {
        li.style.left = `${percent}%`;
      } else {
        li.style.top = `${percent}%`;
      }
      fragment.append(li);
      this.items.push(li);
    });
    this.interval.append(fragment);
    return this.interval;
  }

  edit(rot: Rotate): void {
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
