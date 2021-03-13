// Теперь в нашем классе появится возможность передавать множество подписчиков.
// Вызов метода .destroy() удаляет всех подписчиков
// Вызов метода .unSubscribe(handler1) удаляет определенныю функцию

class StateMultipleObservable {
  constructor(obj) {
    this.subscribers = [];
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
          // console.log(val);
          self.emitChange([key, val]);
          value = val;
        },
      });
    });
  }
  subscribe(fn) {
    if (typeof fn !== "function") {
      new Error(`${fn} is not a function`);
    } else {
      let arr = [...arguments];
      arr.forEach((item) => {
        this.subscribers.push(item);
      });
    }
  }
  emitChange([key, value]) {
    this.subscribers.forEach((fn) => {
      fn(value);
    });
  }
  destroy() {
    this.subscribers = [];
  }
  unSubscribe(fn) {
    if (typeof fn !== "function") {
      new Error(`${fn} is not a function`);
    } else {
    this.subscribers = this.subscribers.filter((item) => item !== fn);
    }
  }
}

const state = new StateMultipleObservable({ count: 0, foo: 0, ctx: 0 });

const handler1 = function (data) {
  console.log("функция 1:", data); // { count: some value }
};

const handler2 = function (data) {
  console.log(`функция 2: ${data} * 2 = `, data * 2); // { count: some value }
};

const handler3 = function (data) {
  console.log(`функция 3: ${data} * 3 = `, data * 3); // { count: some value }
};

state.subscribe(handler1, handler2, handler3);

state.unSubscribe(handler2);
//   state.destroy()

state.count = 2;

state.foo = 355;

state.ctx = 68;
