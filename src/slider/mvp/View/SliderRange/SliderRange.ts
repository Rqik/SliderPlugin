import { Rotate } from '../../../types/interfaces';
import { rotation, slider as className } from '../../../types/constants';

class SliderRange {
  sliderRange: HTMLElement = document.createElement('div');

  sliderActiveZone: HTMLElement = document.createElement('div');

  private rotate: Rotate = rotation.HORIZONTAL;

  constructor(rot: Rotate) {
    this.init(rot);
  }

  edit(rot: Rotate): void {
    this.rotate = rot;

    if (rot === rotation.VERTICAL) {
      this.sliderRange.classList.add(className.SLIDER_VERTICAL);
    } else {
      this.sliderRange.classList.remove(className.SLIDER_VERTICAL);
    }
  }

  activeZone(left: number, right: number): void {
    if (this.rotate === rotation.HORIZONTAL) {
      this.sliderActiveZone.style.left = `${left}%`;
      this.sliderActiveZone.style.width = `${right - left}%`;
    } else {
      this.sliderActiveZone.style.top = `${left}%`;
      this.sliderActiveZone.style.height = `${right - left}%`;
    }
  }

  private init(rot: Rotate):void {
    this.sliderRange.className = className.SLIDER;
    this.sliderActiveZone.className = className.SLIDER_ACTIVE_ZONE;
    this.edit(rot);
    this.sliderRange.appendChild(this.sliderActiveZone);
  }
}

export { SliderRange };
