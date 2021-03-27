import { rotate } from '../../../utils/Interface';

class Interval {
  interval: HTMLUListElement = document.createElement('ul');

  private rotate: rotate = 'horizontal';

  constructor() {
    this.init();
  }

  private init(): void {
    this.interval.className = 'interval-point';

    if (this.rotate === 'vertical') {
      this.interval.classList.add('interval-point_vertical');
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
      li.className = 'interval-point__item';
      sum = Math.round((i * interval + minValue) * 10 ** round) / 10 ** round;
      li.innerHTML = `<div class="interval-point__item-text">${sum} </div>`;
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
