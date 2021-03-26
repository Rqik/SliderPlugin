import { rotate } from '../../Interface';

class SliderRange {
  sliderRange: HTMLElement = document.createElement('div');

  sliderActiveZone: HTMLElement = document.createElement('div');

  rotate: rotate = 'horizontal';

  constructor(rot: rotate) {
    this.init(rot);
  }

  init(rot: rotate): HTMLElement {
    this.sliderRange.className = 'slider__range';
    this.sliderActiveZone.className = 'slider__range_active';
    if (rot === 'vertical') {
      this.sliderRange.classList.add('slider__range_vertical');
    }
    this.sliderRange.appendChild(this.sliderActiveZone);
    return this.sliderRange;
  }

  edit(rot: rotate): void {
    if (rot === 'vertical') {
      this.rotate = rot;
      this.sliderRange.classList.add('slider__range_vertical');
    } else if (rot === 'horizontal') {
      this.rotate = rot;
      this.sliderRange.classList.remove('slider__range_vertical');
    }
  }

  activeZone(left: number, rigth: number): void {
    if (this.rotate === 'horizontal') {
      this.sliderActiveZone.style.left = `${left}%`;
      this.sliderActiveZone.style.width = `${rigth - left}%`;
    } else {
      this.sliderActiveZone.style.top = `${left}%`;
      this.sliderActiveZone.style.height = `${rigth - left}%`;
    }
  }
}

export { SliderRange };
