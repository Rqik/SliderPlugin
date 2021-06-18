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

const plug1 = $plug1.sliderRqik({
  maxValue: 1000,
  range: 'one',
  showInterval: true,
});

const plug2 = $plug2.sliderRqik({
  rotate: 'vertical',
  range: 'one',
  minValue: -100,
});

const plug3 = $plug3.sliderRqik();

const plug4 = $plug4.sliderRqik();

new InputChecker($form1, $plug1, plug1, 'slider_vertical').init();
new InputChecker($form2, $plug2, plug2, 'slider_vertical').init();
new InputChecker($form3, $plug3, plug3, 'slider_vertical').init();
new InputChecker($form4, $plug4, plug4, 'slider_vertical').init();
