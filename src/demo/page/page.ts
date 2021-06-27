import { InputChecker } from '../InputChecker/InputChecker';
import '../styles/main.scss';
import './page.scss';

require('../../slider/Slider.ts');

const $plug1 = $('.js-plug1');
const $plug2 = $('.js-plug2');
const $plug3 = $('.js-plug3');
const $plug4 = $('.js-plug4');

const $form1 = $('#form1');
const $form2 = $('#form2');
const $form3 = $('#form3');
const $form4 = $('#form4');

const plug1 = $plug1.sliderRqik();

const plug2 = $plug2.sliderRqik();

const plug3 = $plug3.sliderRqik();

const plug4 = $plug4.sliderRqik();

new InputChecker({
  $form: $form1,
  $sliderDOM: $plug1,
  slider: plug1,
  classRotate: 'slider_vertical',
}).init();
new InputChecker({
  $form: $form2,
  $sliderDOM: $plug2,
  slider: plug2,
  classRotate: 'slider_vertical',
}).init();
new InputChecker({
  $form: $form3,
  $sliderDOM: $plug3,
  slider: plug3,
  classRotate: 'slider_vertical',
}).init();
new InputChecker({
  $form: $form4,
  $sliderDOM: $plug4,
  slider: plug4,
  classRotate: 'slider_vertical',
}).init();
