import { Rotate } from '../../../types/interfaces';
import { rotation, tooltipValue as className } from '../../../types/constants';

class Tooltip {
  element: HTMLElement = document.createElement('div');

  constructor(private orientation: Rotate) {
    this.init();
  }

  text(text: string | number): void {
    this.element.textContent = `${text}`;
  }

  position(position: number): void {
    if (this.orientation === rotation.HORIZONTAL) {
      this.positionHorizontal(position);
    } else if (this.orientation === rotation.VERTICAL) {
      this.positionVertical(position);
    }
  }

  positionHorizontal(shiftX: string | number): void {
    this.element.style.top = `-${this.element.offsetHeight + 10}px`;
    this.element.style.left = `calc(${shiftX}% - ${
      this.element.offsetWidth / 2
    }px)`;
  }

  positionVertical(shiftX: string | number): void {
    this.element.style.top = `calc(${shiftX}% -
    ${this.element.offsetHeight / 2}px)`;
    this.element.style.left = `-${this.element.offsetWidth + 15}px`;
  }

  setRotate(orientation: Rotate): void {
    this.orientation = orientation;
  }

  rectLeft(): number {
    const clientRect = this.element.getBoundingClientRect();
    if (this.orientation === rotation.HORIZONTAL) {
      return clientRect.left;
    }

    return clientRect.top;
  }

  rectRight(): number {
    const clientRect = this.element.getBoundingClientRect();
    if (this.orientation === rotation.HORIZONTAL) {
      return clientRect.right;
    }
    return clientRect.bottom;
  }

  private init(): void {
    this.element.className = className.TOOLTIP;
  }
}

export { Tooltip };
