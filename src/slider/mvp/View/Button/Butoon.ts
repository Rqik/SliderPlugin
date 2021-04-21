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
    this.button.addEventListener(type, this.makeEvent(action));
  }

  makeEvent(action: Function) {
    return (event: Event) => {
      action(event as MouseEvent);
    }
  }

  width(): number {
    this.widthButton = this.button.offsetWidth / 2;
    return this.widthButton;
  }
}

export {Button};
