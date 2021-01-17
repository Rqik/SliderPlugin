export class Test {
  info = 'Это крутой класс на JS'

  get text() {
    return this.info;
  }
  set text(name) {
    this.info = name
  }
}

let s = new Test()
s.text = 'asdsd'