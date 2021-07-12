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
    const remainder = 0;
    const maxCountStep = Math.round(rangeSize / stepSize);
    let countStep: number;
    let decimal: number | string = String(stepSize).split('.')[1] || 1;
    decimal = String(decimal).length;
    console.log(String(decimal).length);
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
        if (maxCountStep <= count) {
          // step = Math.round(step / intervalStep) * intervalStep + min;
        } else if (stepSize) {
          // step = Math.round(step / stepSize) * stepSize + min;
        }

        if (stepSize) {
          step = Math.round(step / stepSize) * stepSize;
          step = Math.round(step * 10 ** Number(decimal)) / 10 ** Number(decimal);
          // remainder = step > intervalStep ? step % intervalStep : 0;
          // console.log(remainder);
          // console.log(Math.round(step / stepSize) * stepSize);
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
        // console.log(step);

        // console.log(step);

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

  // renderIntervals({
  //   min,
  //   max,
  //   count,
  //   stepSize,
  //   intervalStep,
  // }: IRenderInterval): HTMLElement {
  //   this.interval.textContent = '';
  //
  //   if (count <= 0) {
  //     return this.interval;
  //   }
  //
  //   let sum;
  //   let remainder = 0;
  //   const fragment = document.createDocumentFragment();
  //   const intervals: Set<number> = new Set();
  //   const rangeSize = Math.abs(max - min);
  //   console.log(rangeSize);
  //   this.items = Array(count + 1)
  //     .fill('')
  //     .map((_, i) => {
  //       const li = document.createElement('li');
  //
  //       sum = Math.round((i * intervalStep + min) * 10e6) / 10e6;
  //       if (stepSize) {
  //         remainder = sum % stepSize;
  //       }
  //       li.className = className.INTERVAL_ITEM;
  //       const percent = ((sum - min) / rangeSize) * 100;
  //
  //       sum = i !== count ? sum - remainder : max;
  //
  //       fragment.append(li);
  //       intervals.add({ sum, percent });
  //     });
  //
  //   intervals.forEach((elem) => {
  //     const { sum, percent } = elem;
  //     // ((number - min) / rangeSize) * 100;
  //     const li = document.createElement('li');
  //     li.className = className.INTERVAL_ITEM;
  //     li.innerHTML = `<div class=${className.INTERVAL_ITEM_TEXT}>${sum}</div>`;
  //     if (this.rotate === rotation.HORIZONTAL) {
  //       li.style.left = `${percent}%`;
  //     } else {
  //       li.style.top = `${percent}%`;
  //     }
  //     fragment.append(li);
  //     // this.items.push(li);
  //   });
  //   this.interval.append(fragment);
  //
  //   return this.interval;
  // }

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
