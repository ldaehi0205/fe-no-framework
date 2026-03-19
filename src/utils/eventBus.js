class Eventbus {
  constructor() {
    this.eventListener = {};
  }

  add(event, cb) {
    this.eventListener[event] = cb;
  }

  remove(event) {
    delete this.eventListener[event];
  }

  emit(event, params) {
    if (!this.eventListener[event]) return;
    this.eventListener[event](params);
  }
}

const eventBus = new Eventbus();

export default eventBus;
