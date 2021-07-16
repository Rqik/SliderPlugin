import { StateProps } from '../../types/interfaces';
import { keyChanges, rotation } from '../../types/constants';

const defaultState: StateProps = {
  selector: 'slider-rqik', // селектор
  min: 0, // минимальное значение
  max: 100, // максимальное значение
  range: 'one', // 1 или 2 указателя
  rotate: rotation.HORIZONTAL, // ориентация vertical || horizontal
  showTooltip: true, // показывать текущее значение над указателем
  showInterval: true, // показать интервал
  intervalCount: 2, // количество интервалов
  stepSize: 1, // шаг движения указателя в числах
  maxValue: 10, // установка значений в числах
  minValue: 0, // установка значений в числах
  [keyChanges.SHIFT_LEFT]: 0,
  [keyChanges.SHIFT_RIGHT]: 10,
  step: 0, // процентные значение от 0 до 100
  isActiveLeft: false,
  intervalStep: 50,
  widthSlider: 0,
  heightSlider: 0,
};

export { defaultState };
