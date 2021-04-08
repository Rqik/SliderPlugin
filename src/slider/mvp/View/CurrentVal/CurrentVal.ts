import { rotate } from '../../../utils/Interface';
import { rotation, currentValue as className } from '../../../utils/constatnts';

class CurrentValue {
  currentVal: HTMLElement = document.createElement('div');

  private size = 10;

  constructor(private orientation: rotate) {
    this.init();
  }

  private init(): void {
    this.currentVal.className = className.CURRENT;
  }

  text(text: string | number): void {
    this.currentVal.textContent = `${text}`;
  }

  position(position: number): void {
    if (this.orientation === rotation.HORIZONTAL) {
      this.positionHorizontal(position);
    } else if (this.orientation === rotation.VERTICAL) {
      this.positionVertical(position);
    }
  }

  positionHorizontal(shiftX: string | number): void {
    this.currentVal.style.top = `${-(+this.currentVal.offsetHeight + 10)}px`;
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

  setRotate(orientation: rotate): void {
    this.orientation = orientation;
  }

  rectLeft(): number {
    const clientRect = this.currentVal.getBoundingClientRect();
    if (this.orientation === rotation.HORIZONTAL) {
      return clientRect.left;
    }
    return clientRect.top;
  }

  rectRight(): number {
    const clientRect = this.currentVal.getBoundingClientRect();
    if (this.orientation === rotation.HORIZONTAL) {
      return clientRect.right;
    }
    return clientRect.bottom;
  }

  fixedSize(bool: boolean): void {
    if (!bool) {
      this.size = this.rectLeft();
    }
  }
}
export { CurrentValue };
