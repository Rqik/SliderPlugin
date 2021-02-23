function ker() { }
let s = 12
console.log(ker.prototype);
  let sw = ()=>{}
console.log( ker.prototype )
console.log(sw.__proto__  === ker.__proto__ ) // tru new Func
console.log(ker.__proto__.__proto__) // tru new Func
console.log(ker.prototype.__proto__.__proto__ === ker.__proto__.__proto__);
