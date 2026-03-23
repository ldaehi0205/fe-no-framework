class Eventbus {
  constructor() {
    this.eventListener = {};
  }

  add(event, cb) {
    this.eventListener[event] = [
      ...(this.eventListener[event] ? this.eventListener[event] : []),
      cb,
    ];
  }

  remove(event, cb) {
    this.eventListener[event] = this.eventListener[event].filter(v => v !== cb);
  }

  emit(event, params) {
    if (this.eventListener[event] && this.eventListener[event]?.length === 0)
      return;
    this.eventListener[event].forEach(element => {
      element(params);
    });
  }
}

const eventBus = new Eventbus();

export default eventBus;
