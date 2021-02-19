// Теперь в нашем классе появится возможность передавать множество подписчиков.
// Вызов метода .destroy() удаляет всех подписчиков
// Вызов метода .unSubscribe(handler1) удаляет определенныю функцию

class StateMultipleObservable {
  constructor(obj) {
    this.func = [];
    this.obj = obj;
  }
  subscribe() {
    this.func = [...arguments];
  }
  getCount(aValue) {
    this.func.map((fn) => {
      fn(aValue);
    });
  }
  destroy() {
    this.func = [];
  }
  unSubscribe(fn) {
    let index = this.func.indexOf(fn, 0);
    this.func.splice(index, 1);
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

state.count = 2;

state.unSubscribe(handler2, 1);
//   state.destroy()

let keyObj = Object.keys(state.obj);

keyObj.forEach(function (item) {
  let internalValue = state[item];
  Object.defineProperty(state, item, {
    get: function () {
      return internalValue;
    },
    set: function (aValue) {
      state.getCount(aValue);
      internalValue = aValue;
    },
  });
});

state.count = 2;

state.foo = 355;

state.ctx = 68;
