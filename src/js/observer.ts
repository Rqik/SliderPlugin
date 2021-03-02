export default class EventObsever {
  observers: string[];

  constructor() {
    this.observers = [];
  }

  subscribe(fn: any): any {
    this.observers.push(fn);
  }

  broadcast(data: string | number | {} | Function): any {
    this.observers.forEach((subscriber: any) => {
      if (typeof subscriber === 'function') {
        subscriber(data);
      }
    });
  }

  unsubscribe(fn: any): any {
    this.observers = this.observers.filter((subscriber) => subscriber !== fn);
  }
}
