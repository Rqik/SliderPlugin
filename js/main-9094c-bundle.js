/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 42:
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {


;// CONCATENATED MODULE: ./demo/InputChecker/InputChecker.ts
/* provided dependency */ var $ = __webpack_require__(638);
class InputChecker {
  constructor(form, sliderDOM, slider, classRotate) {
    this.form = form;
    this.sliderDOM = sliderDOM;
    this.slider = slider;
    this.inputRotate = this.form.find("input[name='rotate']");
    this.classRotate = classRotate;
  }

  init() {
    this.actionForm();
    this.addEventSlider();
  }

  addEventSlider() {
    this.sliderDOM.on('click', this.eventChange.bind(this));
    this.inputRotate.on('click', this.addClassForm.bind(this));
  }

  addClassForm() {
    if (this.inputRotate.is(':checked')) {
      this.sliderDOM.addClass(this.classRotate);
    } else {
      this.sliderDOM.removeClass(this.classRotate);
    }
  }

  eventChange() {
    this.inputChange('currentValLeft', this.slider.getData()[0].currentValLeft);
    this.inputChange('currentValRight', this.slider.getData()[0].currentValRight);
  }

  makeEventCheck(nameAtr, active, disable) {
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
    const item = this.form.find(`input[name='${nameAtr}']`);
    const val = item.val() || 0;
    item.on('input', this.makeEventInputChange(nameAtr));

    if (val !== '-' || val !== undefined) {
      this.slider.data({
        [nameAtr]: +val
      });
    }
  }

  makeEventInputChange(nameAtr) {
    const item = this.form.find(`input[name='${nameAtr}']`);
    let val = item.val() || 0;
    return () => {
      val = item.val() || 0;

      if (val === '-') {
        return;
      }

      this.slider.data({
        [nameAtr]: +val
      });
    };
  }

  inputChange(nameAtr, value) {
    this.form.find(`input[name='${nameAtr}']`).val(value);
  }

  checkChange(nameAtr, value) {
    const [active, disable] = value;
    const item = this.form.find(`input[name='${nameAtr}']`);
    item.on('click', this.makeEventCheck(nameAtr, active, disable));

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
    this.runChange('maxValue');
    this.runChange('minValue');
    this.runChange('currentValRight');
    this.runChange('currentValLeft');
    this.runChange('round');
    this.runChange('intervalCount');
    this.runChange('stepSize');
    this.checkChange('rotate', ['vertical', 'horizontal']);
    this.checkChange('showInterval', [true, false]);
    this.checkChange('show', [true, false]);
    this.checkChange('range', ['two', 'one']);
  }

}


;// CONCATENATED MODULE: ./demo/demo.ts
/* provided dependency */ var demo_$ = __webpack_require__(638);




__webpack_require__(427);

const $plug1 = demo_$('.js-plug1');
const $plug2 = demo_$('.js-plug2');
const $plug3 = demo_$('.js-plug3');
const $plug4 = demo_$('.js-plug4');
const $form1 = demo_$('#form1');
const $form2 = demo_$('#form2');
const $form3 = demo_$('#form3');
const $form4 = demo_$('#form4');
const plug1 = $plug1.sliderRqik({
  maxValue: 1000,
  range: 'one',
  showInterval: true
});
const plug2 = $plug2.sliderRqik({
  rotate: 'vertical',
  range: 'one',
  minValue: -100
});
const plug3 = $plug3.sliderRqik();
const plug4 = $plug4.sliderRqik();
new InputChecker($form1, $plug1, plug1, 'slider_vertical').init();
new InputChecker($form2, $plug2, plug2, 'slider_vertical').init();
new InputChecker($form3, $plug3, plug3, 'slider_vertical').init();
new InputChecker($form4, $plug4, plug4, 'slider_vertical').init();

/***/ }),

/***/ 427:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

;// CONCATENATED MODULE: ./slider/mvp/View/Button/Butoon.ts
class Button {
  constructor() {
    this.button = document.createElement('div');
    this.widthButton = 10;
    this.init();
  }

  init() {
    this.button.className = "slider-range__button";
  }

  addEvent(type, action) {
    this.button.addEventListener(type, Button.makeEvent(action));
  }

  static makeEvent(action) {
    return event => {
      action(event);
    };
  }

  width() {
    this.widthButton = this.button.offsetWidth / 2;
    return this.widthButton;
  }

}


;// CONCATENATED MODULE: ./slider/mvp/View/Interval/Interval.ts
class Interval {
  constructor() {
    this.interval = document.createElement('ul');
    this.rotate = "horizontal";
    this.init();
  }

  init() {
    this.interval.className = "interval-point";

    if (this.rotate === "vertical") {
      this.interval.classList.add("interval-point_vertical");
    }
  }

  valueInterval(minValue, maxValue, count) {
    this.interval.textContent = '';

    if (count <= 0) {
      return this.interval;
    }

    const interval = (maxValue - minValue) / count;
    let sum;

    for (let i = 0; i <= count; i += 1) {
      const li = document.createElement('li');
      li.className = "interval-point__item";
      sum = i * interval + minValue;
      li.innerHTML = `<div class=${"interval-point__item-text"}> ${sum} </div>`;
      this.interval.append(li);
    }

    return this.interval;
  }

  edit(rot) {
    this.rotate = rot;
    this.init();
  }

}


;// CONCATENATED MODULE: ./slider/mvp/View/Tooltip/Toolitp.ts
class Tooltip {
  constructor(orientation) {
    this.orientation = orientation;
    this.tooltipVal = document.createElement('div');
    this.size = 10;
    this.init();
  }

  init() {
    this.tooltipVal.className = "slider-range__current-value";
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
    this.tooltipVal.style.top = `${-(+this.tooltipVal.offsetHeight + 10)}px`;
    this.tooltipVal.style.left = `calc(${shiftX}% - ${this.tooltipVal.offsetWidth / 2}px)`;
  }

  positionVertical(shiftX) {
    this.tooltipVal.style.top = `calc(${shiftX}% - ${this.tooltipVal.offsetHeight / 2}px)`;
    this.tooltipVal.style.left = `${-(+this.tooltipVal.offsetWidth + 15)}px`;
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

}


;// CONCATENATED MODULE: ./slider/mvp/View/SliderRange/SliderRange.ts
class SliderRange {
  constructor(rot) {
    this.sliderRange = document.createElement('div');
    this.sliderActiveZone = document.createElement('div');
    this.rotate = "horizontal";
    this.init(rot);
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

}


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


;// CONCATENATED MODULE: ./slider/mvp/View/View.ts



class View {
  constructor(state) {
    this.slider = document.createElement('div');
    this.buttonLeft = new Button();
    this.buttonRight = new Button();
    this.interval = new Interval();
    this.buttonWidth = 10;
    this.clickHandler = this.onMouseMove.bind(this);
    this.clickMoveHandler = this.onClickMove.bind(this);
    this.mouseDownHandler = this.buttonAction.bind(this);
    this.currentValHandler = this.currentButtonAction.bind(this);
    this.currentButton = this.buttonRight.button;
    this.tumbler = false;
    this.state = state;
    this.observer = new EventObserver();
    this.currentValLeft = new Tooltip(this.state.rotate);
    this.currentValRight = new Tooltip(this.state.rotate);
    this.currentValGeneral = new Tooltip(this.state.rotate);
    this.slideClass = new SliderRange(this.state.rotate);
    this.sliderRange = this.slideClass.sliderRange;
    this.startView(this.state.selector);
  }

  startView(selector) {
    this.slider = document.querySelector(selector);
    this.slider.style.position = 'relative';
  }

  editView(newState) {
    this.state = Object.assign(Object.assign({}, this.state), newState);
    this.slideClass.edit(this.state.rotate);
    this.interval.edit(this.state.rotate);
    this.currentValLeft.setRotate(this.state.rotate);
    this.currentValRight.setRotate(this.state.rotate);
    this.currentValGeneral.setRotate(this.state.rotate);
  }

  renderInterval() {
    this.interval.valueInterval(this.state.minValue, this.state.maxValue, this.state.intervalCount);
  }

  addElem() {
    this.sliderRange.append(this.buttonRight.button);
    this.slider.append(this.sliderRange);
  }

  addAction() {
    this.buttonRight.addEvent('mousedown', this.mouseDownHandler);
    this.buttonRight.addEvent('dragstart', this.mouseDownHandler);
    this.buttonRight.addEvent('touchstart', this.mouseDownHandler);
    this.currentValRight.tooltipVal.addEventListener('mousedown', this.currentValHandler);
    this.currentValRight.tooltipVal.addEventListener('touchstart', this.currentValHandler);

    if (this.state.range === 'two') {
      this.buttonLeft.addEvent('mousedown', this.mouseDownHandler);
      this.buttonLeft.addEvent('touchstart', this.mouseDownHandler);
      this.currentValLeft.tooltipVal.addEventListener('touchstart', this.currentValHandler);
      this.currentValLeft.tooltipVal.addEventListener('mousedown', this.currentValHandler);
    }

    this.sliderRange.addEventListener('mousedown', this.clickMoveHandler);
    this.sliderRange.addEventListener('touchstart', this.clickMoveHandler);
    window.addEventListener('resize', this.resizeSlider.bind(this));
  }

  resizeSlider() {
    this.observer.broadcast({
      ["widthSlider"]: this.sliderRange.offsetWidth,
      ["heightSlider"]: this.sliderRange.offsetHeight
    });
    this.observer.broadcast({
      ["coordinates"]: {
        x: this.slider.getBoundingClientRect().x,
        y: this.slider.getBoundingClientRect().y,
        width: this.slider.getBoundingClientRect().width,
        height: this.slider.getBoundingClientRect().height
      }
    });
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

  static removeStyle(el) {
    const s = el.querySelectorAll('[style]');
    s.forEach(elem => {
      elem.removeAttribute('style');
    });
  }

  show() {
    if (this.state.range === 'two') {
      this.buttonLeftExpose();
    } else {
      this.buttonLeftRemove();
    }

    if (this.state.showInterval) {
      this.intervalExpose();
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

  buttonLeftExpose() {
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

  intervalExpose() {
    this.renderInterval();
    this.slider.append(this.interval.interval);
  }

  currentButtonAction(e) {
    let event;

    if (e instanceof MouseEvent) {
      event = e.currentTarget;
    } else {
      event = e.targetTouches[0].target;
    }

    if (this.currentValLeft.tooltipVal === event) {
      this.overridingButtons(true);
    } else {
      this.overridingButtons(false);
    }

    if (e instanceof MouseEvent) {
      document.addEventListener('mousemove', this.clickHandler);
      document.addEventListener('mouseup', this.removeMouse.bind(this));
    } else {
      document.addEventListener('touchmove', this.clickHandler);
      document.addEventListener('touchend', this.removeTouch.bind(this));
    }

    this.currentButton.ondragstart = () => false;
  }

  buttonAction(e) {
    if (e instanceof MouseEvent) {
      document.addEventListener('mousemove', this.clickHandler);
      document.addEventListener('mouseup', this.removeMouse.bind(this));
      this.currentButton = e.currentTarget;
    } else {
      document.addEventListener('touchmove', this.clickHandler);
      document.addEventListener('touchend', this.removeTouch.bind(this));
      this.currentButton = e.targetTouches[0].target;
    }

    if (this.state.range === 'one') {
      this.currentButton = this.buttonRight.button;
    }

    this.tumbler = this.currentButton === this.buttonLeft.button;

    this.currentButton.ondragstart = () => false;
  }

  removeTouch() {
    document.removeEventListener('touchmove', this.clickHandler);
    document.onmouseup = null;
  }

  removeMouse() {
    document.removeEventListener('mousemove', this.clickHandler);
    document.onmouseup = null;
  }

  installMove() {
    this.initMove(this.state.shiftLeft, this.state.shiftRight);
  }

  initMove(min, max) {
    this.overridingButtons(true);
    this.eventButton(min);
    this.overridingButtons(false);
    this.eventButton(max);
  }

  onMouseMove(e) {
    this.observerPosition(e);
    this.eventButton(this.state.step);
  }

  observerPosition(e) {
    let event;

    if (e instanceof MouseEvent) {
      event = e;
    } else {
      [event] = e.touches;
    }

    if (this.state.rotate === "horizontal") {
      this.observer.broadcast({
        ["position"]: event.clientX
      });
    } else if (this.state.rotate === "vertical") {
      this.observer.broadcast({
        ["position"]: event.clientY
      });
    }
  }

  onClickMove(e) {
    this.buttonAction(e);
    this.observerPosition(e);

    if (this.state.range === 'two') {
      this.observer.broadcast({
        ["active"]: true
      });
      this.overridingButtons(this.state.isActiveLeft);
    }

    this.resizeSlider();
    this.onMouseMove(e);
  }

  overridingButtons(bool) {
    if (bool) {
      this.currentButton = this.buttonLeft.button;
      this.tumbler = true;
    } else {
      this.currentButton = this.buttonRight.button;
      this.tumbler = false;
    }
  }

  eventButton(position) {
    let pos = position;

    if (pos <= 0) {
      pos = 0;
    } else if (pos >= 100) {
      pos = 100;
    }

    if (this.tumbler) {
      pos = this.state.shiftRight < pos ? this.state.shiftRight : pos;
      this.observer.broadcast({
        ["shiftLeft"]: pos
      });
    } else {
      pos = this.state.shiftLeft > pos ? this.state.shiftLeft : pos;
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
    if (this.tumbler) {
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
    if (this.tumbler) {
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


;// CONCATENATED MODULE: ./slider/mvp/Model/Model.ts


class Model {
  constructor(selector = 'slider-rqik') {
    this.state = {
      selector: 'slider-range',
      minValue: 0,
      maxValue: 1200,
      range: 'one',
      rotate: "horizontal",
      show: true,
      showInterval: true,
      intervalCount: 2,
      stepSize: 10,
      currentValRight: 22,
      currentValLeft: 11,
      ["shiftLeft"]: 2,
      ["shiftRight"]: 100,
      step: 0,
      isActiveLeft: false
    };
    this.percent = 0;
    this.coords = {
      x: 0,
      y: 0,
      height: 0,
      width: 0
    };
    this.state.selector = selector;
    this.observer = new EventObserver();
  }

  get stateCurrent() {
    return this.state;
  }

  edit(key) {
    this.state = Object.assign(Object.assign({}, this.state), key);
    this.observer.broadcast(this.stateCurrent);
  }

  editState(data) {
    switch (Object.keys(data)[0]) {
      case "shiftLeft":
        this.edit(data);
        this.leftVal();
        break;

      case "shiftRight":
        this.edit(data);
        this.rightVal();
        break;

      case "position":
        this.step(+data["position"]);
        break;

      case "coordinates":
        this.updateCoordinate(data["coordinates"]);
        break;

      case "active":
        this.activeButton();
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

  convertToNumber() {
    this.state.minValue = Model.convertCorrectNumber(this.state.minValue);
    this.state.maxValue = Model.convertCorrectNumber(this.state.maxValue);
    this.state.intervalCount = Model.convertCorrectNumber(this.state.intervalCount);
    this.state.stepSize = Model.convertCorrectNumber(this.state.stepSize);
    this.state.currentValRight = Model.convertCorrectNumber(this.state.currentValRight);
    this.state.currentValLeft = Model.convertCorrectNumber(this.state.currentValLeft);
    this.state.shiftLeft = (this.state.currentValLeft - this.state.minValue) / (this.state.maxValue - this.state.minValue) * 100;
    this.state.shiftRight = (this.state.currentValRight - this.state.minValue) / (this.state.maxValue - this.state.minValue) * 100;
    this.state.shiftRight = Number.isFinite(this.state.shiftRight) ? Model.transformRange(this.state.shiftRight) : 0;
    this.state.shiftLeft = Number.isFinite(this.state.shiftLeft) ? Model.transformRange(this.state.shiftLeft) : 0;
  }

  updateCoordinate(coords) {
    this.coords = Object.assign(Object.assign({}, this.coords), coords);
  }

  step(position) {
    const percent = this.mathPercent(position);

    if (this.state.stepSize > 0) {
      this.state.step = this.mathStepCount(percent);
    } else {
      this.state.step = percent;
    }
  }

  activeButton() {
    this.state.isActiveLeft = Math.abs(this.state.shiftLeft - this.state.step) < Math.abs(this.state.shiftRight - this.state.step);

    if (this.state["shiftLeft"] === this.state["shiftRight"]) {
      this.state.isActiveLeft = this.state.step < this.state.shiftRight;

      if (this.state.step <= 0) {
        this.state.isActiveLeft = false;
      }

      if (this.state.step >= 100) {
        this.state.isActiveLeft = true;
      }
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

  fixedCount() {
    let res = 12;
    const str = this.state.stepSize.toString();

    if (str.includes('.')) {
      res = str.split('.').pop().length;
    }

    return res;
  }

  leftVal() {
    const res = (this.state.maxValue - this.state.minValue) * this.state.shiftLeft / 100 + this.state.minValue;
    this.state.currentValLeft = +res.toFixed(this.fixedCount());
  }

  rightVal() {
    const res = (this.state.maxValue - this.state.minValue) * this.state.shiftRight / 100 + this.state.minValue;
    this.state.currentValRight = +res.toFixed(this.fixedCount());
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
    let pos = num;

    if (pos <= 0) {
      pos = 0;
    } else if (pos >= 100) {
      pos = 100;
    }

    return pos;
  }

}


;// CONCATENATED MODULE: ./slider/mvp/Presenter/Presenter.ts



class Present {
  constructor(selector) {
    this.selector = selector;
    this.subFunctionModel = this.setStateModel.bind(this);
    this.subFunctionView = this.setStateView.bind(this);
    this.model = new Model(selector);
    this.view = new View(this.model.stateCurrent);
    this.rotate = this.model.stateCurrent.rotate;
    this.init();
  }

  state() {
    return this.model.stateCurrent;
  }

  setStateModel(data) {
    this.model.editState(data);
  }

  setStateView() {
    this.view.editView(this.model.stateCurrent);
  }

  init() {
    this.model.observer.subscribe(this.subFunctionView);
    this.view.observer.subscribe(this.subFunctionModel);
    this.view.render();
  }

  sliderMode(options) {
    this.model.editMode(options);
    this.view.editView(this.model.stateCurrent);

    if (this.rotate !== this.model.stateCurrent.rotate) {
      this.rotate = this.model.stateCurrent.rotate;
      this.view.observer.unsubscribe(this.subFunctionModel);
      this.model.observer.unsubscribe(this.subFunctionView);
    }

    this.init();
  }

}


;// CONCATENATED MODULE: ./slider/Slider.ts
/* provided dependency */ var jQuery = __webpack_require__(638);


(function ($) {
  $.fn.sliderRqik = function (options) {
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
    pr.sliderMode(opt);
    this.presents = pr;
    return this;
  }

  data(data) {
    if (this.presents) {
      this.presents.sliderMode(data);
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, [638], () => (__webpack_require__(42)))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;