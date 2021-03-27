import { rotate } from '../../../utils/Interface';

class CurrentValue {
  currentVal: HTMLElement = document.createElement('div');

  private size = 10;

  constructor(private rotation: rotate) {
    this.init();
  }

  private init(): void {
    this.currentVal.className = 'slider-range__current-value';
  }

  text(text: string | number): void {
    this.currentVal.textContent = `${text}`;
  }

   position(position: number): void {
    if (this.rotation === 'horizontal') {
      this.positionHorizontal(position);
    } else if (this.rotation === 'vertical') {
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

  setRotate(rotation: rotate): void {
    this.rotation = rotation;
  }

   rectLeft(): number {
    const clientRect = this.currentVal.getBoundingClientRect();
    if (this.rotation === 'horizontal') {
      return clientRect.left;
    }
      return clientRect.top;
  }

   rectRight(): number {
    const clientRect = this.currentVal.getBoundingClientRect();
    if (this.rotation === 'horizontal') {
      return clientRect.right;
    }
    return clientRect.bottom;
  }

  fixedSize(bool: boolean) {
    if (!bool) {
      this.size = this.rectLeft();
    }
  }
}
export { CurrentValue };