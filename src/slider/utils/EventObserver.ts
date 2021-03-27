import {callBack, StateEl} from './Interface';

class EventObserver {
  observers: callBack[];

  constructor() {
    this.observers = [];
  }

  subscribe(fn: callBack): void {
    this.observers.push(fn);
  }

  broadcast(data: StateEl | object): void {
    this.observers.forEach((subscriber) => {
      if (typeof subscriber === 'function') {
        subscriber(data);
      }
    });
  }

  unsubscribe(fn: callBack): void {
    this.observers = this.observers.filter((subscriber) => subscriber !== fn);
  }
}

export {EventObserver};
