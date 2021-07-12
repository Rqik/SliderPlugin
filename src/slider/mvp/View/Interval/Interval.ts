import { Rotate } from '../../../types/interfaces';
import {
  interval as className,
  rotation,
} from '../../../types/constants';

interface IRenderInterval {
  min: number;
  max: number;
  count: number;
  stepSize: number
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
    stepSize,
    intervalStep,
  }: IRenderInterval): HTMLElement {
    this.interval.textContent = '';

    if (count <= 0) {
      return this.interval;
    }
    const rangeSize = Math.abs(max - min);

    let step;
    const fragment = document.createDocumentFragment();
    const maxCountStep = Math.round(rangeSize / stepSize);
    let countStep: number;
    let decimal: number | string = String(stepSize).split('.')[1] || 1;
    decimal = String(decimal).length;
    if (maxCountStep <= count) {
      countStep = maxCountStep + 1;

      // eslint-disable-next-line no-param-reassign
      intervalStep = stepSize;
    } else {
      countStep = count;
    }
    this.items = Array(countStep + 1)
      .fill('')
      .map((_, i) => {
        const li = document.createElement('li');

        step = Math.floor((i * intervalStep + min) * 10e6) / 10e6;
        li.className = className.INTERVAL_ITEM;

        if (stepSize) {
          step = Math.round(step / stepSize) * stepSize;
          step = Math.round(step * 10 ** Number(decimal)) / 10 ** Number(decimal);
        }
        if (step > max) {
          step -= min;
        }
        if (step > max) {
          step = max;
        }
        if (step < min) {
          step = min;
        }
        if (i === 0) {
          step = min;
        }
        if (i === countStep) {
          step = max;
        }

        const percent = Math.abs((step - min) / rangeSize) * 100;

        if (this.rotate === rotation.HORIZONTAL) {
          li.style.left = `${percent}%`;
        } else {
          li.style.top = `${percent}%`;
        }

        li.innerHTML = `<div class=${className.INTERVAL_ITEM_TEXT}> ${step} </div>`;
        fragment.append(li);
        return li;
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
