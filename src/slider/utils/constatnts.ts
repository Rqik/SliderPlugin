enum rotation {
  HORIZONTAL = 'horizontal',
  VERTICAL = 'vertical',
}

enum interval {
  INTERVAL = 'interval-point',
  INTERVAL_VERTICAL = 'interval-point_vertical',
  INTERVAL_ITEM = 'interval-point__item',
  INTERVAL_ITEM_TEXT = 'interval-point__item-text',
}

enum currentValue {
  CURRENT = 'slider-range__current-value',
}

enum button {
  BUTTON = 'slider-range__button',
}

enum slider {
  SLIDER = 'slider-range',
  SLIDER_VERTICAL = 'slider-range_vertical',
  SLIDER_ACTIVE_ZONE = 'slider-range__active-zone',
}

export { interval, currentValue, button, slider, rotation };
