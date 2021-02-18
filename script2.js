//РЕШЕНИЕ С PROXY

// Создать аналог Observable или Subscriber.
// Смысл заключается в том что-бы отслеживать изменения
// свойств объекта. Пример

// Таким образом когда будут происходить изменения
// с объектом state функция передання в subscribe будет
//  вызываться получая обновленный объект state.

class StateObservable {
  constructor(data) {
    this.subscribers = [];
    this.total = data;
  }
  subscribe(fn) {
    if (fn && !this.subscribers.includes(fn)) {
      this.subscribers.push(fn);
    }
  }
  getCount() {
     this.subscribers.forEach((sub) => sub(this.count));
  }
}

let state = new StateObservable({ count: 0 });



state = new Proxy(state, {
  get(obj, key) {
    return obj[key]; 
  },
  set(obj, key, newVal) {
    obj[key] = newVal; 
    obj.getCount()
    return true;
  }
});


state.subscribe(function (data) {
  console.log('функция 1', data); // { count: some value }
});

state.subscribe(function (data) {
  console.log( `функция 2 ${data} * 2 =`, data * 2); // { count: some value }
});

state.count = 2;

state.count = 355;
