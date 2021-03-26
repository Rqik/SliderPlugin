import { SliderRange } from './SliderRange';

describe('SliderRange test', () => {
  let slider: SliderRange;
  beforeEach(() => {
    slider = new SliderRange('vertical');
  });

  test('remove class in slider ', () => {
    slider.edit('vertical');
    expect(slider.sliderRange.className).toEqual(
      'slider__range slider__range_vertical',
    );

    slider.edit('horizontal');
    expect(slider.sliderRange.className).toEqual('slider__range');
  });
});
