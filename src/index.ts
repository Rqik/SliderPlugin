import { rotate } from "./js/interface";
import { data } from "jquery";
require("./js/Slider/slider");
import "./assets/main.scss";

import "./js/View/subView";

let plug1 = $(".plug1").sliderRqik({
  rotate: "vertical",
  maxValue: 1000,
  range: "two",
});

runChange($("#form1"), "maxValue", plug1);
runChange($("#form1"), "minValue", plug1);
runChange($("#form1"), "currentVal1", plug1);
runChange($("#form1"), "currentVal2", plug1);
runChange($("#form1"), "round", plug1);

let plug2 = $(".plug2").sliderRqik({rotate: "vertical",range: "one" , minValue: -100});
runChange($("#form2"), "intervalCount", plug2);
runChange($("#form2"), "stepSize", plug2);
runChange($("#form2"), "stepSizePerc", plug2);

let plug3 = $(".plug3").sliderRqik();
plug3.data({ currentVal1: 50, maxValue: 1122 });
// runChange($("#form2") , 'currentVal2' , plug2)
//{range: 'one'}

$(".plug1").on("click", function () {
  inputChange(
    $("#form1"),
    "currentVal2",
    plug1.getData()[0][0].model.stateCurrent.currentVal2
  );
  inputChange(
    $("#form1"),
    "currentVal1",
    plug1.getData()[0][0].model.stateCurrent.currentVal1
  );
});

// $("#form3")
//   .find(`input[name='rotate']`)
//   .on("click", function () {
//     if ($(this).prop("checked")) {
//       plug3.data({ rotate: "horizontal" });
//     } else {
//       plug3.data({ rotate: "vertical" });
//     }
//   });

checkChange($("#form3"), "rotate", ["vertical", "horizontal"], plug3);
checkChange($("#form3"), "showInterval", [true, false], plug3);
checkChange($("#form3"), "show", [true, false], plug3);
checkChange($("#form3"), "range", [ 'two' , 'one'], plug3);

function checkChange(elem: JQuery, nameAtr: string, value: any, plugItem: any) {
  elem.find(`input[name='${nameAtr}']`).on("click", function () {
    if ($(this).prop("checked")) {
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
  elem.find(`input[name='${nameAtr}']`).on("input", function () {
    if ($(this).val() == "-") {
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
