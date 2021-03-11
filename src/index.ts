/* eslint-disable fsd/no-function-declaration-in-event-listener */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import './assets/main.scss';
import './js/View/SubView.ts';
import { inputChange, actionForm } from './js/utils';

require('./js/Slider/slider.ts');

const $plug1 = $('.js-plug1');
const $plug2 = $('.js-plug2');
const $plug3 = $('.js-plug3');
const $plug4 = $('.js-plug4');

const $form1 = $('#form1');
const $form2 = $('#form2');
const $form3 = $('#form3');
const $form4 = $('#form4');

const plug1 = $plug1.sliderRqik({
  rotate: 'horizontal',
  maxValue: 1000,
  range: 'one',
});

const plug2 = $plug2.sliderRqik({
  rotate: 'vertical',
  range: 'one',
  minValue: -100,
});

const plug3 = $plug3.sliderRqik();

const plug4 = $plug4.sliderRqik();

const $input1 = $form1.find("input[name='rotate']");

const $input2 = $form2.find("input[name='rotate']");
const $input3 = $form3.find("input[name='rotate']");
const $input4 = $form4.find("input[name='rotate']");

addClassForm($input1, $plug1, 'slider_vertical');
addClassForm($input2, $plug2, 'slider_vertical');
addClassForm($input3, $plug3, 'slider_vertical');
addClassForm($input4, $plug4, 'widt30');

function addClassForm($input: JQuery, $elem: JQuery, className: string) {
  $input.click(() => {
    if ($input.is(':checked')) {
      $elem.addClass(className);
    } else {
      $elem.removeClass(className);
    }
  });
}

actionForm($form1, plug1);

actionForm($form2, plug2);

actionForm($form3, plug3);

actionForm($form4, plug4);

$plug1.on('click', () => {
  inputChange($form1, 'currentVal2', plug1.getData()[0].currentVal2);
  inputChange($form1, 'currentVal1', plug1.getData()[0].currentVal1);
});

$plug2.on('click', () => {
  inputChange($form2, 'currentVal2', plug2.getData()[0].currentVal2);
  inputChange($form2, 'currentVal1', plug2.getData()[0].currentVal1);
});

$plug3.on('click', () => {
  inputChange($form3, 'currentVal2', plug3.getData()[0].currentVal2);
  inputChange($form3, 'currentVal1', plug3.getData()[0].currentVal1);
});

$plug4.on('click', () => {
  inputChange($form4, 'currentVal2', plug4.getData()[0].currentVal2);
  inputChange($form4, 'currentVal1', plug4.getData()[0].currentVal1);
});
