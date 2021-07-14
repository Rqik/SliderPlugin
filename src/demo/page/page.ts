import { InputChecker } from '../InputChecker/InputChecker';
import '../styles/main.scss';
import './page.scss';

require('../../slider/slider.ts');

const $plug1 = $('.js-plug1').sliderRqik();
const $plug2 = $('.js-plug2').sliderRqik();
const $plug3 = $('.js-plug3').sliderRqik();
const $plug4 = $('.js-plug4').sliderRqik();
const $form1 = $('#form1');
const $form2 = $('#form2');
const $form3 = $('#form3');
const $form4 = $('#form4');

new InputChecker({
  $form: $form1,
  $sliderDOM: $plug1,
  classRotate: 'slider_vertical',
}).init();
new InputChecker({
  $form: $form2,
  $sliderDOM: $plug2,
  classRotate: 'slider_vertical',
}).init();
new InputChecker({
  $form: $form3,
  $sliderDOM: $plug3,
  classRotate: 'slider_vertical',
}).init();
new InputChecker({
  $form: $form4,
  $sliderDOM: $plug4,
  classRotate: 'slider_vertical',
}).init();
