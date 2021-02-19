// Создать аналог Observable или Subscriber.
// Смысл заключается в том что-бы отслеживать изменения
// свойств объекта. Пример

// Таким образом когда будут происходить изменения
// с объектом state функция передання в subscribe будет
//  вызываться получая обновленный объект state.

class StateObservable {
  constructor(obj) {
    this.func = null;
    this.obj = obj;
  }
  subscribe(fn) {
    this.func = fn;
  }
  getCount( aValue) {
    this.func(aValue);
  }
}

const state = new StateObservable({ count: 0, foo: 0, ctx: 0 });


state.subscribe(function (data) {
  console.log("функция 1:", data); // { count: some value }
});



let keyObj = Object.keys(state.obj)

keyObj.forEach(function(item) {
  let internalValue = state[item]
    Object.defineProperty(state, item, {
        get: function() { 
          return internalValue
        },
        set: function(aValue) {
          state.getCount(aValue);
          internalValue = aValue
        }
    });
  
});


state.count = 2;

state.foo = 355;

state.ctx = 68;

