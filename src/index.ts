import { data } from 'jquery';
import { rotate } from './js/interface';

import './assets/main.scss';

import './js/View/subView';

require('./js/Slider/slider');

$('.plug').sliderRqik();
const plug1 = $('.plug1').sliderRqik({
  rotate: 'vertical',
  maxValue: 1000,
  range: ' two ',
});

runChange($('#form1'), 'maxValue', plug1);
runChange($('#form1'), 'minValue', plug1);
runChange($('#form1'), 'currentVal1', plug1);
runChange($('#form1'), 'currentVal2', plug1);
runChange($('#form1'), 'round', plug1);

const plug2 = $('.plug2').sliderRqik({
  rotate: 'vertical',
  range: 'one',
  minValue: -100,
});
runChange($('#form2'), 'intervalCount', plug2);
runChange($('#form2'), 'stepSize', plug2);
runChange($('#form2'), 'stepSizePerc', plug2);

const plug3 = $('.plug3').sliderRqik();
const plug4 = $('.plug4').sliderRqik();
// plug3.data({ currentVal1: 50, maxValue: 1122 });

$('.plug1').on('click', () => {
  inputChange($('#form1'), 'currentVal2', plug1.getData()[0].currentVal2);
  inputChange($('#form1'), 'currentVal1', plug1.getData()[0].currentVal1);
});

checkChange($('#form3'), 'rotate', ['vertical', 'horizontal'], plug3);
checkChange($('#form3'), 'showInterval', [true, false], plug3);
checkChange($('#form3'), 'show', [true, false], plug3);
checkChange($('#form3'), 'range', ['two', 'one'], plug3);

checkChange($('#form4'), 'rotate', ['vertical', 'horizontal'], plug4);
checkChange($('#form4'), 'showInterval', [true, false], plug4);
checkChange($('#form4'), 'show', [true, false], plug4);
checkChange($('#form4'), 'range', ['two', 'one'], plug4);

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
