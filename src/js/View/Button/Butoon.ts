class Button {
  button: HTMLElement = document.createElement('div');

  widthButton = 10;

  constructor() {
    this.init();
  }

  init(): void {
    this.button.className = 'slider__range_button';
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
