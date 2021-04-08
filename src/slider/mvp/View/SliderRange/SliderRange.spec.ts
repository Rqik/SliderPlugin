import { SliderRange } from './SliderRange';
import {rotation,slider as className} from '../../../utils/constatnts';

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
