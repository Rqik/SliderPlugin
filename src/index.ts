import './assets/main.scss';

import './js/View/subView';

require('./js/Slider/slider');

$('.plug').sliderRqik();
const plug1 = $('.plug1').sliderRqik({
  rotate: 'vertical',
  maxValue: 1000,
  range: ' two ',
});

const plug2 = $('.plug2').sliderRqik({
  rotate: 'vertical',
  range: 'one',
  minValue: -100,
});

const plug3 = $('.plug3').sliderRqik();
const plug4 = $('.plug4').sliderRqik();

actionForm($('#form1'), plug1);
actionForm($('#form2'), plug2);
actionForm($('#form3'), plug3);
actionForm($('#form4'), plug4);

$('.plug1').on('click', () => {
  inputChange($('#form1'), 'currentVal2', plug1.getData()[0].currentVal2);
  inputChange($('#form1'), 'currentVal1', plug1.getData()[0].currentVal1);
});

$('.plug2').on('click', () => {
  inputChange($('#form2'), 'currentVal2', plug2.getData()[0].currentVal2);
  inputChange($('#form2'), 'currentVal1', plug2.getData()[0].currentVal1);
});

$('.plug3').on('click', () => {
  inputChange($('#form3'), 'currentVal2', plug3.getData()[0].currentVal2);
  inputChange($('#form3'), 'currentVal1', plug3.getData()[0].currentVal1);
});

$('.plug4').on('click', () => {
  inputChange($('#form4'), 'currentVal2', plug4.getData()[0].currentVal2);
  inputChange($('#form4'), 'currentVal1', plug4.getData()[0].currentVal1);
});

function checkChange(elem: JQuery, nameAtr: string, value: any, plugItem: any) {
  elem.find(`input[name='${nameAtr}']`).on('click', function () {
    if ($(this).prop('checked')) {
      plugItem.data({
        [nameAtr]: value[0],
      });
    } else {
      plugItem.data({
        [nameAtr]: value[1],
      });
    }
  });
}

function inputChange(elem: JQuery, nameAtr: string, value: any) {
  elem.find(`input[name='${nameAtr}']`).val(value);
  console.log(value);
}

function runChange(elem: JQuery, nameAtr: string, plugItem: any) {
  elem.find(`input[name='${nameAtr}']`).on('input', function () {
    if ($(this).val() == '-') {
      return;
    }
    plugItem.data({
      [nameAtr]: $(this).val(),
    });
  });
  plugItem.data({
    [nameAtr]: elem.find(`input[name='${nameAtr}']`).val(),
  });
}
function actionForm(form: JQuery, el: any) {
  runChange(form, 'maxValue', el);
  runChange(form, 'minValue', el);
  runChange(form, 'currentVal1', el);
  runChange(form, 'currentVal2', el);
  runChange(form, 'round', el);
  runChange(form, 'intervalCount', el);
  runChange(form, 'stepSize', el);
  runChange(form, 'stepSizePerc', el);

  checkChange(form, 'rotate', ['vertical', 'horizontal'], el);
  checkChange(form, 'showInterval', [true, false], el);
  checkChange(form, 'show', [true, false], el);
  checkChange(form, 'range', ['two', 'one'], el);
}
