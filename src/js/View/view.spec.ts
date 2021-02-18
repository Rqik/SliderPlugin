import View from './view'
import EventObsever from '../observer'
import { IState } from '../interface';

let st: IState = {

  selector: 'slider_rqik', // селектор
  minValue: 0, // минимальное значение
  maxValue: 100, // максимальное значение
  range: 'two', // 1 или 2 указателя
  rotate: 'horizontal', // ориентация vertical horizontal
  show: false, // показыватьть текущее значение над указателем
  showInterval: true, // показать интервал
  intervalCount: 2, // количество интервалов
  stepSize: 1, // шаг движения указателя
  currentVal: [0, 10], // установка значений
  round: 1, // округление,
  pixelSize: '6',
  shiftXl: 0,
  shiftXr: 20,
  value1: function () {
    return ((this.maxValue - this.minValue) * this.shiftXl) / 100 + this.minValue
  },
  value2: function () {
    return ((this.maxValue - this.minValue) * this.shiftXr) / 100 + this.minValue
  },
  currentText1: function () {
    return Math.round(this.value1() * (10 ** this.round)) / (10 ** this.round)
  },
  currentText2: function () {
    return Math.round(this.value2() * (10 ** this.round)) / (10 ** this.round)
  }
}

jest.mock('../observer.ts')
const ObserverMock = EventObsever as jest.MockedClass<typeof EventObsever>

beforeEach(() => {
  // Clear all instances and calls to constructor and all methods:
  ObserverMock.mockClear();
});

describe('View test', () => {


  test('calls observer', () => {
    expect(EventObsever).not.toHaveBeenCalled()
    const view = new View(st)
    expect(ObserverMock).toHaveBeenCalled()
    expect(ObserverMock).toHaveBeenCalledTimes(1)
    expect(ObserverMock).not.toHaveBeenCalledTimes(2)
    
  })

  test('should be defined', () => {
    const view = new View(st)
    expect(view.intervalExpose).toBeDefined()
    expect(view.intervalExpose).not.toBeUndefined()

    expect(view.renderInterval).toBeDefined()
    expect(view.renderInterval).not.toBeUndefined()

  

    expect(view.addElem).toBeDefined()
    expect(view.addElem).not.toBeUndefined()
  })

  describe('function call intervalExpose | provided  true ', () => {
    // jest.mock('./view.ts')
    // const ViewMock = View as jest.MockedClass<typeof View>
    const view = new View(st)
    view.intervalExpose = jest.fn()
    view.addElem = jest.fn()
    view.addAction = jest.fn()
    view.initMove = jest.fn()
    view.resizeSLider = jest.fn()
    view.buttonLeftExpose = jest.fn()
   
    view.sliderInit()

    // view.intervalExpose()
    expect(view.intervalExpose).toHaveBeenCalled()
    expect(view.intervalExpose).toHaveBeenCalledTimes(1)

    expect(view.addElem).toHaveBeenCalled()
    expect(view.addElem).toHaveBeenCalledTimes(1)
    
    expect(view.intervalExpose).toHaveBeenCalled()
    expect(view.intervalExpose).toHaveBeenCalledTimes(1)

    expect(view.intervalExpose).toHaveBeenCalled()
    expect(view.intervalExpose).toHaveBeenCalledTimes(1)

  })
})
