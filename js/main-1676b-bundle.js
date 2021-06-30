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
    slider,
    classRotate
  }) {
    this.$form = $form;
    this.$sliderDOM = $sliderDOM;
    this.slider = slider;
    this.$inputRotate = this.$form.find("input[name='rotate']");
    this.$inputRange = this.$form.find("input[name='range']");
    this.$inputCurrentLeft = this.$form.find("input[name='currentValLeft']");
    this.$inputCurrentRight = this.$form.find("input[name='currentValRight']");
    this.classRotate = classRotate;
    this.inputsValue = ['maxValue', 'minValue', 'currentValRight', 'currentValLeft', 'round', 'intervalCount', 'stepSize'];
    this.inputCheck = [['rotate', ['vertical', 'horizontal']], ['showInterval', [true, false]], ['show', [true, false]], ['range', ['two', 'one']]];
  }

  init() {
    this.actionForm();
    this.addEventSlider();
  }

  addEventSlider() {
    this.$sliderDOM.on('mousedown', this.handleClick);
    this.$sliderDOM.on('touchmove', this.handleClick);
    this.$inputRotate.on('click', this.addClassForm);
    this.$inputRange.on('change', this.disabledInputCurrentLeft);
  }

  disabledInputCurrentLeft() {
    if (!this.$inputRange.prop('checked')) {
      this.$inputCurrentLeft.prop('disabled', true);
    } else {
      this.$inputCurrentLeft.prop('disabled', false);
    }
  }

  addClassForm() {
    if (this.$inputRotate.is(':checked')) {
      this.$sliderDOM.addClass(this.classRotate);
    } else {
      this.$sliderDOM.removeClass(this.classRotate);
    }
  }

  handleClick() {
    document.addEventListener('mousemove', this.eventChange);
    document.addEventListener('mouseup', this.removeMouse);
    document.addEventListener('touchmove', this.eventChange);
    document.addEventListener('touchend', this.removeTouch);
  }

  removeMouse() {
    document.removeEventListener('mousemove', this.eventChange);
    document.onmouseup = null;
  }

  removeTouch() {
    document.removeEventListener('touchmove', this.eventChange);
    document.ontouchend = null;
  }

  eventChange() {
    this.$inputCurrentLeft.val(this.slider.getData()[0].currentValLeft);
    this.$inputCurrentRight.val(this.slider.getData()[0].currentValRight);
  }

  makeEventCheck({
    nameAtr,
    active,
    disable
  }) {
    return event => {
      if ($(event.currentTarget).prop('checked')) {
        this.slider.data({
          [nameAtr]: active
        });
      } else {
        this.slider.data({
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
      this.slider.data({
        [nameAtr]: +value
      });
    }
  }

  makeEventInputChange(nameAtr) {
    const $input = this.$form.find(`input[name='${nameAtr}']`);
    let value = $input.val() || 0;
    return () => {
      value = $input.val() || 0;

      if (value === '-') {
        return;
      }

      const isCurrentInput = nameAtr === 'stepSize';

      if (isCurrentInput) {
        this.$inputCurrentLeft.attr('step', this.slider.getData()[0].stepSize);
        this.$inputCurrentRight.attr('step', this.slider.getData()[0].stepSize);
      }

      this.slider.data({
        [nameAtr]: +value
      });
      const s = this.slider.getData()[0][nameAtr];
      $input.attr('value', Number(s));
      $input.val(Number(s));
      this.eventChange();
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
      this.slider.data({
        [nameAtr]: active
      });
    } else {
      this.slider.data({
        [nameAtr]: disable
      });
    }
  }

  actionForm() {
    this.inputsValue.forEach(el => this.runChange(el));
    this.inputCheck.forEach(el => this.runCheckChange(...el));
  }

}

__decorate([esm/* boundMethod */.MR], InputChecker.prototype, "disabledInputCurrentLeft", null);

__decorate([esm/* boundMethod */.MR], InputChecker.prototype, "addClassForm", null);

__decorate([esm/* boundMethod */.MR], InputChecker.prototype, "handleClick", null);

__decorate([esm/* boundMethod */.MR], InputChecker.prototype, "removeMouse", null);

__decorate([esm/* boundMethod */.MR], InputChecker.prototype, "removeTouch", null);

__decorate([esm/* boundMethod */.MR], InputChecker.prototype, "eventChange", null);


;// CONCATENATED MODULE: ./demo/page/page.ts
/* provided dependency */ var page_$ = __webpack_require__(638);




__webpack_require__(218);

const $plug1 = page_$('.js-plug1');
const $plug2 = page_$('.js-plug2');
const $plug3 = page_$('.js-plug3');
const $plug4 = page_$('.js-plug4');
const $form1 = page_$('#form1');
const $form2 = page_$('#form2');
const $form3 = page_$('#form3');
const $form4 = page_$('#form4');
const plug1 = $plug1.sliderRqik();
const plug2 = $plug2.sliderRqik();
const plug3 = $plug3.sliderRqik();
const plug4 = $plug4.sliderRqik();
new InputChecker({
  $form: $form1,
  $sliderDOM: $plug1,
  slider: plug1,
  classRotate: 'slider_vertical'
}).init();
new InputChecker({
  $form: $form2,
  $sliderDOM: $plug2,
  slider: plug2,
  classRotate: 'slider_vertical'
}).init();
new InputChecker({
  $form: $form3,
  $sliderDOM: $plug3,
  slider: plug3,
  classRotate: 'slider_vertical'
}).init();
new InputChecker({
  $form: $form4,
  $sliderDOM: $plug4,
  slider: plug4,
  classRotate: 'slider_vertical'
}).init();

/***/ }),

/***/ 218:
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

  broadcast(data) {
    this.observers.forEach(subscriber => {
      if (typeof subscriber === 'function') {
        subscriber(data);
      }
    });
  }

  unsubscribe(fn) {
    this.observers = this.observers.filter(subscriber => subscriber !== fn);
  }

}


;// CONCATENATED MODULE: ./slider/mvp/Model/Model.ts


class Model {
  constructor(selector = 'slider-rqik') {
    this.coords = {
      x: 0,
      y: 0,
      height: 0,
      width: 0
    };
    this.state = {
      selector: 'slider-range',
      minValue: 0,
      maxValue: 1000,
      range: 'one',
      rotate: "horizontal",
      showTooltip: true,
      showInterval: true,
      intervalCount: 2,
      stepSize: 1,
      currentValRight: 50,
      currentValLeft: 0,
      ["shiftLeft"]: 0,
      ["shiftRight"]: 0,
      step: 0,
      isActiveLeft: false,
      intervalStep: 0
    };
    this.percent = 0;
    this.state.selector = selector;
    this.observer = new EventObserver();
  }

  get stateCurrent() {
    return Object.assign({}, this.state);
  }

  editState(data) {
    switch (Object.keys(data)[0]) {
      case "shiftLeft":
        this.edit(data);
        this.defineLeftVal();
        break;

      case "shiftRight":
        this.edit(data);
        this.defineRightVal();
        break;

      case "position":
        this.defineStep(Number(data["position"]));
        break;

      case "coordinates":
        this.updateCoordinate(data["coordinates"]);
        break;

      case "active":
        this.activeButton(data["active"]);
        break;

      case "intervalAction":
        this.state.step = this.convertNumberInPercent(Number(data["intervalAction"]));
        break;

      default:
        this.edit(data);
        break;
    }

    this.observer.broadcast(this.stateCurrent);
  }

  editMode(key) {
    this.state = Object.assign(Object.assign({}, this.state), key);
    this.convertToNumber();
    this.observer.broadcast(this.stateCurrent);
  }

  edit(key) {
    this.state = Object.assign(Object.assign({}, this.state), key);
    this.observer.broadcast(this.stateCurrent);
  }

  convertToNumber() {
    this.state.minValue = Model.convertCorrectNumber(this.state.minValue);
    this.state.maxValue = Model.convertCorrectNumber(this.state.maxValue);
    this.state.intervalCount = Model.convertCorrectNumber(this.state.intervalCount);
    this.state.stepSize = Model.convertCorrectNumber(this.state.stepSize);
    this.state.currentValRight = Model.convertCorrectNumber(this.state.currentValRight);
    this.state.currentValLeft = Model.convertCorrectNumber(this.state.currentValLeft);
    this.state.shiftLeft = this.validStep(this.convertNumberInPercent(this.state.currentValLeft));
    this.state.shiftRight = this.validStep(this.convertNumberInPercent(this.state.currentValRight));
    this.state.shiftRight = Number.isFinite(this.state.shiftRight) ? Model.transformRange(this.state.shiftRight) : 0;
    this.state.shiftLeft = Number.isFinite(this.state.shiftLeft) ? Model.transformRange(this.state.shiftLeft) : 0;
    this.state["intervalStep"] = this.defineIntervalStep();
  }

  updateCoordinate(coords) {
    this.coords = Object.assign(Object.assign({}, this.coords), coords);
  }

  defineStep(position) {
    const percent = this.mathPercent(position);
    this.state.step = this.validStep(percent);
  }

  validStep(percent) {
    if (this.state.stepSize > 0) {
      return Model.transformRange(this.mathStepCount(percent));
    }

    return Model.transformRange(percent);
  }

  activeButton(position) {
    this.state.isActiveLeft = Math.abs(this.state["shiftLeft"] - this.state.step) <= Math.abs(this.state["shiftRight"] - this.state.step);

    if (this.state["shiftLeft"] === this.state["shiftRight"]) {
      this.state.isActiveLeft = this.mathPercent(position) < this.state.shiftRight;
      this.checkExtremePoint();
    }
  }

  checkExtremePoint() {
    if (this.state.step <= 0) {
      this.state.isActiveLeft = false;
      return;
    }

    if (this.state.step >= 100) {
      this.state.isActiveLeft = true;
    }
  }

  mathPercent(num) {
    if (this.state.rotate === "horizontal") {
      return (num - this.coords.x) / this.coords.width * 100;
    }

    return (num - this.coords.y) / this.coords.height * 100;
  }

  mathStepCount(num) {
    const difference = Math.abs(this.state.maxValue - this.state.minValue);

    if (difference === 0) {
      return Math.round(num / this.state.stepSize) * this.state.stepSize;
    }

    this.percent = this.state.stepSize / Math.abs(this.state.maxValue - this.state.minValue) * 100;
    this.percent = Model.transformRange(this.percent);
    return Math.round(num / this.percent) * this.percent;
  }

  defineDecimalPlacesCount() {
    var _a;

    const str = this.state.stepSize.toString();
    let decimalPlaces = 10;

    if (str.includes('.')) {
      decimalPlaces = Number(((_a = str.split('.').pop()) === null || _a === void 0 ? void 0 : _a.length) || 0);
    }

    return decimalPlaces;
  }

  convertNumberInPercent(value) {
    return (value - this.state.minValue) / (this.state.maxValue - this.state.minValue) * 100;
  }

  defineLeftVal() {
    const leftValue = (this.state.maxValue - this.state.minValue) * this.state.shiftLeft / 100 + this.state.minValue;
    this.state.currentValLeft = Number(leftValue.toFixed(this.defineDecimalPlacesCount()));
  }

  defineRightVal() {
    const rightValue = (this.state.maxValue - this.state.minValue) * this.state.shiftRight / 100 + this.state.minValue;
    this.state.currentValRight = Number(rightValue.toFixed(this.defineDecimalPlacesCount()));
  }

  defineIntervalStep() {
    const step = (this.state.maxValue - this.state.minValue) / this.state.intervalCount;
    return Number(step.toFixed(this.defineDecimalPlacesCount()));
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
    this.tooltipVal = document.createElement('div');
    this.init();
  }

  text(text) {
    this.tooltipVal.textContent = `${text}`;
  }

  position(position) {
    if (this.orientation === "horizontal") {
      this.positionHorizontal(position);
    } else if (this.orientation === "vertical") {
      this.positionVertical(position);
    }
  }

  positionHorizontal(shiftX) {
    this.tooltipVal.style.top = `-${this.tooltipVal.offsetHeight + 10}px`;
    this.tooltipVal.style.left = `calc(${shiftX}% - ${this.tooltipVal.offsetWidth / 2}px)`;
  }

  positionVertical(shiftX) {
    this.tooltipVal.style.top = `calc(${shiftX}% -
    ${this.tooltipVal.offsetHeight / 2}px)`;
    this.tooltipVal.style.left = `-${this.tooltipVal.offsetWidth + 15}px`;
  }

  setRotate(orientation) {
    this.orientation = orientation;
  }

  rectLeft() {
    const clientRect = this.tooltipVal.getBoundingClientRect();

    if (this.orientation === "horizontal") {
      return clientRect.left;
    }

    return clientRect.top;
  }

  rectRight() {
    const clientRect = this.tooltipVal.getBoundingClientRect();

    if (this.orientation === "horizontal") {
      return clientRect.right;
    }

    return clientRect.bottom;
  }

  init() {
    this.tooltipVal.className = "slider-range__current-value";
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
    if (rot === "vertical") {
      this.rotate = rot;
      this.sliderRange.classList.add("slider-range_vertical");
    } else if (rot === "horizontal") {
      this.rotate = rot;
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

    if (rot === "vertical") {
      this.sliderRange.classList.add("slider-range_vertical");
    }

    this.sliderRange.appendChild(this.sliderActiveZone);
    return this.sliderRange;
  }

}


;// CONCATENATED MODULE: ./slider/mvp/View/Interval/Interval.ts
class Interval {
  constructor() {
    this.interval = document.createElement('ul');
    this.items = [document.createElement('li')];
    this.rotate = "horizontal";
    this.init();
  }

  renderIntervals({
    minValue,
    maxValue,
    count,
    intervalStep
  }) {
    this.interval.textContent = '';

    if (count <= 0) {
      return this.interval;
    }

    let sum;
    const fragment = document.createDocumentFragment();
    this.items = Array(count + 1).fill('').map((_, i) => {
      const li = document.createElement('li');
      sum = Math.round((i * intervalStep + minValue) * 10e6) / 10e6;
      li.className = "interval-point__item";
      li.innerHTML = i !== count ? `<div class=${"interval-point__item-text"}> ${sum} </div>` : `<div class=${"interval-point__item-text"}> ${maxValue} </div>`;
      fragment.append(li);
      return li;
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
    this.currentButton = this.buttonRight.button;
    this.isLeftOn = false;
    this.state = state;
    this.observer = new EventObserver();
    this.currentValLeft = new Tooltip(this.state.rotate);
    this.currentValRight = new Tooltip(this.state.rotate);
    this.currentValGeneral = new Tooltip(this.state.rotate);
    this.slideClass = new SliderRange(this.state.rotate);
    this.interval = new Interval();
    this.sliderRange = this.slideClass.sliderRange;
    this.startView(this.state.selector);
  }

  editView(newState) {
    this.state = Object.assign(Object.assign({}, this.state), newState);
    this.slideClass.edit(this.state.rotate);
    this.interval.edit(this.state.rotate);
    this.currentValLeft.setRotate(this.state.rotate);
    this.currentValRight.setRotate(this.state.rotate);
    this.currentValGeneral.setRotate(this.state.rotate);
  }

  render() {
    View.removeStyle(this.slider);
    this.show();
    this.addElem();
    this.addAction();
    this.buttonWidth = this.buttonRight.width();
    this.resizeSlider();
    this.installMove();
  }

  startView(selector) {
    this.slider = document.querySelector(selector);
    this.slider.style.position = 'relative';
  }

  renderInterval() {
    this.interval.renderIntervals({
      minValue: this.state.minValue,
      maxValue: this.state.maxValue,
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

    if (this.state.show) {
      this.currentValRight.tooltipVal.style.opacity = '1';
      this.sliderRange.append(this.currentValRight.tooltipVal);
    } else {
      this.currentValGeneral.tooltipVal.remove();
      this.currentValLeft.tooltipVal.remove();
      this.currentValRight.tooltipVal.remove();
    }
  }

  buttonLeftDisplay() {
    this.sliderRange.append(this.buttonLeft.button);

    if (this.state.show) {
      this.currentValLeft.tooltipVal.style.opacity = '1';
      this.sliderRange.append(this.currentValLeft.tooltipVal);
    }
  }

  buttonLeftRemove() {
    this.currentValGeneral.tooltipVal.remove();
    this.buttonLeft.button.remove();
    this.currentValLeft.tooltipVal.remove();
    this.observer.broadcast({
      ["shiftLeft"]: 0
    });
  }

  intervalDisplay() {
    this.renderInterval();
    this.slider.append(this.interval.interval);
  }

  onClickInterval(event) {
    if (event.cancelable) {
      event.preventDefault();
    }

    const value = event.target;
    this.observerPosition(event);

    if (this.state.range === 'two') {
      this.overridingButtons(this.state.isActiveLeft);
    }

    this.observer.broadcast({
      ["intervalAction"]: value.textContent
    });
    this.eventButton(this.state.step);
  }

  buttonAction(e) {
    if (e.cancelable) {
      e.preventDefault();
    }

    if (e instanceof MouseEvent) {
      document.addEventListener('mousemove', this.onMouseMove);
      document.addEventListener('mouseup', this.removeMouse);
      this.currentButton = e.currentTarget;
    } else {
      document.addEventListener('touchmove', this.onMouseMove);
      document.addEventListener('touchend', this.removeTouch);
      this.currentButton = e.targetTouches[0].target;
    }

    if (this.state.range === 'one') {
      this.currentButton = this.buttonRight.button;
    }

    this.isLeftOn = this.currentButton === this.buttonLeft.button;

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

  observerPosition(e) {
    let event;
    let cordClient;

    if (e instanceof MouseEvent) {
      event = e;
    } else {
      [event] = e.touches;
    }

    if (this.state.rotate === "horizontal") {
      cordClient = event.clientX;
    } else if (this.state.rotate === "vertical") {
      cordClient = event.clientY;
    }

    this.observer.broadcast({
      ["position"]: cordClient
    });

    if (this.state.range === 'two') {
      this.observer.broadcast({
        ["active"]: cordClient
      });
    }
  }

  onClickMove(event) {
    this.buttonAction(event);
    this.observerPosition(event);

    if (this.state.range === 'two') {
      this.overridingButtons(this.state.isActiveLeft);
    }

    this.resizeSlider();
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

    if (this.state.show) {
      this.currentValueText();
      this.showCurrentValue();

      if (this.state.range === 'two') {
        const oneCurrent = this.currentValLeft.rectRight() > this.currentValRight.rectLeft();
        this.responsiveCurrent(oneCurrent);
      }
    }

    this.activeZoneAction();
  }

  currentValueText() {
    if (this.isLeftOn) {
      this.currentValLeft.text(this.state.currentValLeft);
    } else {
      this.currentValRight.text(this.state.currentValRight);
    }
  }

  responsiveCurrent(oneCurrent) {
    if (oneCurrent) {
      this.sliderRange.append(this.currentValGeneral.tooltipVal);
      this.currentValLeft.tooltipVal.style.opacity = '0';
      this.currentValRight.tooltipVal.style.opacity = '0';
      this.currentValGeneral.tooltipVal.style.opacity = '1';
      this.currentValGeneral.tooltipVal.style.display = 'block';

      if (this.state.currentValLeft === this.state.currentValRight) {
        this.currentValGeneral.text(`${this.state.currentValLeft}`);
      } else {
        this.currentValGeneral.text(`${this.state.currentValLeft} — ${+this.state.currentValRight}`);
      }

      this.currentValGeneral.position((this.state.shiftRight + this.state.shiftLeft) / 2);
    } else {
      this.currentValGeneral.tooltipVal.style.opacity = '0';
      this.currentValGeneral.tooltipVal.style.display = 'none';
      this.currentValLeft.tooltipVal.style.opacity = '1';
      this.currentValRight.tooltipVal.style.opacity = '1';
    }
  }

  showCurrentValue() {
    if (this.isLeftOn) {
      this.currentValLeft.position(this.state.shiftLeft);
    } else {
      this.currentValRight.position(this.state.shiftRight);
    }
  }

  activeZoneAction() {
    if (this.state.shiftLeft > this.state.shiftRight) {
      this.slideClass.activeZone(this.state.shiftRight, this.state.shiftLeft);
    } else {
      this.slideClass.activeZone(this.state.shiftLeft, this.state.shiftRight);
    }
  }

}

__decorate([esm/* boundMethod */.MR], View.prototype, "resizeSlider", null);

__decorate([esm/* boundMethod */.MR], View.prototype, "onClickInterval", null);

__decorate([esm/* boundMethod */.MR], View.prototype, "buttonAction", null);

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





class Present {
  constructor(selector) {
    this.selector = selector;
    this.model = new Model(selector);
    this.view = new View(this.model.stateCurrent);
    this.rotate = this.model.stateCurrent.rotate;
    this.init();
  }

  state() {
    return this.model.stateCurrent;
  }

  sliderModify(options) {
    this.model.editMode(options);
    this.view.editView(this.model.stateCurrent);

    if (this.rotate !== this.model.stateCurrent.rotate) {
      this.rotate = this.model.stateCurrent.rotate;
      this.view.observer.unsubscribe(this.setStateModel);
      this.model.observer.unsubscribe(this.setStateView);
    }

    this.init();
  }

  setStateModel(data) {
    this.model.editState(data);
  }

  setStateView() {
    this.view.editView(this.model.stateCurrent);
  }

  init() {
    this.model.observer.subscribe(this.setStateView);
    this.view.observer.subscribe(this.setStateModel);
    this.view.render();
  }

}

Presenter_decorate([esm/* boundMethod */.MR], Present.prototype, "setStateModel", null);

Presenter_decorate([esm/* boundMethod */.MR], Present.prototype, "setStateView", null);


;// CONCATENATED MODULE: ./slider/Slider.ts
/* provided dependency */ var jQuery = __webpack_require__(638);


(function IIFE(jQuery) {
  const $ = jQuery;

  $.fn.sliderRqik = function initSlider(options) {
    const allSlider = [];
    this.each((id, el) => {
      const res = new SliderPlugin(el, id);

      if (options) {
        res.data(options);
      }

      allSlider.push(res);
    });
    const slider = {
      data(opt) {
        allSlider.forEach(el => {
          el.data(opt);
        });
        return slider;
      },

      getData() {
        const stateArr = [];
        allSlider.forEach(el => {
          const r = el.getData();

          if (r) {
            stateArr.push(r);
          }
        });
        return stateArr;
      }

    };
    return slider;
  };

  $(() => {
    const defaultSelector = '.js-slider-rqik';
    $(defaultSelector).sliderRqik();
  });
})(jQuery);

class SliderPlugin {
  constructor(element, ind) {
    this.selector = '';
    this.sliders = element;
    this.selector = this.sliders.className;
    this.start(this.selector, ind, this.sliders.dataset);
  }

  start(selector, ind, opt) {
    const className = `${selector.replace(/\W+/gi, '')}-${ind}_i-slider`;
    this.sliders.classList.add(className);
    const pr = new Present(`.${className}`);
    pr.sliderModify(opt);
    this.presents = pr;
    return this;
  }

  data(data) {
    if (this.presents) {
      this.presents.sliderModify(data);
    }

    return this;
  }

  getData() {
    if (this.presents) {
      return this.presents.state();
    }

    return false;
  }

}

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