export class Stream {
  constructor(initialValue) {
    this._initialValue = initialValue;
    this._subscribers = [];
  }

  get value() {
    return this._initialValue;
  }

  set value(newValue) {
    this._initialValue = newValue;
    this._subscribers.forEach(({ cb }) => cb(this.value));
  }

  connect(component, cb) {
    this._subscribers.push({ component, cb });
    this.value = this._initialValue;

  }

  disconnect(componentToUnsubscribe) {
    this._subscribers = this._subscribers.filter(
      ({ component }) => component === componentToUnsubscribe
    );
  }
}
