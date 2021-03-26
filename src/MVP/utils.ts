/* eslint-disable fsd/no-function-declaration-in-event-listener */
import {IState, StateEl} from './Interface';

interface Slider {
  data: (opt: StateEl) => Slider;
  getData: () => IState[];
}

/* eslint-disable func-names */
function checkChange(
  elem: JQuery,
  nameAtr: string,
  value: (string | number | boolean)[],
  plugItem: Slider,
): void {
  const item = elem.find(`input[name='${nameAtr}']`);

  item.on('click', function () {
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
  if (item.prop('checked')) {
    plugItem.data({
      [nameAtr]: value[0],
    });
  } else {
    plugItem.data({
      [nameAtr]: value[1],
    });
  }
}

function inputChange(
  elem: JQuery,
  nameAtr: string,
  value: string | number,
): void {
  elem.find(`input[name='${nameAtr}']`).val(value);
}

function runChange(elem: JQuery, nameAtr: string, plugItem: Slider): void {
  const item = elem.find(`input[name='${nameAtr}']`);
  let val = item.val() || 0;
  item.on('input', () => {
    val = item.val() || 0;
    if (val === '-') {
      return;
    }
    plugItem.data({[nameAtr]: +val});
  });
  if (val !== '-' || val !== undefined) {
    plugItem.data({
      [nameAtr]: +val,
    });
  }
}

function actionForm(form: JQuery, el: Slider): void {
  runChange(form, 'maxValue', el);
  runChange(form, 'minValue', el);
  runChange(form, 'currentVal1', el);
  runChange(form, 'currentVal2', el);
  runChange(form, 'round', el);
  runChange(form, 'intervalCount', el);
  runChange(form, 'stepSize', el);
  runChange(form, 'stepSizePercent', el);

  checkChange(form, 'rotate', ['vertical', 'horizontal'], el);
  checkChange(form, 'showInterval', [true, false], el);
  checkChange(form, 'show', [true, false], el);
  checkChange(form, 'range', ['two', 'one'], el);
}

export {checkChange, inputChange, runChange, actionForm};
