import { rotate } from '../../../utils/Interface';

class SliderRange {
  sliderRange: HTMLElement = document.createElement('div');

  sliderActiveZone: HTMLElement = document.createElement('div');

 private rotate: rotate = 'horizontal';

  constructor(rot: rotate) {
    this.init(rot);
  }

 private init(rot: rotate): HTMLElement {
    this.sliderRange.className = 'slider-range';
    this.sliderActiveZone.className = 'slider-range_active';
    if (rot === 'vertical') {
      this.sliderRange.classList.add('slider-range_vertical');
    }
    this.sliderRange.appendChild(this.sliderActiveZone);
    return this.sliderRange;
  }

  edit(rot: rotate): void {
    if (rot === 'vertical') {
      this.rotate = rot;
      this.sliderRange.classList.add('slider-range_vertical');
    } else if (rot === 'horizontal') {
      this.rotate = rot;
      this.sliderRange.classList.remove('slider-range_vertical');
    }
  }

  activeZone(left: number, right: number): void {
    if (this.rotate === 'horizontal') {
      this.sliderActiveZone.style.left = `${left}%`;
      this.sliderActiveZone.style.width = `${right - left}%`;
    } else {
      this.sliderActiveZone.style.top = `${left}%`;
      this.sliderActiveZone.style.height = `${right - left}%`;
    }
  }
}

export { SliderRange };
