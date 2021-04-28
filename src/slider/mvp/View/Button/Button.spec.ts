import {Button} from './Butoon'

describe('Button test', () => {
  let button: Button;
  beforeEach(() => {
    button = new Button()
  })
  test('button width', () => {
    Object.defineProperties(button.button, {
      offsetWidth: {
        get: function() { return 100; }
      }
    });

    let res = button.width()
    expect(res).toEqual(50)
  })
})
