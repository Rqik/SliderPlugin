import { rotate } from '../../Interface';

class Interval {
  interval: HTMLUListElement = document.createElement('ul');

  rotate: rotate = 'horizontal';

  constructor() {
    this.init();
  }

  init(): void {
    this.interval.className = 'interval_point';

    if (this.rotate === 'vertical') {
      this.interval.classList.add('interval_point_vertical');
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
      li.className = 'interval_point-item';
      sum = Math.round((i * interval + minValue) * 10 ** round) / 10 ** round;
      li.innerHTML = `<span>${sum} </span>`;
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
