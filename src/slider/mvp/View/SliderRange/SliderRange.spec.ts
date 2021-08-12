import { rotation, slider as className } from '../../../types/constants';
import  SliderRange  from './SliderRange';

describe('SliderRange test', () => {
  let slider: SliderRange;
  beforeEach(() => {
    slider = new SliderRange(rotation.VERTICAL);
  });

  test('remove class in slider ', () => {
    slider.edit(rotation.VERTICAL);
    expect(slider.sliderRange.className).toEqual(
      `${className.SLIDER} ${className.SLIDER_VERTICAL}`,
    );

    slider.edit(rotation.HORIZONTAL);
    expect(slider.sliderRange.className).toEqual(`${className.SLIDER}`);
  });
});
