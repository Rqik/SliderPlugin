(()=>{"use strict";var t={362:(t,e,i)=>{function s(t){return(s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function n(t,e,i){var n=i.value;if("function"!=typeof n)throw new TypeError("@boundMethod decorator can only be applied to methods not: ".concat(s(n)));var o=!1;return{configurable:!0,get:function(){if(o||this===t.prototype||this.hasOwnProperty(e)||"function"!=typeof n)return n;var i=n.bind(this);return o=!0,Object.defineProperty(this,e,{configurable:!0,get:function(){return i},set:function(t){n=t,delete this[e]}}),o=!1,i},set:function(t){n=t}}}i.d(e,{MR:()=>n})},544:(t,e,i)=>{i.r(e);var s=i(362);class n{constructor(){this.observers=[]}subscribe(t){this.observers.some((e=>e===t))||this.observers.push(t)}unsubscribe(t){this.observers=this.observers.filter((e=>e!==t))}broadcast(t){this.observers.forEach((e=>{"function"==typeof e&&e(t)}))}}const o={selector:"slider-rqik",min:0,max:100,range:"one",rotate:"horizontal",showTooltip:!0,showInterval:!0,intervalCount:2,stepSize:1,maxValue:10,minValue:0,shiftLeft:0,shiftRight:10,step:0,isActiveLeft:!1,intervalStep:50,widthSlider:0,heightSlider:0};class r{constructor(t="slider-rqik"){this.coords={x:0,y:0,height:0,width:0},this.state=o,this.stateKey=["selector","min","max","range","rotate","showTooltip","showInterval","stepSize","maxValue","minValue","shiftLeft","shiftRight","step","isActiveLeft","intervalStep","widthSlider","heightSlider"],this.percent=0,this.state.selector=t,this.observer=new n}get getState(){return Object.assign({},this.state)}setState(t){const e=this.getState;switch(Object.keys(t)[0]){case"isActiveLeft":"isActiveLeft"in t&&this.activeButton(t.isActiveLeft);break;case"shiftLeft":this.setStateValid(t),this.defineLeftVal();break;case"shiftRight":this.setStateValid(t),this.defineRightVal();break;case"position":"position"in t&&this.defineStep(Number(t.position));break;case"coordinates":"coordinates"in t&&this.updateCoordinate(t.coordinates);break;case"intervalAction":"intervalAction"in t&&(this.state.step=r.convertCorrectNumber(this.convertNumberInPercent(Number(t.intervalAction)))),this.setStateValid(t),this.defineLeftVal(),this.defineRightVal();break;default:this.setStateValid(t,!0)}this.notify(e,Object.keys(t)[0])}setStateValid(t,e=!1){const i=this.getState;this.state=Object.assign(Object.assign({},this.state),t),e&&this.convertToValidNumber(),Object.keys(t).forEach((t=>{this.notify(i,t)}))}notify(t,e){const i={};"position"!==e?"coordinates"!==e?(this.stateKey.forEach((e=>{t[e]!==this.getState[e]&&(i[e]=this.getState[e])})),0!==Object.keys(i).length&&this.observer.broadcast(Object.assign({},i))):this.observer.broadcast({coordinates:this.coords}):this.observer.broadcast({position:this.getState.step})}convertToValidNumber(){this.state.min=r.convertCorrectNumber(this.state.min),this.state.max=r.convertCorrectNumber(this.state.max),this.state.stepSize=r.convertCorrectNumber(this.state.stepSize),this.state.stepSize=this.state.stepSize<=0?0:this.state.stepSize,this.state.maxValue=r.convertCorrectNumber(this.state.maxValue),this.state.minValue=r.convertCorrectNumber(this.state.minValue),this.state.shiftLeft=this.validStep(this.convertNumberInPercent(this.state.minValue)),this.state.shiftRight=this.validStep(this.convertNumberInPercent(this.state.maxValue)),this.state.shiftRight=Number.isFinite(this.state.shiftRight)?r.transformRange(this.state.shiftRight):0,this.state.shiftLeft=Number.isFinite(this.state.shiftLeft)?r.transformRange(this.state.shiftLeft):0,this.state.intervalCount=this.state.intervalCount<0?0:r.convertCorrectNumber(this.state.intervalCount),this.state.intervalStep=this.defineIntervalStep()}updateCoordinate(t){this.coords=Object.assign(Object.assign({},this.coords),t)}defineStep(t){const e=this.mathPositionToPercent(t);this.state.step=this.validStep(e)}validStep(t){return t>=100||t<=0?r.transformRange(t):this.state.stepSize>0?r.transformRange(this.mathStepCount(t)):r.transformRange(t)}activeButton(t){this.state.isActiveLeft=Math.abs(this.state.shiftLeft-this.state.step)<=Math.abs(this.state.shiftRight-this.state.step),this.state.shiftLeft===this.state.shiftRight&&(this.state.isActiveLeft=this.mathPositionToPercent(t)<this.state.shiftRight,this.checkExtremePoint())}checkExtremePoint(){const t=this.state.step<=0&&this.state.shiftRight<=0,e=this.state.step>=100&&this.state.shiftLeft>=100;t&&(this.state.isActiveLeft=!1),e&&(this.state.isActiveLeft=!0)}mathPositionToPercent(t){return"horizontal"===this.state.rotate?(t-this.coords.x)/this.coords.width*100:(t-this.coords.y)/this.coords.height*100}mathStepCount(t){return 0===Math.abs(this.state.max-this.state.min)?Math.round(t/this.state.stepSize)*this.state.stepSize:(this.percent=this.state.stepSize/Math.abs(this.state.max-this.state.min)*100,this.percent=r.transformRange(this.percent),Math.round(t/this.percent)*this.percent)}static roundNumber(t){return Math.round(t*Math.pow(10,8))/Math.pow(10,8)}convertNumberInPercent(t){return(t-this.state.min)/(this.state.max-this.state.min)*100}defineLeftVal(){this.state.minValue=r.roundNumber((this.state.max-this.state.min)*this.state.shiftLeft/100+this.state.min)}defineRightVal(){this.state.maxValue=r.roundNumber((this.state.max-this.state.min)*this.state.shiftRight/100+this.state.min)}defineIntervalStep(){let t=(this.state.max-this.state.min)/this.state.intervalCount;return Math.abs(t)<this.state.stepSize?Math.sign(t)*this.state.stepSize:(this.state.stepSize&&(t=Math.round(t/this.state.stepSize)*this.state.stepSize,t=Math.round(t*Math.pow(10,8))/Math.pow(10,8)),t)}static convertCorrectNumber(t){const e=Number(t);return Number.isNaN(e)?0:Number.isFinite(e)?e:0}static transformRange(t){return t<=0?0:t>=100?100:t}}class a{constructor(){this.button=document.createElement("div"),this.widthButton=10,this.init()}addEvent(t,e){this.button.addEventListener(t,a.makeEvent(e))}width(){return this.widthButton=this.button.offsetWidth/2,this.widthButton}init(){this.button.className="slider-range__button"}static makeEvent(t){return e=>{t(e)}}}class h{constructor(t){this.orientation=t,this.element=document.createElement("div"),this.init()}text(t){this.element.textContent=`${t}`}position(t){"horizontal"===this.orientation?this.positionHorizontal(t):"vertical"===this.orientation&&this.positionVertical(t)}positionHorizontal(t){this.element.style.top=`-${this.element.getBoundingClientRect().height+10}px`,this.element.style.left=`calc(${t}% - ${this.element.offsetWidth/2}px)`}positionVertical(t){this.element.style.top=`calc(${t}% -\n    ${this.element.offsetHeight/2}px)`,this.element.style.left=`-${this.element.getBoundingClientRect().width+15}px`}setRotate(t){this.orientation=t}rectLeft(){const t=this.element.getBoundingClientRect();return"horizontal"===this.orientation?t.left:t.top}rectRight(){const t=this.element.getBoundingClientRect();return"horizontal"===this.orientation?t.right:t.bottom}init(){this.element.className="slider-range__current-value"}}class l{constructor(t){this.sliderRange=document.createElement("div"),this.sliderActiveZone=document.createElement("div"),this.rotate="horizontal",this.init(t)}edit(t){this.rotate=t,"vertical"===t?this.sliderRange.classList.add("slider-range_vertical"):this.sliderRange.classList.remove("slider-range_vertical")}activeZone(t,e){"horizontal"===this.rotate?(this.sliderActiveZone.style.left=`${t}%`,this.sliderActiveZone.style.width=e-t+"%"):(this.sliderActiveZone.style.top=`${t}%`,this.sliderActiveZone.style.height=e-t+"%")}init(t){this.sliderRange.className="slider-range",this.sliderActiveZone.className="slider-range__active-zone",this.edit(t),this.sliderRange.appendChild(this.sliderActiveZone)}}class c{constructor(){this.interval=document.createElement("ul"),this.items=[],this.rotate="horizontal",this.init()}renderIntervals({min:t,max:e,count:i,intervalStep:s}){this.interval.textContent="";let n=e,o=t;if(t>e&&([n,o]=[o,n]),i<=0)return this.interval;const r=Math.abs(e-t);let a;const h=document.createDocumentFragment(),l=new Set;return Array(i+1).fill("").forEach(((r,h)=>{a=Math.round((h*s+t)*Math.pow(10,5))/Math.pow(10,5),a>n&&(a-=t),a>n&&(a=e),a<o&&(a=t),0===h&&(a=t),h===i&&(a=e),l.add(a)})),l.forEach((e=>{const i=document.createElement("li");i.className="interval-point__item",i.innerHTML=`<div class=interval-point__item-text> ${e} </div>`;const s=100*Math.abs((e-t)/r);"horizontal"===this.rotate?i.style.left=`${s}%`:i.style.top=`${s}%`,h.append(i),this.items.push(i)})),this.interval.append(h),this.interval}edit(t){this.rotate=t,this.init()}init(){this.interval.className="interval-point","vertical"===this.rotate&&this.interval.classList.add("interval-point_vertical")}}var u=function(t,e,i,s){var n,o=arguments.length,r=o<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(r=(o<3?n(r):o>3?n(e,i,r):n(e,i))||r);return o>3&&r&&Object.defineProperty(e,i,r),r};class d{constructor(t){this.slider=document.createElement("div"),this.buttonLeft=new a,this.buttonRight=new a,this.buttonWidth=10,this.tooltipEventPosition=0,this.currentButton=this.buttonRight.button,this.isLeftOn=!1,this.coords={x:0,y:0,width:0,height:0},this.state=t,this.observer=new n,this.tooltipLeft=new h(this.state.rotate),this.tooltipRight=new h(this.state.rotate),this.tooltipGeneral=new h(this.state.rotate),this.sliderClass=new l(this.state.rotate),this.interval=new c,this.sliderRange=this.sliderClass.sliderRange,this.init(this.state.selector)}setState(t){this.state=Object.assign(Object.assign({},this.state),t),this.sliderClass.edit(this.state.rotate),this.interval.edit(this.state.rotate),this.tooltipLeft.setRotate(this.state.rotate),this.tooltipRight.setRotate(this.state.rotate),this.tooltipGeneral.setRotate(this.state.rotate)}render(){d.removeStyle(this.slider),this.show(),this.addElem(),this.addAction(),this.buttonWidth=this.buttonRight.width(),this.notifyCoords(!0),this.installMove()}init(t){this.slider=document.querySelector(t),this.slider.style.position="relative",this.render()}renderInterval(){this.interval.renderIntervals({min:this.state.min,max:this.state.max,count:this.state.intervalCount,intervalStep:this.state.intervalStep})}addElem(){this.sliderRange.append(this.buttonRight.button),this.slider.append(this.sliderRange)}addAction(){this.sliderRange.addEventListener("mousedown",this.onClickMove),this.sliderRange.addEventListener("touchstart",this.onClickMove),this.tooltipLeft.element.addEventListener("mousedown",this.handlerTooltip),this.tooltipRight.element.addEventListener("mousedown",this.handlerTooltip),this.tooltipLeft.element.addEventListener("touchstart",this.handlerTooltip),this.tooltipRight.element.addEventListener("touchstart",this.handlerTooltip),this.interval.items.forEach((t=>{t.addEventListener("mousedown",this.onClickInterval),t.addEventListener("touchstart",this.onClickInterval)})),window.addEventListener("resize",this.resizeSlider)}resizeSlider(){const{x:t,y:e,width:i,height:s}=this.slider.getBoundingClientRect(),n=i!==this.coords.width||s!==this.coords.height||t!==this.coords.x||e!==this.coords.y;this.notifyCoords(n)}notifyCoords(t){const{x:e,y:i,width:s,height:n}=this.slider.getBoundingClientRect();t&&(this.coords={x:e,y:i,width:s,height:n},this.observer.broadcast({widthSlider:this.sliderRange.offsetWidth,heightSlider:this.sliderRange.offsetHeight}),this.observer.broadcast({coordinates:{x:e,y:i,width:s,height:n}}))}static removeStyle(t){t.querySelectorAll("[style]").forEach((t=>{t.removeAttribute("style")}))}show(){"two"===this.state.range?this.buttonLeftDisplay():this.buttonLeftRemove(),this.state.showInterval?this.intervalDisplay():this.interval.interval.remove(),this.state.showTooltip?(this.tooltipRight.element.style.opacity="1",this.slider.append(this.tooltipRight.element)):(this.tooltipGeneral.element.remove(),this.tooltipLeft.element.remove(),this.tooltipRight.element.remove(),this.tooltipEventPosition=0)}buttonLeftDisplay(){this.sliderRange.append(this.buttonLeft.button),this.state.showTooltip&&(this.tooltipLeft.element.style.opacity="1",this.slider.append(this.tooltipLeft.element))}buttonLeftRemove(){this.tooltipGeneral.element.remove(),this.buttonLeft.button.remove(),this.tooltipLeft.element.remove(),this.observer.broadcast({shiftLeft:0})}intervalDisplay(){this.renderInterval(),this.slider.append(this.interval.interval)}onClickInterval(t){this.resizeSlider(),t.cancelable&&t.preventDefault();const e=t.target;this.observerPosition(t),"two"===this.state.range&&this.overridingButtons(this.state.isActiveLeft),this.observer.broadcast({intervalAction:Number(e.textContent)}),this.eventButton(this.state.step)}buttonAction(t){t.cancelable&&t.preventDefault(),t instanceof MouseEvent?(document.addEventListener("mousemove",this.onMouseMove),document.addEventListener("mouseup",this.removeMouse),this.currentButton=t.currentTarget):(document.addEventListener("touchmove",this.onMouseMove),document.addEventListener("touchend",this.removeTouch),this.currentButton=t.targetTouches[0].target),"one"===this.state.range&&(this.currentButton=this.buttonRight.button),this.isLeftOn=this.currentButton===this.buttonLeft.button,this.currentButton.ondragstart=()=>!1}handlerTooltip(t){let e;const{cordClient:i}=this.getCordClientAndEvent(t);this.resizeSlider(),t.cancelable&&t.preventDefault(),e=t instanceof MouseEvent?t.target:t.targetTouches[0].target,"horizontal"===this.state.rotate?this.tooltipEventPosition=i-e.getBoundingClientRect().left-e.offsetWidth/2:this.tooltipEventPosition=i-e.getBoundingClientRect().top-e.offsetHeight/2,this.tooltipLeft.element===e?this.overridingButtons(!0):this.overridingButtons(!1),t instanceof MouseEvent?(document.addEventListener("mousemove",this.onMouseMove),document.addEventListener("mouseup",this.removeMouse)):(document.addEventListener("touchmove",this.onMouseMove),document.addEventListener("touchend",this.removeTouch)),this.currentButton.ondragstart=()=>!1}removeTouch(){document.removeEventListener("touchmove",this.onMouseMove),document.ontouchend=null}removeMouse(){document.removeEventListener("mousemove",this.onMouseMove),document.onmouseup=null}installMove(){this.initMove(this.state.shiftLeft,this.state.shiftRight)}initMove(t,e){this.overridingButtons(!0),this.eventButton(t),this.overridingButtons(!1),this.eventButton(e)}onMouseMove(t){this.observerPosition(t),this.eventButton(this.state.step)}observerPosition(t){const{cordClient:e,event:i}=this.getCordClientAndEvent(t),{target:s}=i;s!==this.tooltipRight.element&&s!==this.tooltipLeft.element&&(this.tooltipEventPosition=0),this.observer.broadcast({position:e-this.tooltipEventPosition}),"two"===this.state.range&&this.observer.broadcast({isActiveLeft:e-this.tooltipEventPosition})}getCordClientAndEvent(t){let e,i=0;return t instanceof MouseEvent?e=t:[e]=t.touches,"horizontal"===this.state.rotate&&(i=e.clientX),"vertical"===this.state.rotate&&(i=e.clientY),{event:e,cordClient:i}}onClickMove(t){let e;this.resizeSlider(),t.cancelable&&t.preventDefault(),this.buttonAction(t),this.observerPosition(t),"two"===this.state.range&&this.overridingButtons(this.state.isActiveLeft),e=t instanceof MouseEvent?t.target:t.targetTouches[0].target;e===this.buttonRight.button||e===this.buttonLeft.button||this.eventButton(this.state.step)}overridingButtons(t){t?(this.currentButton=this.buttonLeft.button,this.isLeftOn=!0):(this.currentButton=this.buttonRight.button,this.isLeftOn=!1)}eventButton(t){let e=t;this.isLeftOn?(e=this.state.shiftRight<e?this.state.shiftRight:e,this.observer.broadcast({shiftLeft:e})):(e=this.state.shiftLeft>e?this.state.shiftLeft:e,this.observer.broadcast({shiftRight:e})),this.moveButton(e)}moveButton(t){if("horizontal"===this.state.rotate?(this.currentButton.style.left=`calc(${t}% - ${this.buttonWidth}px)`,this.currentButton.style.top=-this.state.heightSlider+"px"):"vertical"===this.state.rotate&&(this.currentButton.style.left=-this.state.widthSlider+"px",this.currentButton.style.top=`calc(${t}% - ${this.buttonWidth}px)`),this.state.showTooltip&&(this.currentValueText(),this.showCurrentValue(),"two"===this.state.range)){const t=this.tooltipLeft.rectRight()>this.tooltipRight.rectLeft();this.responsiveCurrent(t)}this.activeZoneAction()}currentValueText(){this.isLeftOn?this.tooltipLeft.text(this.state.minValue):this.tooltipRight.text(this.state.maxValue)}responsiveCurrent(t){t?(this.sliderRange.append(this.tooltipGeneral.element),this.tooltipLeft.element.style.opacity="0",this.tooltipRight.element.style.opacity="0",this.tooltipGeneral.element.style.opacity="1",this.tooltipGeneral.element.style.display="block",this.state.minValue===this.state.maxValue?this.tooltipGeneral.text(`${this.state.minValue}`):this.tooltipGeneral.text(`${this.state.minValue} — ${+this.state.maxValue}`),this.tooltipGeneral.position((this.state.shiftRight+this.state.shiftLeft)/2)):(this.tooltipGeneral.element.style.opacity="0",this.tooltipGeneral.element.style.display="none",this.tooltipLeft.element.style.opacity="1",this.tooltipRight.element.style.opacity="1")}showCurrentValue(){this.isLeftOn?this.tooltipLeft.position(this.state.shiftLeft):this.tooltipRight.position(this.state.shiftRight)}activeZoneAction(){this.state.shiftLeft>this.state.shiftRight?this.sliderClass.activeZone(this.state.shiftRight,this.state.shiftLeft):this.sliderClass.activeZone(this.state.shiftLeft,this.state.shiftRight)}}u([s.MR],d.prototype,"resizeSlider",null),u([s.MR],d.prototype,"onClickInterval",null),u([s.MR],d.prototype,"buttonAction",null),u([s.MR],d.prototype,"handlerTooltip",null),u([s.MR],d.prototype,"removeTouch",null),u([s.MR],d.prototype,"removeMouse",null),u([s.MR],d.prototype,"onMouseMove",null),u([s.MR],d.prototype,"onClickMove",null);var p=function(t,e,i,s){var n,o=arguments.length,r=o<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(r=(o<3?n(r):o>3?n(e,i,r):n(e,i))||r);return o>3&&r&&Object.defineProperty(e,i,r),r};class f{constructor(t){this.model=new r(t),this.view=new d(this.model.getState),this.init()}getState(){return this.model.getState}setState(t){this.model.setStateValid(t,!0),this.view.setState(this.model.getState),this.view.render()}subscribe(t){this.model.observer.subscribe(t)}unsubscribe(t){this.model.observer.unsubscribe(t)}init(){this.model.observer.subscribe(this.setStateView),this.view.observer.subscribe(this.setStateModel),this.view.render()}setStateModel(t){this.model.setState(t)}setStateView(){this.view.setState(this.model.getState)}}function v(t){if(void 0===t)throw new ReferenceError("callback function is not defined");if("function"!=typeof t)throw new TypeError("callback is not function")}function m(t,e,i){switch(e){case"subscribe":v(i),t.each(((t,e)=>{$(e).data("sliderRqik").subscribe(i)}));break;case"unsubscribe":v(i),t.each(((t,e)=>{$(e).data("sliderRqik").unsubscribe(i)}));break;case"settings":if("object"==typeof i)return t.each(((t,e)=>{$(e).data("sliderRqik").setState(i)})),t;const s=[];if(t.each(((t,e)=>{s.push($(e).data("sliderRqik").getState())})),!s)break;return s.length<=1?s[0]:s;default:throw new Error(`${e} is not found`)}}p([s.MR],f.prototype,"subscribe",null),p([s.MR],f.prototype,"unsubscribe",null),p([s.MR],f.prototype,"setStateModel",null),p([s.MR],f.prototype,"setStateView",null),function(t){const e=t;function i(t,i){if(!e(i).length)throw new ReferenceError("Connection to non-existent element");const s=e(i).data(),n=function(t,e){const i=t,s=`${i.className.replace(/\W+/gi,"_")}-${e}_rqik`;i.classList.add(s);const n=new f(`.${s}`);return n.setState(Object.assign({},i.dataset)),n}(i,t);n.setState(s),e(i).data("sliderRqik",n)}e.fn.sliderRqik=function(t,s){const n=e(this);if(n.first().data("sliderRqik")||n.each(i),void 0===t)return e(this);if("object"==typeof t)return n.each(((i,s)=>{e(s).data("sliderRqik").setState(t)})),e(this);if("string"!=typeof t)throw new TypeError("sliderRqik method name should be a string");const o=m(n,t,s);return o||e(this)},e((()=>{e(".slider-rqik").sliderRqik()}))}(jQuery)}},e={};function i(s){var n=e[s];if(void 0!==n)return n.exports;var o=e[s]={exports:{}};return t[s](o,o.exports,i),o.exports}i.d=(t,e)=>{for(var s in e)i.o(e,s)&&!i.o(t,s)&&Object.defineProperty(t,s,{enumerable:!0,get:e[s]})},i.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),i.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},(()=>{var t=i(362),e=function(t,e,i,s){var n,o=arguments.length,r=o<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(r=(o<3?n(r):o>3?n(e,i,r):n(e,i))||r);return o>3&&r&&Object.defineProperty(e,i,r),r};class s{constructor({$form:t,$sliderDOM:e,classRotate:i}){this.$form=t,this.$slider=e,this.$inputRotate=this.$form.find("input[name='rotate']"),this.$inputRange=this.$form.find("input[name='range']"),this.$inputCurrentLeft=this.$form.find("input[name='minValue']"),this.$inputCurrentRight=this.$form.find("input[name='maxValue']"),this.classRotate=i,this.inputNames=["max","min","maxValue","minValue","round","intervalCount","stepSize"],this.inputCheck=[["rotate",["vertical","horizontal"]],["showInterval",[!0,!1]],["showTooltip",[!0,!1]],["range",["two","one"]]]}init(){this.actionForm(),this.addEventSlider()}addEventSlider(){this.$slider.sliderRqik("subscribe",this.onChange),this.$inputRotate.on("click",this.addClassForm),this.$inputRange.on("change",this.disabledInputCurrentLeft)}disabledInputCurrentLeft(){this.$inputRange.prop("checked")?this.$inputCurrentLeft.prop("disabled",!1):this.$inputCurrentLeft.prop("disabled",!0)}addClassForm(){this.$inputRotate.is(":checked")?this.$slider.addClass(this.classRotate):this.$slider.removeClass(this.classRotate)}onChange(t){t.minValue&&this.$inputCurrentLeft.val(Number(t.minValue)),t.maxValue&&this.$inputCurrentRight.val(Number(t.maxValue))}makeEventCheck({nameAtr:t,active:e,disable:i}){return s=>{$(s.currentTarget).prop("checked")?this.$slider.sliderRqik({[t]:e}):this.$slider.sliderRqik({[t]:i})}}runChange(t){const e=this.$form.find(`input[name='${t}']`),i=e.val()||0;e.on("change",this.makeEventInputChange(t));("-"!==i||void 0!==i)&&this.$slider.sliderRqik({[t]:+i})}makeEventInputChange(t){const e=this.$form.find(`input[name='${t}']`);let i=e.val()||0;const{$slider:s}=this;return()=>{if(i=e.val()||0,"-"===i)return;s.sliderRqik({[t]:Number(i)});"stepSize"===t&&(this.$inputCurrentLeft.attr("step",Number(i)),this.$inputCurrentRight.attr("step",Number(i)));const n=s.sliderRqik("settings")[t];e.attr("value",Number(n)),e.val(Number(n))}}runCheckChange(t,e){const[i,s]=e,n=this.$form.find(`input[name='${t}']`);n.on("click",this.makeEventCheck({nameAtr:t,active:i,disable:s})),n.prop("checked")?this.$slider.sliderRqik({[t]:i}):this.$slider.sliderRqik({[t]:s})}actionForm(){this.inputNames.forEach((t=>this.runChange(t))),this.inputCheck.forEach((t=>this.runCheckChange(...t)))}}e([t.MR],s.prototype,"disabledInputCurrentLeft",null),e([t.MR],s.prototype,"addClassForm",null),e([t.MR],s.prototype,"onChange",null),e([t.MR],s.prototype,"runChange",null),e([t.MR],s.prototype,"makeEventInputChange",null),e([t.MR],s.prototype,"runCheckChange",null),i(544),$((()=>{const t=$(".js-plug1").sliderRqik(),e=$(".js-plug2").sliderRqik(),i=$(".js-plug3").sliderRqik(),n=$(".js-plug4").sliderRqik(),o=$("#form1"),r=$("#form2"),a=$("#form3"),h=$("#form4");new s({$form:o,$sliderDOM:t,classRotate:"slider_vertical"}).init(),new s({$form:r,$sliderDOM:e,classRotate:"slider_vertical"}).init(),new s({$form:a,$sliderDOM:i,classRotate:"slider_vertical"}).init(),new s({$form:h,$sliderDOM:n,classRotate:"slider_vertical"}).init()}))})()})();