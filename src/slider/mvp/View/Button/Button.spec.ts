import {Button} from './Button'

describe('Button test', () => {
  let button: Button;
  beforeEach(() => {
    button = new Button()
  })
  test('button width', () => {
    Object.defineProperties(button.button, {
      offsetWidth: {
        get: function () {
          return 100;
        }
      }
    });

    let res = button.width()
    expect(res).toEqual(50)
  })

  test('addEvent method', () => {
    const fn = jest.fn()
    button.addEvent('click', fn)

    new MouseEvent('mousedown', {
      bubbles: true,
    });

    button.button.click()
    expect(fn).toHaveBeenCalled()
  })


})
