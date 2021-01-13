export class Test {
  static text = 'Это крутой класс на JS'

    get log() {
    return this.text;
  }

}

let s = new Test()
s.log

console.log(s.log());

