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
  ): HTMLElement {
    // interval это кол подписей минимум 2
    this.interval.textContent = '';
    if (count <= 0) {
      return this.interval;
    }
    const interval: number = (maxValue - minValue) / count;
    let sum;
    let fragment = document.createDocumentFragment()
    for (let i = 0; i <= count; i += 1) {
      const li = document.createElement('li');
      li.className = className.INTERVAL_ITEM;
      sum = (i * interval + minValue);
      li.innerHTML = `<div class=${className.INTERVAL_ITEM_TEXT}> ${sum} </div>`;
      fragment.append(li);
    }
    this.interval.append(fragment)
    return this.interval;
  }

  edit(rot: rotate): void {
    this.rotate = rot;
    this.init();
  }
}

export {Interval};
