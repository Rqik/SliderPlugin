import {button as className} from '../../../utils/constatnts';

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
    function eventA(event: Event) {
      action(event as MouseEvent);
    }

    this.button.addEventListener(type, eventA);
  }

  width(): number {
    this.widthButton = this.button.offsetWidth / 2;
    return this.widthButton;
  }
}

export { Button };
