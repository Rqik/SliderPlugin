import { button as className } from '../../../types/constatnts';

class Button {
  button: HTMLElement = document.createElement('div');

  private widthButton = 10;

  constructor() {
    this.init();
  }

  private init(): void {
    this.button.className = className.BUTTON;
  }

  addEvent(type: string, action: (e: MouseEvent) => void): void {
    this.button.addEventListener(type, Button.makeEvent(action));
  }

  private static makeEvent(action: (e: MouseEvent) => void) {
    return (event: Event) => {
      action(event as MouseEvent);
    };
  }

  width(): number {
    this.widthButton = this.button.offsetWidth / 2;
    return this.widthButton;
  }
}

export { Button };
