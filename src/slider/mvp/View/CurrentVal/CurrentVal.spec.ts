import {CurrentValue} from './CurrentVal';
import {rotation} from '../../../utils/constatnts';

describe('Current Val tool tip test', () => {
    let curVal: CurrentValue;

    beforeEach(() => {
      curVal = new CurrentValue(rotation.HORIZONTAL)
    })

    test('text content', () => {
      curVal.text('100')

      expect(curVal.currentVal.textContent).toEqual('100')
      expect(curVal.currentVal.textContent).not.toEqual(100)
    })

    test('position rotation', () => {
      curVal.positionHorizontal = jest.fn()
      curVal.positionVertical = jest.fn()
      curVal.position(10)

      expect(curVal.positionHorizontal).toHaveBeenCalled()
      expect(curVal.positionHorizontal).toHaveBeenCalledTimes(1)
      expect(curVal.positionVertical).not.toHaveBeenCalled()

      curVal.setRotate(rotation.VERTICAL)
      curVal.position(10)

      expect(curVal.positionVertical).toHaveBeenCalledTimes(1)
      expect(curVal.positionVertical).toHaveBeenCalled()
    });
    test('rect left right', () => {

      // @ts-ignore
      window.HTMLElement.prototype.getBoundingClientRect = function () {
        return {
          left: 77,
          bottom: 88,
          top: 11,
          right: 33,
          x: 851.671875,
          y: 200.046875,
          width: 8.34375,
          height: 17,
        }
      }
      let res = curVal.rectLeft()
      expect(res).toEqual(77)
      res = curVal.rectRight()
      expect(res).toEqual(33)

      curVal.setRotate(rotation.VERTICAL)

      res = curVal.rectLeft()
      expect(res).toEqual(11)
      res = curVal.rectRight()
      expect(res).toEqual(88)

    })
  }
)
