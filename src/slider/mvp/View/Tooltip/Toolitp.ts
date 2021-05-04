import { rotate } from '../../../utils/Interface';
import { rotation, tooltipValue as className } from '../../../utils/constatnts';

class Tooltip {
  tooltipVal: HTMLElement = document.createElement('div');

  private size = 10;

  constructor(private orientation: rotate) {
    this.init();
  }

  private init(): void {
    this.tooltipVal.className = className.TOOLTIP;
  }

  text(text: string | number): void {
    this.tooltipVal.textContent = `${text}`;
  }

  position(position: number): void {
    if (this.orientation === rotation.HORIZONTAL) {
      this.positionHorizontal(position);
    } else if (this.orientation === rotation.VERTICAL) {
      this.positionVertical(position);
    }
  }

  positionHorizontal(shiftX: string | number): void {
    this.tooltipVal.style.top = `${-(+this.tooltipVal.offsetHeight + 10)}px`;
    this.tooltipVal.style.left = `calc(${shiftX}% - ${
      this.tooltipVal.offsetWidth / 2
    }px)`;
  }

  positionVertical(shiftX: string | number): void {
    this.tooltipVal.style.top = `calc(${shiftX}% - ${
      this.tooltipVal.offsetHeight / 2
    }px)`;
    this.tooltipVal.style.left = `${-(+this.tooltipVal.offsetWidth + 15)}px`;
  }

  setRotate(orientation: rotate): void {
    this.orientation = orientation;
  }

  rectLeft(): number {
    const clientRect = this.tooltipVal.getBoundingClientRect();
    if (this.orientation === rotation.HORIZONTAL) {
      return clientRect.left;
    }
    return clientRect.top;
  }

  rectRight(): number {
    const clientRect = this.tooltipVal.getBoundingClientRect();
    if (this.orientation === rotation.HORIZONTAL) {
      return clientRect.right;
    }
    return clientRect.bottom;
  }
}
export { Tooltip };
