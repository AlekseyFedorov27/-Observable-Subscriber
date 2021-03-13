//РЕШЕНИЕ С PROXY

class StateMultipleObservable {
  constructor(obj) {
    this.subscribers = [];
    this.initeState = { ...obj };
    return this.init();
  }
  init() {
    Object.entries(this.initeState).forEach(([key, value]) => {
      this[key] = value;
    });
    return new Proxy(this, {
      get(obj, key) {
        return obj[key];
      },
      set(obj, key, newVal) {
        if (key !== "subscribers") {
          obj.emitChange(newVal);
        }
        obj[key] = newVal;
        return true;
      },
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
  emitChange(value) {
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

state.unSubscribe(handler2);

state.count = 2;

state.foo = 355;

state.ctx = 68;
