/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 475:
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {


// EXTERNAL MODULE: ../node_modules/autobind-decorator/lib/esm/index.js
var esm = __webpack_require__(362);
;// CONCATENATED MODULE: ./demo/InputChecker/InputChecker.ts
/* provided dependency */ var $ = __webpack_require__(638);
var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};



class InputChecker {
  constructor({
    $form,
    $sliderDOM,
    classRotate
  }) {
    this.$form = $form;
    this.$slider = $sliderDOM;
    this.$inputRotate = this.$form.find("input[name='rotate']");
    this.$inputRange = this.$form.find("input[name='range']");
    this.$inputCurrentLeft = this.$form.find("input[name='minValue']");
    this.$inputCurrentRight = this.$form.find("input[name='maxValue']");
    this.classRotate = classRotate;
    this.inputNames = ['max', 'min', 'maxValue', 'minValue', 'round', 'intervalCount', 'stepSize'];
    this.inputCheck = [['rotate', ['vertical', 'horizontal']], ['showInterval', [true, false]], ['showTooltip', [true, false]], ['range', ['two', 'one']]];
  }

  init() {
    this.actionForm();
    this.addEventSlider();
  }

  addEventSlider() {
    this.$slider.sliderRqik('subscribe', this.onChange);
    this.$inputRotate.on('click', this.addClassForm);
    this.$inputRange.on('change', this.disabledInputCurrentLeft);
  }

  disabledInputCurrentLeft() {
    if (this.$inputRange.prop('checked')) {
      this.$inputCurrentLeft.prop('disabled', false);
    } else {
      this.$inputCurrentLeft.prop('disabled', true);
    }
  }

  addClassForm() {
    if (this.$inputRotate.is(':checked')) {
      this.$slider.addClass(this.classRotate);
    } else {
      this.$slider.removeClass(this.classRotate);
    }
  }

  onChange(data) {
    if (data.minValue) {
      this.$inputCurrentLeft.val(Number(data.minValue));
    }

    if (data.maxValue) {
      this.$inputCurrentRight.val(Number(data.maxValue));
    }
  }

  makeEventCheck({
    nameAtr,
    active,
    disable
  }) {
    return event => {
      if ($(event.currentTarget).prop('checked')) {
        this.$slider.sliderRqik({
          [nameAtr]: active
        });
      } else {
        this.$slider.sliderRqik({
          [nameAtr]: disable
        });
      }
    };
  }

  runChange(nameAtr) {
    const $input = this.$form.find(`input[name='${nameAtr}']`);
    const value = $input.val() || 0;
    $input.on('change', this.makeEventInputChange(nameAtr));
    const isValidVal = value !== '-' || value !== undefined;

    if (isValidVal) {
      this.$slider.sliderRqik({
        [nameAtr]: +value
      });
    }
  }

  makeEventInputChange(nameAtr) {
    const $input = this.$form.find(`input[name='${nameAtr}']`);
    let value = $input.val() || 0;
    const {
      $slider
    } = this;
    return () => {
      value = $input.val() || 0;

      if (value === '-') {
        return;
      }

      $slider.sliderRqik({
        [nameAtr]: Number(value)
      });
      const isCurrentInput = nameAtr === 'stepSize';

      if (isCurrentInput) {
        this.$inputCurrentLeft.attr('step', Number(value));
        this.$inputCurrentRight.attr('step', Number(value));
      }

      const s = $slider.sliderRqik('settings')[nameAtr];
      $input.attr('value', Number(s));
      $input.val(Number(s));
    };
  }

  runCheckChange(nameAtr, value) {
    const [active, disable] = value;
    const item = this.$form.find(`input[name='${nameAtr}']`);
    item.on('click', this.makeEventCheck({
      nameAtr,
      active,
      disable
    }));

    if (item.prop('checked')) {
      this.$slider.sliderRqik({
        [nameAtr]: active
      });
    } else {
      this.$slider.sliderRqik({
        [nameAtr]: disable
      });
    }
  }

  actionForm() {
    this.inputNames.forEach(el => this.runChange(el));
    this.inputCheck.forEach(el => this.runCheckChange(...el));
  }

}

__decorate([esm/* boundMethod */.MR], InputChecker.prototype, "disabledInputCurrentLeft", null);

__decorate([esm/* boundMethod */.MR], InputChecker.prototype, "addClassForm", null);

__decorate([esm/* boundMethod */.MR], InputChecker.prototype, "onChange", null);

__decorate([esm/* boundMethod */.MR], InputChecker.prototype, "runChange", null);

__decorate([esm/* boundMethod */.MR], InputChecker.prototype, "makeEventInputChange", null);

__decorate([esm/* boundMethod */.MR], InputChecker.prototype, "runCheckChange", null);


;// CONCATENATED MODULE: ./demo/page/page.ts
/* provided dependency */ var page_$ = __webpack_require__(638);




__webpack_require__(544);

const $plug1 = page_$('.js-plug1').sliderRqik();
const $plug2 = page_$('.js-plug2').sliderRqik();
const $plug3 = page_$('.js-plug3').sliderRqik();
const $plug4 = page_$('.js-plug4').sliderRqik();
const $form1 = page_$('#form1');
const $form2 = page_$('#form2');
const $form3 = page_$('#form3');
const $form4 = page_$('#form4');
new InputChecker({
  $form: $form1,
  $sliderDOM: $plug1,
  classRotate: 'slider_vertical'
}).init();
new InputChecker({
  $form: $form2,
  $sliderDOM: $plug2,
  classRotate: 'slider_vertical'
}).init();
new InputChecker({
  $form: $form3,
  $sliderDOM: $plug3,
  classRotate: 'slider_vertical'
}).init();
new InputChecker({
  $form: $form4,
  $sliderDOM: $plug4,
  classRotate: 'slider_vertical'
}).init();

/***/ }),

/***/ 544:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ../node_modules/autobind-decorator/lib/esm/index.js
var esm = __webpack_require__(362);
;// CONCATENATED MODULE: ./slider/utils/EventObserver.ts
class EventObserver {
  constructor() {
    this.observers = [];
  }

  subscribe(fn) {
    if (!this.observers.some(el => el === fn)) {
      this.observers.push(fn);
    }
  }

  unsubscribe(fn) {
    this.observers = this.observers.filter(subscriber => subscriber !== fn);
  }

  broadcast(data) {
    this.observers.forEach(subscriber => {
      if (typeof subscriber === 'function') {
        subscriber(data);
      }
    });
  }

}


;// CONCATENATED MODULE: ./slider/mvp/Model/default-state.ts
const defaultState = {
  selector: 'slider-rqik',
  min: 0,
  max: 100,
  range: 'one',
  rotate: "horizontal",
  showTooltip: true,
  showInterval: true,
  intervalCount: 2,
  stepSize: 1,
  maxValue: 10,
  minValue: 0,
  ["shiftLeft"]: 0,
  ["shiftRight"]: 10,
  step: 0,
  isActiveLeft: false,
  intervalStep: 50,
  widthSlider: 0,
  heightSlider: 0
};

;// CONCATENATED MODULE: ./slider/mvp/Model/Model.ts



class Model {
  constructor(selector = 'slider-rqik') {
    this.coords = {
      x: 0,
      y: 0,
      height: 0,
      width: 0
    };
    this.state = defaultState;
    this.stateKey = ['selector', 'min', 'max', 'range', 'rotate', 'showTooltip', 'showInterval', 'stepSize', 'maxValue', 'minValue', 'shiftLeft', 'shiftRight', 'step', 'isActiveLeft', 'intervalStep', 'widthSlider', 'heightSlider'];
    this.percent = 0;
    this.state.selector = selector;
    this.observer = new EventObserver();
  }

  get getState() {
    return Object.assign({}, this.state);
  }

  setState(data) {
    const stateOld = this.getState;

    switch (Object.keys(data)[0]) {
      case "isActiveLeft":
        if ('isActiveLeft' in data) {
          this.activeButton(data["isActiveLeft"]);
        }

        break;

      case "shiftLeft":
        this.setStateValid(data);
        this.defineLeftVal();
        break;

      case "shiftRight":
        this.setStateValid(data);
        this.defineRightVal();
        break;

      case "position":
        if ('position' in data) {
          this.defineStep(Number(data["position"]));
        }

        break;

      case "coordinates":
        if ('coordinates' in data) {
          this.updateCoordinate(data["coordinates"]);
        }

        break;

      case "intervalAction":
        if ('interval' in data) {
          this.state.step = Model.convertCorrectNumber(this.convertNumberInPercent(Number(data["intervalAction"])));
        }

        this.setStateValid(data);
        this.defineLeftVal();
        this.defineRightVal();
        break;

      default:
        this.setStateValid(data, true);
        break;
    }

    this.notify(stateOld, Object.keys(data)[0]);
  }

  setStateValid(state, validate = false) {
    const stateOld = this.getState;
    this.state = Object.assign(Object.assign({}, this.state), state);

    if (validate) {
      this.convertToValidNumber();
    }

    Object.keys(state).forEach(el => {
      this.notify(stateOld, el);
    });
  }

  notify(state, key) {
    const newProps = {};

    if (key === "position") {
      this.observer.broadcast({
        ["position"]: this.getState.step
      });
      return;
    }

    if (key === "coordinates") {
      this.observer.broadcast({
        ["coordinates"]: this.coords
      });
      return;
    }

    this.stateKey.forEach(element => {
      if (state[element] !== this.getState[element]) {
        newProps[element] = this.getState[element];
      }
    });

    if (Object.keys(newProps).length !== 0) {
      this.observer.broadcast(Object.assign({}, newProps));
    }
  }

  convertToValidNumber() {
    this.state.min = Model.convertCorrectNumber(this.state.min);
    this.state.max = Model.convertCorrectNumber(this.state.max);
    this.state.stepSize = Model.convertCorrectNumber(this.state.stepSize);
    this.state.stepSize = this.state.stepSize <= 0 ? 0 : this.state.stepSize;
    this.state.maxValue = Model.convertCorrectNumber(this.state.maxValue);
    this.state.minValue = Model.convertCorrectNumber(this.state.minValue);
    this.state.shiftLeft = this.validStep(this.convertNumberInPercent(this.state.minValue));
    this.state.shiftRight = this.validStep(this.convertNumberInPercent(this.state.maxValue));
    this.state.shiftRight = Number.isFinite(this.state.shiftRight) ? Model.transformRange(this.state.shiftRight) : 0;
    this.state.shiftLeft = Number.isFinite(this.state.shiftLeft) ? Model.transformRange(this.state.shiftLeft) : 0;
    this.state.intervalCount = this.state.intervalCount < 0 ? 0 : Model.convertCorrectNumber(this.state.intervalCount);
    this.state["intervalStep"] = this.defineIntervalStep();
  }

  updateCoordinate(coords) {
    this.coords = Object.assign(Object.assign({}, this.coords), coords);
  }

  defineStep(position) {
    const percent = this.mathPositionToPercent(position);
    this.state.step = this.validStep(percent);
  }

  validStep(percent) {
    if (percent >= 100 || percent <= 0) {
      return Model.transformRange(percent);
    }

    if (this.state.stepSize > 0) {
      return Model.transformRange(this.mathStepCount(percent));
    }

    return Model.transformRange(percent);
  }

  activeButton(position) {
    this.state.isActiveLeft = Math.abs(this.state["shiftLeft"] - this.state.step) <= Math.abs(this.state["shiftRight"] - this.state.step);

    if (this.state["shiftLeft"] === this.state["shiftRight"]) {
      this.state.isActiveLeft = this.mathPositionToPercent(position) < this.state.shiftRight;
      this.checkExtremePoint();
    }
  }

  checkExtremePoint() {
    const isRightEdge = this.state.step <= 0 && this.state.shiftRight <= 0;
    const isLeftEdge = this.state.step >= 100 && this.state.shiftLeft >= 100;

    if (isRightEdge) {
      this.state.isActiveLeft = false;
    }

    if (isLeftEdge) {
      this.state.isActiveLeft = true;
    }
  }

  mathPositionToPercent(position) {
    if (this.state.rotate === "horizontal") {
      return (position - this.coords.x) / this.coords.width * 100;
    }

    return (position - this.coords.y) / this.coords.height * 100;
  }

  mathStepCount(percent) {
    const difference = Math.abs(this.state.max - this.state.min);

    if (difference === 0) {
      return Math.round(percent / this.state.stepSize) * this.state.stepSize;
    }

    this.percent = this.state.stepSize / Math.abs(this.state.max - this.state.min) * 100;
    this.percent = Model.transformRange(this.percent);
    return Math.round(percent / this.percent) * this.percent;
  }

  static roundNumber(value) {
    return Math.round(value * Math.pow(10, 8)) / Math.pow(10, 8);
  }

  convertNumberInPercent(value) {
    return (value - this.state.min) / (this.state.max - this.state.min) * 100;
  }

  defineLeftVal() {
    this.state.minValue = Model.roundNumber((this.state.max - this.state.min) * this.state.shiftLeft / 100 + this.state.min);
  }

  defineRightVal() {
    this.state.maxValue = Model.roundNumber((this.state.max - this.state.min) * this.state.shiftRight / 100 + this.state.min);
  }

  defineIntervalStep() {
    let step = (this.state.max - this.state.min) / this.state.intervalCount;

    if (Math.abs(step) < this.state.stepSize) {
      return Math.sign(step) * this.state.stepSize;
    }

    if (this.state.stepSize) {
      step = Math.round(step / this.state.stepSize) * this.state.stepSize;
      step = Math.round(step * Math.pow(10, 8)) / Math.pow(10, 8);
    }

    return step;
  }

  static convertCorrectNumber(num) {
    const result = Number(num);

    if (Number.isNaN(result)) {
      return 0;
    }

    if (!Number.isFinite(result)) {
      return 0;
    }

    return result;
  }

  static transformRange(num) {
    if (num <= 0) {
      return 0;
    }

    if (num >= 100) {
      return 100;
    }

    return num;
  }

}


;// CONCATENATED MODULE: ./slider/mvp/View/Button/Button.ts
class Button {
  constructor() {
    this.button = document.createElement('div');
    this.widthButton = 10;
    this.init();
  }

  addEvent(type, action) {
    this.button.addEventListener(type, Button.makeEvent(action));
  }

  width() {
    this.widthButton = this.button.offsetWidth / 2;
    return this.widthButton;
  }

  init() {
    this.button.className = "slider-range__button";
  }

  static makeEvent(action) {
    return event => {
      action(event);
    };
  }

}


;// CONCATENATED MODULE: ./slider/mvp/View/Tooltip/Tooltip.ts
class Tooltip {
  constructor(orientation) {
    this.orientation = orientation;
    this.element = document.createElement('div');
    this.init();
  }

  text(text) {
    this.element.textContent = `${text}`;
  }

  position(position) {
    if (this.orientation === "horizontal") {
      this.positionHorizontal(position);
    } else if (this.orientation === "vertical") {
      this.positionVertical(position);
    }
  }

  positionHorizontal(shiftX) {
    this.element.style.top = `-${this.element.getBoundingClientRect().height + 10}px`;
    this.element.style.left = `calc(${shiftX}% - ${this.element.offsetWidth / 2}px)`;
  }

  positionVertical(shiftX) {
    this.element.style.top = `calc(${shiftX}% -
    ${this.element.offsetHeight / 2}px)`;
    this.element.style.left = `-${this.element.getBoundingClientRect().width + 15}px`;
  }

  setRotate(orientation) {
    this.orientation = orientation;
  }

  rectLeft() {
    const clientRect = this.element.getBoundingClientRect();

    if (this.orientation === "horizontal") {
      return clientRect.left;
    }

    return clientRect.top;
  }

  rectRight() {
    const clientRect = this.element.getBoundingClientRect();

    if (this.orientation === "horizontal") {
      return clientRect.right;
    }

    return clientRect.bottom;
  }

  init() {
    this.element.className = "slider-range__current-value";
  }

}


;// CONCATENATED MODULE: ./slider/mvp/View/SliderRange/SliderRange.ts
class SliderRange {
  constructor(rot) {
    this.sliderRange = document.createElement('div');
    this.sliderActiveZone = document.createElement('div');
    this.rotate = "horizontal";
    this.init(rot);
  }

  edit(rot) {
    this.rotate = rot;

    if (rot === "vertical") {
      this.sliderRange.classList.add("slider-range_vertical");
    } else {
      this.sliderRange.classList.remove("slider-range_vertical");
    }
  }

  activeZone(left, right) {
    if (this.rotate === "horizontal") {
      this.sliderActiveZone.style.left = `${left}%`;
      this.sliderActiveZone.style.width = `${right - left}%`;
    } else {
      this.sliderActiveZone.style.top = `${left}%`;
      this.sliderActiveZone.style.height = `${right - left}%`;
    }
  }

  init(rot) {
    this.sliderRange.className = "slider-range";
    this.sliderActiveZone.className = "slider-range__active-zone";
    this.edit(rot);
    this.sliderRange.appendChild(this.sliderActiveZone);
  }

}


;// CONCATENATED MODULE: ./slider/mvp/View/Interval/Interval.ts
class Interval {
  constructor() {
    this.interval = document.createElement('ul');
    this.items = [];
    this.rotate = "horizontal";
    this.init();
  }

  renderIntervals({
    min,
    max,
    count,
    intervalStep
  }) {
    this.interval.textContent = '';
    let maxVal = max;
    let minVal = min;

    if (min > max) {
      [maxVal, minVal] = [minVal, maxVal];
    }

    if (count <= 0) {
      return this.interval;
    }

    const rangeSize = Math.abs(max - min);
    let step;
    const fragment = document.createDocumentFragment();
    const intervalSteps = new Set();
    Array(count + 1).fill('').forEach((_, i) => {
      step = Math.round((i * intervalStep + min) * Math.pow(10, 5)) / Math.pow(10, 5);

      if (step > maxVal) {
        step -= min;
      }

      if (step > maxVal) {
        step = max;
      }

      if (step < minVal) {
        step = min;
      }

      if (i === 0) {
        step = min;
      }

      if (i === count) {
        step = max;
      }

      intervalSteps.add(step);
    });
    intervalSteps.forEach(size => {
      const li = document.createElement('li');
      li.className = "interval-point__item";
      li.innerHTML = `<div class=${"interval-point__item-text"}> ${size} </div>`;
      const percent = Math.abs((size - min) / rangeSize) * 100;

      if (this.rotate === "horizontal") {
        li.style.left = `${percent}%`;
      } else {
        li.style.top = `${percent}%`;
      }

      fragment.append(li);
      this.items.push(li);
    });
    this.interval.append(fragment);
    return this.interval;
  }

  edit(rot) {
    this.rotate = rot;
    this.init();
  }

  init() {
    this.interval.className = "interval-point";

    if (this.rotate === "vertical") {
      this.interval.classList.add("interval-point_vertical");
    }
  }

}


;// CONCATENATED MODULE: ./slider/mvp/View/View.ts
var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};





class View {
  constructor(state) {
    this.slider = document.createElement('div');
    this.buttonLeft = new Button();
    this.buttonRight = new Button();
    this.buttonWidth = 10;
    this.tooltipEventPosition = 0;
    this.currentButton = this.buttonRight.button;
    this.isLeftOn = false;
    this.coords = {
      x: 0,
      y: 0,
      width: 0,
      height: 0
    };
    this.state = state;
    this.observer = new EventObserver();
    this.tooltipLeft = new Tooltip(this.state.rotate);
    this.tooltipRight = new Tooltip(this.state.rotate);
    this.tooltipGeneral = new Tooltip(this.state.rotate);
    this.sliderClass = new SliderRange(this.state.rotate);
    this.interval = new Interval();
    this.sliderRange = this.sliderClass.sliderRange;
    this.init(this.state.selector);
  }

  setState(newState) {
    this.state = Object.assign(Object.assign({}, this.state), newState);
    this.sliderClass.edit(this.state.rotate);
    this.interval.edit(this.state.rotate);
    this.tooltipLeft.setRotate(this.state.rotate);
    this.tooltipRight.setRotate(this.state.rotate);
    this.tooltipGeneral.setRotate(this.state.rotate);
  }

  render() {
    View.removeStyle(this.slider);
    this.show();
    this.addElem();
    this.addAction();
    this.buttonWidth = this.buttonRight.width();
    this.notifyCoords(true);
    this.installMove();
  }

  init(selector) {
    this.slider = document.querySelector(selector);
    this.slider.style.position = 'relative';
  }

  renderInterval() {
    this.interval.renderIntervals({
      min: this.state.min,
      max: this.state.max,
      count: this.state.intervalCount,
      intervalStep: this.state["intervalStep"]
    });
  }

  addElem() {
    this.sliderRange.append(this.buttonRight.button);
    this.slider.append(this.sliderRange);
  }

  addAction() {
    this.sliderRange.addEventListener('mousedown', this.onClickMove);
    this.sliderRange.addEventListener('touchstart', this.onClickMove);
    this.tooltipLeft.element.addEventListener('mousedown', this.handlerTooltip);
    this.tooltipRight.element.addEventListener('mousedown', this.handlerTooltip);
    this.tooltipLeft.element.addEventListener('touchstart', this.handlerTooltip);
    this.tooltipRight.element.addEventListener('touchstart', this.handlerTooltip);
    this.interval.items.forEach(item => {
      item.addEventListener('mousedown', this.onClickInterval);
      item.addEventListener('touchstart', this.onClickInterval);
    });
    window.addEventListener('resize', this.resizeSlider);
  }

  resizeSlider() {
    const {
      x,
      y,
      width,
      height
    } = this.slider.getBoundingClientRect();
    const isChanged = width !== this.coords.width || height !== this.coords.height || x !== this.coords.x || y !== this.coords.y;
    this.notifyCoords(isChanged);
  }

  notifyCoords(isNotify) {
    const {
      x,
      y,
      width,
      height
    } = this.slider.getBoundingClientRect();

    if (isNotify) {
      this.coords = {
        x,
        y,
        width,
        height
      };
      this.observer.broadcast({
        ["widthSlider"]: this.sliderRange.offsetWidth,
        ["heightSlider"]: this.sliderRange.offsetHeight
      });
      this.observer.broadcast({
        ["coordinates"]: {
          x,
          y,
          width,
          height
        }
      });
    }
  }

  static removeStyle(el) {
    const s = el.querySelectorAll('[style]');
    s.forEach(elem => {
      elem.removeAttribute('style');
    });
  }

  show() {
    if (this.state.range === 'two') {
      this.buttonLeftDisplay();
    } else {
      this.buttonLeftRemove();
    }

    if (this.state.showInterval) {
      this.intervalDisplay();
    } else {
      this.interval.interval.remove();
    }

    if (this.state.showTooltip) {
      this.tooltipRight.element.style.opacity = '1';
      this.slider.append(this.tooltipRight.element);
    } else {
      this.tooltipGeneral.element.remove();
      this.tooltipLeft.element.remove();
      this.tooltipRight.element.remove();
      this.tooltipEventPosition = 0;
    }
  }

  buttonLeftDisplay() {
    this.sliderRange.append(this.buttonLeft.button);

    if (this.state.showTooltip) {
      this.tooltipLeft.element.style.opacity = '1';
      this.slider.append(this.tooltipLeft.element);
    }
  }

  buttonLeftRemove() {
    this.tooltipGeneral.element.remove();
    this.buttonLeft.button.remove();
    this.tooltipLeft.element.remove();
    this.observer.broadcast({
      ["shiftLeft"]: 0
    });
  }

  intervalDisplay() {
    this.renderInterval();
    this.slider.append(this.interval.interval);
  }

  onClickInterval(event) {
    this.resizeSlider();

    if (event.cancelable) {
      event.preventDefault();
    }

    const value = event.target;
    this.observerPosition(event);

    if (this.state.range === 'two') {
      this.overridingButtons(this.state.isActiveLeft);
    }

    this.observer.broadcast({
      ["intervalAction"]: Number(value.textContent)
    });
    this.eventButton(this.state.step);
  }

  buttonAction(event) {
    if (event.cancelable) {
      event.preventDefault();
    }

    if (event instanceof MouseEvent) {
      document.addEventListener('mousemove', this.onMouseMove);
      document.addEventListener('mouseup', this.removeMouse);
      this.currentButton = event.currentTarget;
    } else {
      document.addEventListener('touchmove', this.onMouseMove);
      document.addEventListener('touchend', this.removeTouch);
      this.currentButton = event.targetTouches[0].target;
    }

    if (this.state.range === 'one') {
      this.currentButton = this.buttonRight.button;
    }

    this.isLeftOn = this.currentButton === this.buttonLeft.button;

    this.currentButton.ondragstart = () => false;
  }

  handlerTooltip(event) {
    let target;
    const {
      cordClient
    } = this.getCordClientAndEvent(event);
    this.resizeSlider();

    if (event.cancelable) {
      event.preventDefault();
    }

    if (event instanceof MouseEvent) {
      target = event.currentTarget;
    } else {
      target = event.targetTouches[0].target;
    }

    if (this.state.rotate === "horizontal") {
      this.tooltipEventPosition = cordClient - target.getBoundingClientRect().left - target.offsetWidth / 2;
    } else {
      this.tooltipEventPosition = cordClient - target.getBoundingClientRect().top - target.offsetHeight / 2;
    }

    if (this.tooltipLeft.element === target) {
      this.overridingButtons(true);
    } else {
      this.overridingButtons(false);
    }

    if (event instanceof MouseEvent) {
      document.addEventListener('mousemove', this.onMouseMove);
      document.addEventListener('mouseup', this.removeMouse);
    } else {
      document.addEventListener('touchmove', this.onMouseMove);
      document.addEventListener('touchend', this.removeTouch);
    }

    this.currentButton.ondragstart = () => false;
  }

  removeTouch() {
    document.removeEventListener('touchmove', this.onMouseMove);
    document.ontouchend = null;
  }

  removeMouse() {
    document.removeEventListener('mousemove', this.onMouseMove);
    document.onmouseup = null;
  }

  installMove() {
    this.initMove(this.state["shiftLeft"], this.state["shiftRight"]);
  }

  initMove(min, max) {
    this.overridingButtons(true);
    this.eventButton(min);
    this.overridingButtons(false);
    this.eventButton(max);
  }

  onMouseMove(event) {
    this.observerPosition(event);
    this.eventButton(this.state.step);
  }

  observerPosition(evt) {
    const {
      cordClient,
      event
    } = this.getCordClientAndEvent(evt);
    const {
      target
    } = event;
    const isNotTooltip = target !== this.tooltipRight.element && target !== this.tooltipLeft.element;

    if (isNotTooltip) {
      this.tooltipEventPosition = 0;
    }

    this.observer.broadcast({
      ["position"]: cordClient - this.tooltipEventPosition
    });

    if (this.state.range === 'two') {
      this.observer.broadcast({
        ["isActiveLeft"]: cordClient - this.tooltipEventPosition
      });
    }
  }

  getCordClientAndEvent(evt) {
    let event;
    let cordClient = 0;

    if (evt instanceof MouseEvent) {
      event = evt;
    } else {
      [event] = evt.touches;
    }

    if (this.state.rotate === "horizontal") {
      cordClient = event.clientX;
    }

    if (this.state.rotate === "vertical") {
      cordClient = event.clientY;
    }

    return {
      event,
      cordClient
    };
  }

  onClickMove(event) {
    this.resizeSlider();

    if (event.cancelable) {
      event.preventDefault();
    }

    this.buttonAction(event);
    this.observerPosition(event);

    if (this.state.range === 'two') {
      this.overridingButtons(this.state.isActiveLeft);
    }

    this.eventButton(this.state.step);
  }

  overridingButtons(bool) {
    if (bool) {
      this.currentButton = this.buttonLeft.button;
      this.isLeftOn = true;
    } else {
      this.currentButton = this.buttonRight.button;
      this.isLeftOn = false;
    }
  }

  eventButton(position) {
    let pos = position;

    if (this.isLeftOn) {
      pos = this.state["shiftRight"] < pos ? this.state["shiftRight"] : pos;
      this.observer.broadcast({
        ["shiftLeft"]: pos
      });
    } else {
      pos = this.state["shiftLeft"] > pos ? this.state["shiftLeft"] : pos;
      this.observer.broadcast({
        ["shiftRight"]: pos
      });
    }

    this.moveButton(pos);
  }

  moveButton(position) {
    if (this.state.rotate === "horizontal") {
      this.currentButton.style.left = `calc(${position}% - ${this.buttonWidth}px)`;
      this.currentButton.style.top = `${-this.state.heightSlider}px`;
    } else if (this.state.rotate === "vertical") {
      this.currentButton.style.left = `${-this.state.widthSlider}px`;
      this.currentButton.style.top = `calc(${position}% - ${this.buttonWidth}px)`;
    }

    if (this.state.showTooltip) {
      this.currentValueText();
      this.showCurrentValue();

      if (this.state.range === 'two') {
        const oneCurrent = this.tooltipLeft.rectRight() > this.tooltipRight.rectLeft();
        this.responsiveCurrent(oneCurrent);
      }
    }

    this.activeZoneAction();
  }

  currentValueText() {
    if (this.isLeftOn) {
      this.tooltipLeft.text(this.state.minValue);
    } else {
      this.tooltipRight.text(this.state.maxValue);
    }
  }

  responsiveCurrent(oneCurrent) {
    if (oneCurrent) {
      this.sliderRange.append(this.tooltipGeneral.element);
      this.tooltipLeft.element.style.opacity = '0';
      this.tooltipRight.element.style.opacity = '0';
      this.tooltipGeneral.element.style.opacity = '1';
      this.tooltipGeneral.element.style.display = 'block';

      if (this.state.minValue === this.state.maxValue) {
        this.tooltipGeneral.text(`${this.state.minValue}`);
      } else {
        this.tooltipGeneral.text(`${this.state.minValue} — ${+this.state.maxValue}`);
      }

      this.tooltipGeneral.position((this.state.shiftRight + this.state.shiftLeft) / 2);
    } else {
      this.tooltipGeneral.element.style.opacity = '0';
      this.tooltipGeneral.element.style.display = 'none';
      this.tooltipLeft.element.style.opacity = '1';
      this.tooltipRight.element.style.opacity = '1';
    }
  }

  showCurrentValue() {
    if (this.isLeftOn) {
      this.tooltipLeft.position(this.state.shiftLeft);
    } else {
      this.tooltipRight.position(this.state.shiftRight);
    }
  }

  activeZoneAction() {
    if (this.state.shiftLeft > this.state.shiftRight) {
      this.sliderClass.activeZone(this.state.shiftRight, this.state.shiftLeft);
    } else {
      this.sliderClass.activeZone(this.state.shiftLeft, this.state.shiftRight);
    }
  }

}

__decorate([esm/* boundMethod */.MR], View.prototype, "resizeSlider", null);

__decorate([esm/* boundMethod */.MR], View.prototype, "onClickInterval", null);

__decorate([esm/* boundMethod */.MR], View.prototype, "buttonAction", null);

__decorate([esm/* boundMethod */.MR], View.prototype, "handlerTooltip", null);

__decorate([esm/* boundMethod */.MR], View.prototype, "removeTouch", null);

__decorate([esm/* boundMethod */.MR], View.prototype, "removeMouse", null);

__decorate([esm/* boundMethod */.MR], View.prototype, "onMouseMove", null);

__decorate([esm/* boundMethod */.MR], View.prototype, "onClickMove", null);


;// CONCATENATED MODULE: ./slider/mvp/Presenter/Presenter.ts
var Presenter_decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};





class Presenter {
  constructor(selector) {
    this.model = new Model(selector);
    this.view = new View(this.model.getState);
    this.init();
  }

  getState() {
    return this.model.getState;
  }

  setState(options) {
    this.model.setStateValid(options, true);
    this.view.setState(this.model.getState);
    this.view.render();
  }

  subscribe(callBack) {
    this.model.observer.subscribe(callBack);
  }

  unsubscribe(callBack) {
    this.model.observer.unsubscribe(callBack);
  }

  init() {
    this.model.observer.subscribe(this.setStateView);
    this.view.observer.subscribe(this.setStateModel);
    this.view.render();
  }

  setStateModel(data) {
    this.model.setState(data);
  }

  setStateView() {
    this.view.setState(this.model.getState);
  }

}

Presenter_decorate([esm/* boundMethod */.MR], Presenter.prototype, "subscribe", null);

Presenter_decorate([esm/* boundMethod */.MR], Presenter.prototype, "unsubscribe", null);

Presenter_decorate([esm/* boundMethod */.MR], Presenter.prototype, "setStateModel", null);

Presenter_decorate([esm/* boundMethod */.MR], Presenter.prototype, "setStateView", null);


;// CONCATENATED MODULE: ./slider/utils/helper.ts
/* provided dependency */ var $ = __webpack_require__(638);


function callPresent(element, ind) {
  const slider = element;
  const selector = slider.className;
  const className = `${selector.replace(/\W+/gi, '_')}-${ind}_rqik`;
  slider.classList.add(className);
  const present = new Presenter(`.${className}`);
  present.setState(Object.assign({}, slider.dataset));
  return present;
}

function makeMethodPresent(slider, method, options) {
  switch (method) {
    case "subscribe":
      if (typeof options === 'undefined') {
        throw new ReferenceError('callback function is not defined');
      }

      if (typeof options !== 'function') {
        throw new TypeError('callback is not function');
      }

      slider.each((_, element) => {
        $(element).data('sliderRqik').subscribe(options);
      });
      break;

    case "unsubscribe":
      if (typeof options === 'undefined') {
        throw new ReferenceError('callback function is not defined');
      }

      if (typeof options !== 'function') {
        throw new TypeError('callback is not function');
      }

      slider.each((_, element) => {
        $(element).data('sliderRqik').unsubscribe(options);
      });
      break;

    case "settings":
      if (typeof options === 'object') {
        slider.each((_, element) => {
          $(element).data('sliderRqik').setState(options);
        });
        return slider;
      }

      const states = [];
      slider.each((_, element) => {
        states.push($(element).data('sliderRqik').getState());
      });

      if (!states) {
        break;
      }

      if (states.length <= 1) {
        return states[0];
      }

      return states;

    default:
      throw new Error(`${method} is not found`);
  }
}


;// CONCATENATED MODULE: ./slider/slider.ts
/* provided dependency */ var jQuery = __webpack_require__(638);


(function IIFE(jQuery) {
  const $ = jQuery;

  function init(index, element) {
    if (!$(element).length) {
      throw new ReferenceError('Connection to non-existent element');
    }

    const dataFromAttributes = $(element).data();
    const present = callPresent(element, index);
    present.setState(dataFromAttributes);
    $(element).data('sliderRqik', present);
  }

  $.fn.sliderRqik = function initialPlugin(method, options) {
    const $this = $(this);

    if (!$this.first().data('sliderRqik')) {
      $this.each(init);
    }

    if (typeof method === 'undefined') {
      return $(this);
    }

    if (typeof method === 'object') {
      $this.each((_, element) => {
        $(element).data('sliderRqik').setState(method);
      });
      return $(this);
    }

    if (typeof method !== 'string') {
      throw new TypeError('sliderRqik method name should be a string');
    }

    const states = makeMethodPresent($this, method, options);

    if (states) {
      return states;
    }

    return $(this);
  };

  $(() => {
    const defaultSelector = '.slider-rqik';
    $(defaultSelector).sliderRqik();
  });
})(jQuery);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					result = fn();
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			179: 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			for(moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) var result = runtime(__webpack_require__);
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkIds[i]] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = globalThis["webpackChunk"] = globalThis["webpackChunk"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, [291], () => (__webpack_require__(475)))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;