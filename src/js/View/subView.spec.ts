import { SliderRange, Interval } from "./subView";

describe("SliderRange test", () => {
  let slider: SliderRange;
  beforeEach(() => {
    slider = new SliderRange("vertical");
  });

  test("remove class in slider ", () => {
    slider.edit("vertical");
    expect(slider.sliderRange.className).toEqual(
      "slider__range slider__range_vertical"
    );

    slider.edit("horizontal");
    expect(slider.sliderRange.className).toEqual("slider__range");
  });
});

describe("Interval test", () => {
  let inter: Interval;
  beforeEach(() => {
    inter = new Interval();
  });
  test("valueInterval", () => {
    // inter.valueInterval= jest.fn();
    inter.valueInterval(10, 100, 0, 2);
    let s = document.createElement("ul");
    s.className = "interval_point";
    expect(inter.interval).toEqual(s);
  });
});
