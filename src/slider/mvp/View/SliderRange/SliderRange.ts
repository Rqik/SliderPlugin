import { rotate } from '../../../utils/Interface';
import { rotation, slider as className } from '../../../utils/constatnts';

class SliderRange {
  sliderRange: HTMLElement = document.createElement('div');

  sliderActiveZone: HTMLElement = document.createElement('div');

 private rotate: rotate = rotation.HORIZONTAL;

 constructor(rot: rotate) {
   this.init(rot);
 }

 private init(rot: rotate): HTMLElement {
   this.sliderRange.className = className.SLIDER;
   this.sliderActiveZone.className = className.SLIDER_ACTIVE_ZONE;
   if (rot === rotation.VERTICAL) {
     this.sliderRange.classList.add(className.SLIDER_VERTICAL);
   }
   this.sliderRange.appendChild(this.sliderActiveZone);
   return this.sliderRange;
 }

 edit(rot: rotate): void {
   if (rot === rotation.VERTICAL) {
     this.rotate = rot;
     this.sliderRange.classList.add(className.SLIDER_VERTICAL);
   } else if (rot === rotation.HORIZONTAL) {
     this.rotate = rot;
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
}

export { SliderRange };
