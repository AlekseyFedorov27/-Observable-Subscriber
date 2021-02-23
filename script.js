// Создать аналог Observable или Subscriber.
// Смысл заключается в том что-бы отслеживать изменения
// свойств объекта. Пример

// Таким образом когда будут происходить изменения
// с объектом state функция передання в subscribe будет
//  вызываться получая обновленный объект state.

class StateObservable {
  constructor(obj) {
    this.subscriber = null;
    this.initeState = { ...obj };
    this.init();
  }
  init() {
    const self = this;
    Object.entries(this.initeState).forEach(([key, value]) => {
      Object.defineProperty(self, key, {
        get: function () {
          return value;
        },
        set: function (val) {
          self.emitChange(val);
          value = val;
        },
      });
    });
  }
  subscribe(fn) {
    this.subscriber = fn;
  }
  emitChange(value) {
    this.subscriber(value);
  }
}

const state = new StateObservable({ count: 0, foo: 0, ctx: 0 });

state.subscribe(function (data) {
  console.log("функция 1:", data);
});
//Реактивные свойства
state.count = 2;

state.foo = 355;

state.ctx = 68;
