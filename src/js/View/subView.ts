import { rotate } from '../interface';

class Button {
  button: HTMLElement = document.createElement('div');

  widthButton = 110;

  constructor() {
    this.init();
    this.width();
  }

  init(): void {
    this.button.className = 'slider__range_button';
  }

  addEvent(type: string, action: (e: MouseEvent) => void): void {
    this.button.addEventListener(type, (e: any) => action(e));
  }

  width(): number {
    return (this.widthButton = this.button.offsetWidth / 2);
  }
}

class CurrentValue {
  currentVal: HTMLElement = document.createElement('div');

  constructor() {
    this.init();
  }

  init(): void {
    this.currentVal.className = 'slider__current_value';
  }

  text(text: string | number): void {
    this.currentVal.textContent = `${text}`;
  }

  positionHorizont(shiftX: string | number): void {
    this.currentVal.style.left = `calc(${shiftX}% - ${
      this.currentVal.offsetWidth / 2
    }px)`;
  }

  positionVertical(shiftX: string | number): void {
    this.currentVal.style.top = `calc(${shiftX}% - ${
      this.currentVal.offsetHeight / 2
    }px)`;
    this.currentVal.style.left = `${-(+this.currentVal.offsetWidth + 15)}px`;
  }
}

class Interval {
  interval: HTMLUListElement = document.createElement('ul');

  rotate: rotate = 'horizontal';

  constructor() {
    this.init();
  }

  init(): void {
    this.interval.className = 'interval_point';

    if (this.rotate == 'vertical') {
      this.interval.classList.add('interval_point_vertical');
    }
  }

  valueInterval(
    minValue: number,
    maxValue: number,
    count: number,
    round: number
  ): HTMLElement {
    // interval это кол подписей минимум 2
    this.interval.textContent = '';
    if (count <= 0) {
      return this.interval;
    }
    const interval: number = (maxValue - minValue) / count;
    let sum;
    for (let i = 0; i <= count; i++) {
      const li = document.createElement('li');
      li.className = 'interval_point-item';
      sum = Math.round((i * interval + minValue) * 10 ** round) / 10 ** round;
      li.innerHTML = `<span>${sum} </span>`;
      this.interval.append(li);
    }

    return this.interval;
  }

  edit(rotate: rotate): void {
    this.rotate = rotate;
    this.init();
  }
}

class SliderRange {
  sliderRange: HTMLElement = document.createElement('div');

  sliderActiveZone: HTMLElement = document.createElement('div');

  rotate: rotate = 'horizontal';

  constructor(rotate: rotate) {
    this.init(rotate);
  }

  init(rotate: rotate): HTMLElement {
    this.sliderRange.className = 'slider__range';
    this.sliderActiveZone.className = 'slider__range_active';
    if (rotate === 'vertical') {
      this.sliderRange.classList.add('slider__range_vertical');
    }
    this.sliderRange.appendChild(this.sliderActiveZone);
    return this.sliderRange;
  }

  edit(rotate: rotate): void {
    if (rotate === 'vertical') {
      this.rotate = rotate;
      this.sliderRange.classList.add('slider__range_vertical');
    } else if (rotate === 'horizontal') {
      this.rotate = rotate;
      this.sliderRange.classList.remove('slider__range_vertical');
    }
  }

  activeZone(left: number, rigth: number): void {
    if (this.rotate == 'horizontal') {
      this.sliderActiveZone.style.left = `${left}%`;
      this.sliderActiveZone.style.width = `${rigth - left}%`;
    } else {
      this.sliderActiveZone.style.top = `${left}%`;
      this.sliderActiveZone.style.height = `${rigth - left}%`;
    }
  }
}

export { Button, SliderRange, CurrentValue, Interval };
