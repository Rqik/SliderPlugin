import { rotate } from "./../interface";

export class Button {
  button: HTMLElement = document.createElement("div");
  widthButton: number = 110
  constructor() {
    this.init();
    this.width()
  }
  init() {
    this.button.className = "slider__range_button";
  }
 
  addEvent(type: string, action: Function) {
    this.button.addEventListener(type, function test(e) {
      action(e)
    })
  }
  width() {
    return this.widthButton = this.button.offsetWidth / 2;
  }
  positionHorizontal(pos: string| number , heightSlider: string| number) {
    this.button.style.left = `calc(${pos}% - ${this.widthButton}px)`;
    this.button.style.top = -heightSlider + "px";
  }
}

export class CurrentValue {
  currentVal: HTMLElement = document.createElement("div");
  constructor() {
    this.init();
  }
  init() {
    this.currentVal.className = "slider__current_value";
  }

  text(text: string | number) {
    this.currentVal.textContent = `${text}`;
  }

  positionHorizont(shiftX: string | number) {
    this.currentVal.style.left = `calc(${shiftX}% - ${
      this.currentVal.offsetWidth / 2
    }px)`;
  }
  positionVertical(shiftX: string | number) {
    this.currentVal.style.top = `calc(${shiftX}% - ${
      this.currentVal.offsetHeight / 2
    }px)`;
    this.currentVal.style.left =
      -(+this.currentVal.offsetWidth + 15) + "px";
  }

}


export class Interval {
  interval: HTMLUListElement = document.createElement("ul");
  rotate: rotate = "horizontal";

  constructor() {
    this.init();
  }
  init() {
    this.interval.className = "interval_point";

    if (this.rotate == "vertical") {
      this.interval.classList.add("interval_point_vertical");
    }
  }
  valueInterval(
    minValue: number,
    maxValue: number,
    count: number,
    round: number
  ): HTMLElement {
    //interval это кол подписей минимум 2
    this.interval.textContent = "";
    if (count <= 0) {
      return this.interval;
    }
    let interval: number = (maxValue - minValue) / count;
    let sum;
    for (let i = 0; i <= count; i++) {
      let li = document.createElement("li");
      li.className = "interval_point-item";
      sum = Math.round((i * interval + minValue) * 10 ** round) / 10 ** round;
      li.innerHTML = `<span>${sum} </span>`;
      this.interval.append(li);
    }

    return this.interval;
  }
  edit(rotate: rotate) {
    if (rotate === "vertical") {
      this.rotate = rotate;
      this.interval.classList.add("interval_point_vertical");
    } else if (rotate === "horizontal") {
      this.rotate = rotate;
      this.interval.classList.remove("interval_point_vertical");
    }
  }
}

export class SliderRange {
  sliderRange: HTMLElement = document.createElement("div");
  sliderActiveZone: HTMLElement = document.createElement("div");
  rotate: rotate = "horizontal";
  constructor(rotate: rotate) {
    this.init(rotate);
  }

  init(rotate: rotate): HTMLElement {
    this.sliderRange.className = "slider__range";
    this.sliderActiveZone.className = "slider__range_active";
    if (rotate === "vertical") {
      this.sliderRange.classList.add("slider__range_vertical");
    }
    this.sliderRange.appendChild(this.sliderActiveZone);
    return this.sliderRange;
  }

  edit(rotate: rotate) {
    if (rotate === "vertical") {
      this.rotate = rotate;
      this.sliderRange.classList.add("slider__range_vertical");
    } else if (rotate === "horizontal") {
      this.rotate = rotate;
      this.sliderRange.classList.remove("slider__range_vertical");
    }
  }
  activeZone(left: number, rigth: number) {
    if (this.rotate == "horizontal") {
      this.sliderActiveZone.style.left = left + "%";
      this.sliderActiveZone.style.width = rigth - left + "%";
    } else {
      this.sliderActiveZone.style.top = left + "%";
      this.sliderActiveZone.style.height = rigth - left + "%";
    }
  }
}
