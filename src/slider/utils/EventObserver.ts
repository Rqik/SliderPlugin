import { CallBack } from '../types/interfaces';

class EventObserver {
  observers: CallBack[];

  constructor() {
    this.observers = [];
  }

  subscribe(fn: CallBack): void {
    if (!this.observers.some((el) => el === fn)) {
      this.observers.push(fn);
    }
  }

  unsubscribe(fn: CallBack): void {
    this.observers = this.observers.filter((subscriber) => subscriber !== fn);
  }

  broadcast(data: unknown): void {
    this.observers.forEach((subscriber) => {
      if (typeof subscriber === 'function') {
        subscriber(data);
      }
    });
  }
}

export { EventObserver };
