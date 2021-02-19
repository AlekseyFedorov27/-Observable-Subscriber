//РЕШЕНИЕ С PROXY

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

let state = new StateMultipleObservable({ count: 0, foo: 0, ctx: 0 });

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

state = new Proxy(state, {
  get(obj, key) {
    return obj[key];
  },
  set(obj, key, newVal) {
    obj.getCount(newVal);
    obj[key] = 2222;
    return true;
  },
});

state.count = 2;

state.foo = 355;

state.ctx = 68;
