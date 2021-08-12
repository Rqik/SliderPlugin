const enum keyChanges {
  SHIFT_LEFT = 'shiftLeft',
  SHIFT_RIGHT = 'shiftRight',
  POSITION = 'position',
  COORDINATES = 'coordinates',
  ACTIVE = 'isActiveLeft',
  INTERVAL = 'intervalAction',
  INTERVAL_STEP = 'intervalStep',
  WIDTH = 'widthSlider',
  HEIGHT = 'heightSlider',
}

const enum methodTypes {
  SUBSCRIBE = 'subscribe',
  UNSUBSCRIBE = 'unsubscribe',
  SETTINGS = 'settings',
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

const enum tooltipValue {
  TOOLTIP = 'slider-range__current-value',
}

const enum button {
  BUTTON = 'slider-range__button',
}

const enum slider {
  SLIDER = 'slider-range',
  SLIDER_VERTICAL = 'slider-range_vertical',
  SLIDER_ACTIVE_ZONE = 'slider-range__active-zone',
}

export {
  methodTypes, keyChanges, interval, tooltipValue, button, slider, rotation,
};
