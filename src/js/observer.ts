import { StateEl } from './interface';

class EventObsever {
  observers: string[];

  constructor() {
    this.observers = [];
  }

  subscribe(fn: any): void {
    this.observers.push(fn);
  }

  broadcast(data: StateEl): void {
    this.observers.forEach((subscriber: any) => {
      if (typeof subscriber === 'function') {
        subscriber(data);
      }
    });
  }

  unsubscribe(fn: any): void {
    this.observers = this.observers.filter((subscriber) => subscriber !== fn);
  }
}

export { EventObsever };
