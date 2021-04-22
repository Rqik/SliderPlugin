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
    this.inputChange('currentVal2', this.slider.getData()[0].currentVal2);
    this.inputChange('currentVal1', this.slider.getData()[0].currentVal1);
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
    this.runChange('currentVal1');
    this.runChange('currentVal2');
    this.runChange('round');
    this.runChange('intervalCount');
    this.runChange('stepSize');
    this.runChange('stepSizePercent');
    this.checkChange('rotate', ['vertical', 'horizontal']);
    this.checkChange('showInterval', [true, false]);
    this.checkChange('show', [true, false]);
    this.checkChange('range', ['two', 'one']);
  }

}


;// CONCATENATED MODULE: ./demo/demo.ts
/* provided dependency */ var demo_$ = __webpack_require__(638);




__webpack_require__(606);

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
  range: 'one'
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

/***/ 606:
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

  valueInterval(minValue, maxValue, count, round) {
    this.interval.textContent = '';

    if (count <= 0) {
      return this.interval;
    }

    const interval = (maxValue - minValue) / count;
    let sum;

    for (let i = 0; i <= count; i += 1) {
      const li = document.createElement('li');
      li.className = "interval-point__item";
      sum = Math.round((i * interval + minValue) * Math.pow(10, round)) / Math.pow(10, round);
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


;// CONCATENATED MODULE: ./slider/mvp/View/CurrentVal/CurrentVal.ts
class CurrentValue {
  constructor(orientation) {
    this.orientation = orientation;
    this.currentVal = document.createElement('div');
    this.size = 10;
    this.init();
  }

  init() {
    this.currentVal.className = "slider-range__current-value";
  }

  text(text) {
    this.currentVal.textContent = `${text}`;
  }

  position(position) {
    if (this.orientation === "horizontal") {
      this.positionHorizontal(position);
    } else if (this.orientation === "vertical") {
      this.positionVertical(position);
    }
  }

  positionHorizontal(shiftX) {
    this.currentVal.style.top = `${-(+this.currentVal.offsetHeight + 10)}px`;
    this.currentVal.style.left = `calc(${shiftX}% - ${this.currentVal.offsetWidth / 2}px)`;
  }

  positionVertical(shiftX) {
    this.currentVal.style.top = `calc(${shiftX}% - ${this.currentVal.offsetHeight / 2}px)`;
    this.currentVal.style.left = `${-(+this.currentVal.offsetWidth + 15)}px`;
  }

  setRotate(orientation) {
    this.orientation = orientation;
  }

  rectLeft() {
    const clientRect = this.currentVal.getBoundingClientRect();

    if (this.orientation === "horizontal") {
      return clientRect.left;
    }

    return clientRect.top;
  }

  rectRight() {
    const clientRect = this.currentVal.getBoundingClientRect();

    if (this.orientation === "horizontal") {
      return clientRect.right;
    }

    return clientRect.bottom;
  }

  fixedSize(bool) {
    if (!bool) {
      this.size = this.rectLeft();
    }
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
    this.observers.push(fn);
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
    this.currentValLeft = new CurrentValue(this.state.rotate);
    this.currentValRight = new CurrentValue(this.state.rotate);
    this.currentVal = new CurrentValue(this.state.rotate);
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
    this.currentVal.setRotate(this.state.rotate);
  }

  renderInterval() {
    this.interval.valueInterval(this.state.minValue, this.state.maxValue, this.state.intervalCount, this.state.round);
  }

  addElem() {
    this.sliderRange.append(this.buttonRight.button);
    this.slider.append(this.sliderRange);
  }

  addAction() {
    this.buttonRight.addEvent('mousedown', this.mouseDownHandler);
    this.buttonRight.addEvent('touchstart', this.mouseDownHandler);
    this.currentValRight.currentVal.addEventListener('mousedown', this.currentValHandler);
    this.currentValRight.currentVal.addEventListener('touchstart', this.currentValHandler);

    if (this.state.range === 'two') {
      this.buttonLeft.addEvent('mousedown', this.mouseDownHandler);
      this.buttonLeft.addEvent('touchstart', this.mouseDownHandler);
      this.currentValLeft.currentVal.addEventListener('touchstart', this.currentValHandler);
      this.currentValLeft.currentVal.addEventListener('mousedown', this.currentValHandler);
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
      this.currentValRight.currentVal.style.opacity = '1';
      this.sliderRange.append(this.currentValRight.currentVal);
    } else {
      this.currentVal.currentVal.remove();
      this.currentValLeft.currentVal.remove();
      this.currentValRight.currentVal.remove();
    }
  }

  buttonLeftExpose() {
    this.sliderRange.append(this.buttonLeft.button);

    if (this.state.show) {
      this.currentValLeft.currentVal.style.opacity = '1';
      this.sliderRange.append(this.currentValLeft.currentVal);
    }
  }

  buttonLeftRemove() {
    this.currentVal.currentVal.remove();
    this.buttonLeft.button.remove();
    this.currentValLeft.currentVal.remove();
    this.observer.broadcast({
      ["shiftXl"]: 0
    });
  }

  intervalExpose() {
    this.renderInterval();
    this.slider.append(this.interval.interval);
  }

  currentButtonAction(e) {
    let event;

    if (e instanceof TouchEvent) {
      event = e.targetTouches[0].target;
    } else {
      event = e.currentTarget;
    }

    if (this.currentValLeft.currentVal === event) {
      this.overridingButtons(true);
    } else {
      this.overridingButtons(false);
    }

    if (e instanceof TouchEvent) {
      document.addEventListener('touchmove', this.clickHandler);
      document.addEventListener('touchend', this.remove.bind(this));
    } else {
      document.addEventListener('mousemove', this.clickHandler);
      document.addEventListener('mouseup', this.remove.bind(this));
    }

    this.currentButton.ondragstart = () => false;
  }

  buttonAction(e) {
    if (e instanceof TouchEvent) {
      document.addEventListener('touchmove', this.clickHandler);
      document.addEventListener('touchend', this.remove.bind(this));
      this.currentButton = e.targetTouches[0].target;
    } else {
      document.addEventListener('mousemove', this.clickHandler);
      document.addEventListener('mouseup', this.remove.bind(this));
      this.currentButton = e.currentTarget;
    }

    if (this.state.range === 'one') {
      this.currentButton = this.buttonRight.button;
    }

    this.tumbler = this.currentButton === this.buttonLeft.button;

    this.currentButton.ondragstart = () => false;
  }

  remove() {
    document.removeEventListener('mousemove', this.clickHandler);
    document.onmouseup = null;
  }

  installMove() {
    this.initMove(this.state.shiftXl, this.state.shiftXr);
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

    if (e instanceof TouchEvent) {
      [event] = e.touches;
    } else {
      event = e;
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
      this.overridingButtons(this.state.activeLeft);
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
      pos = this.state.shiftXr < pos ? this.state.shiftXr : pos;
      this.observer.broadcast({
        ["shiftXl"]: pos
      });
    } else {
      pos = this.state.shiftXl > pos ? this.state.shiftXl : pos;
      this.observer.broadcast({
        ["shiftXr"]: pos
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
      this.currentValLeft.text(this.state.currentVal2);
    } else {
      this.currentValRight.text(this.state.currentVal1);
    }
  }

  responsiveCurrent(oneCurrent) {
    if (oneCurrent) {
      this.sliderRange.append(this.currentVal.currentVal);
      this.currentValLeft.currentVal.style.opacity = '0';
      this.currentValRight.currentVal.style.opacity = '0';
      this.currentVal.currentVal.style.opacity = '1';
      this.currentVal.currentVal.style.display = 'block';

      if (this.state.currentVal2 === this.state.currentVal1) {
        this.currentVal.text(`${this.state.currentVal2}`);
      } else {
        this.currentVal.text(`${this.state.currentVal2} - ${+this.state.currentVal1}`);
      }

      this.currentVal.position((this.state.shiftXr + this.state.shiftXl) / 2);
    } else {
      this.currentVal.currentVal.style.opacity = '0';
      this.currentVal.currentVal.style.display = 'none';
      this.currentValLeft.currentVal.style.opacity = '1';
      this.currentValRight.currentVal.style.opacity = '1';
    }
  }

  showCurrentValue() {
    if (this.tumbler) {
      this.currentValLeft.position(this.state.shiftXl);
    } else {
      this.currentValRight.position(this.state.shiftXr);
    }
  }

  activeZoneAction() {
    if (this.state.shiftXl > this.state.shiftXr) {
      this.slideClass.activeZone(this.state.shiftXr, this.state.shiftXl);
    } else {
      this.slideClass.activeZone(this.state.shiftXl, this.state.shiftXr);
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
      stepSizePercent: 0,
      stepSize: 10,
      currentVal1: 22,
      currentVal2: 11,
      round: 1,
      ["shiftXl"]: 2,
      ["shiftXr"]: 100,
      step: 0,
      activeLeft: false
    };
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
      case "shiftXl":
        this.edit(data);
        this.leftVal();
        break;

      case "shiftXr":
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
    this.edit(key);
    this.state.minValue = Number(this.state.minValue);
    this.state.maxValue = Number(this.state.maxValue);
    this.state.intervalCount = Number(this.state.intervalCount);
    this.state.stepSize = Number(this.state.stepSize);
    this.state.stepSizePercent = Number(this.state.stepSizePercent);
    this.state.currentVal1 = Number(this.state.currentVal1);
    this.state.currentVal2 = Number(this.state.currentVal2);
    this.state.round = Number(this.state.round);
    this.state.shiftXl = (this.state.currentVal2 - this.state.minValue) / (this.state.maxValue - this.state.minValue) * 100;
    this.state.shiftXr = (this.state.currentVal1 - this.state.minValue) / (this.state.maxValue - this.state.minValue) * 100;
  }

  updateCoordinate(coords) {
    this.coords = Object.assign(Object.assign({}, this.coords), coords);
  }

  step(position) {
    const percent = this.mathPercent(position);

    if (this.state.stepSize) {
      this.state.step = this.mathStepCount(percent);
    } else if (this.state.stepSizePercent) {
      this.state.step = this.mathStepPercent(percent);
    } else {
      this.state.step = percent;
    }
  }

  activeButton() {
    this.state.activeLeft = Math.abs(this.state.shiftXl - this.state.step) < Math.abs(this.state.shiftXr - this.state.step);

    if (this.state.shiftXl === this.state.shiftXr) {
      this.state.activeLeft = this.state.step < this.state.shiftXr;
    }
  }

  mathPercent(num) {
    if (this.state.rotate === "horizontal") {
      return (num - this.coords.x) / this.coords.width * 100;
    }

    return (num - this.coords.y) / this.coords.height * 100;
  }

  mathStepCount(num) {
    const precent = this.state.stepSize / (this.state.maxValue + Math.abs(this.state.minValue)) * 100;
    return Math.round(num / precent) * precent;
  }

  mathStepPercent(num) {
    return Math.round(num / this.state.stepSizePercent) * this.state.stepSizePercent;
  }

  leftVal() {
    const t = this.state;
    const res = (t.maxValue - t.minValue) * t.shiftXl / 100 + t.minValue;
    t.currentVal2 = Math.round(res * Math.pow(10, t.round)) / Math.pow(10, t.round);
  }

  rightVal() {
    const t = this.state;
    const res = Number((t.maxValue - t.minValue) * t.shiftXr / 100 + t.minValue);
    t.currentVal1 = Number(Math.round(res * Math.pow(10, t.round)) / Math.pow(10, t.round));
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
    this.view.observer.subscribe(this.subFunctionModel);
    this.model.observer.subscribe(this.subFunctionView);
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
    $('.js-slider-rqik').sliderRqik();
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
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
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
/******/ 	// the startup function
/******/ 	// It's empty as some runtime module handles the default behavior
/******/ 	__webpack_require__.x = x => {};
/************************************************************************/
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
/******/ 		// Promise = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			179: 0
/******/ 		};
/******/ 		
/******/ 		var deferredModules = [
/******/ 			[42,638]
/******/ 		];
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
/******/ 		var checkDeferredModules = x => {};
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime, executeModules] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0, resolves = [];
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					resolves.push(installedChunks[chunkId][0]);
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			for(moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) runtime(__webpack_require__);
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			while(resolves.length) {
/******/ 				resolves.shift()();
/******/ 			}
/******/ 		
/******/ 			// add entry modules from loaded chunk to deferred list
/******/ 			if(executeModules) deferredModules.push.apply(deferredModules, executeModules);
/******/ 		
/******/ 			// run deferred modules when all chunks ready
/******/ 			return checkDeferredModules();
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = globalThis["webpackChunk"] = globalThis["webpackChunk"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 		
/******/ 		function checkDeferredModulesImpl() {
/******/ 			var result;
/******/ 			for(var i = 0; i < deferredModules.length; i++) {
/******/ 				var deferredModule = deferredModules[i];
/******/ 				var fulfilled = true;
/******/ 				for(var j = 1; j < deferredModule.length; j++) {
/******/ 					var depId = deferredModule[j];
/******/ 					if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferredModules.splice(i--, 1);
/******/ 					result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 				}
/******/ 			}
/******/ 			if(deferredModules.length === 0) {
/******/ 				__webpack_require__.x();
/******/ 				__webpack_require__.x = x => {};
/******/ 			}
/******/ 			return result;
/******/ 		}
/******/ 		var startup = __webpack_require__.x;
/******/ 		__webpack_require__.x = () => {
/******/ 			// reset startup function so it can be called again when more startup code is added
/******/ 			__webpack_require__.x = startup || (x => {});
/******/ 			return (checkDeferredModules = checkDeferredModulesImpl)();
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// run startup
/******/ 	var __webpack_exports__ = __webpack_require__.x();
/******/ 	
/******/ })()
;