const enum keyChanges {
  SHIFT_XL = 'shiftXl',
  SHIFT_XR = 'shiftXr',
  POSITION = 'position',
  COORDINATES = 'coordinates',
  ACTIVE = 'active',
  WIDTH = 'widthSlider',
  HEIGHT = 'heightSlider',
}

const enum rotation {
  HORIZONTAL = 'horizontal',
  VERTICAL = 'vertical',
}

const enum interval {
  INTERVAL = 'interval-point',
  INTERVAL_VERTICAL = 'interval-point_vertical',
  INTERVAL_ITEM = 'interval-point__item',
  INTERVAL_ITEM_TEXT = 'interval-point__item-text',
}

const enum currentValue {
  CURRENT = 'slider-range__current-value',
}

const enum button {
  BUTTON = 'slider-range__button',
}

const enum slider {
  SLIDER = 'slider-range',
  SLIDER_VERTICAL = 'slider-range_vertical',
  SLIDER_ACTIVE_ZONE = 'slider-range__active-zone',
}

export { keyChanges, interval, currentValue, button, slider, rotation };
