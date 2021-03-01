SliderRqik
======

## Способ подключения 

```javascript
// index.html
<div class="plug"></div>

// index.js
$(".plug").sliderRqik();  
```

## Передача параметров
```javascript
$(".plug").sliderRqik({
    minValue: 0, // минимальное значение
    maxValue: 100, // максимальное значение
    range: "two", // 1 или 2 указателя
    rotate: "horizontal", // ориентация vertical horizontal
    show: true, // показыватьть текущее значение над указателем
    showInterval: true, // показать интервал
    intervalCount: 2, // количество интервалов
    stepSize: 1, // шаг движения указателя в px
    currentVal1: 50, // установка значений в числах
    currentVal2: 0, // установка значений в числах
    round: 1, // округление,
    stepSizePerc: 0,// шаг движения указателя в %
    shiftXl: 0,
    shiftXr: 0
    });  
```
### minValue и maxValue
---
Устанавливают минимальные и максимальные значения слайдера  
По умолчанию 0 и 100
```javascript
$(".plug").sliderRqik({
    minValue: -10, // минимальное значение
    maxValue: 2880, // максимальное значение
})
```
###   currentVal1 и currentVal2
---
Устанавливает стартовые значения кнопок
По умолчанию 0 и 100
```javascript
$(".plug").sliderRqik({
    currentVal1: 10, // правая кнопка
    currentVal2: 0, // левая кнопка
})
```

### range
---
Устанавливает колличество кнопок на слайдере 
Имеет два состояния __*two | one*__ 
По умолчанию __*two*__ 
```javascript
$(".plug").sliderRqik({range: "one"})
```
### rotate
---
Устанавливает ориентацию сладера 
Имеет два состояния  __*vertical | horizontal*__ 
По умолчанию __*horizontal*__ 
```javascript
$(".plug").sliderRqik({rotate: "vertical"})
```
### show
---
Отвечает за отоброжание или скрытие подсказок с текущим значением над кнопками  
Имеет два состояния  __*true | false*__ 
По умолчанию __*true*__ 
```javascript
$(".plug").sliderRqik({show: false})
```
### showInterval
---
Отвечает за отоброжание или скрытие интервалов
Имеет два состояния  __*true | false*__ 
По умолчанию __*true*__ 
```javascript
$(".plug").sliderRqik({showInterval: false})
```
### intervalCount
---
Отвечает за отоброжание или скрытие интервалов
Принимает числовой парамметр от 0 и выше 
По умолчанию __*2*__ 
```javascript
$(".plug").sliderRqik({intervalCount: 4})
```
### stepSize
---
Задает шаг движения в __px__ 
Принимает числовой парамметр от 0 и выше 
По умолчанию __*0*__ 
Имеет приоритет ниже чем  __*stepSizePerc*__ 
```javascript
$(".plug").sliderRqik({stepSize: 10})
```
### stepSizePerc
---
Задает шаг движения в __%__ 
Принимает числовой парамметр от 0 и выше 
По умолчанию __*0*__ 
Имеет приоритет выше чем  __*stepSize*__ 
```javascript
$(".plug").sliderRqik({stepSizePerc: 10})
```
###  round
---
Устанавливает округление чисел __N__ знаков после запятой 
Принимает числовой парамметр от 0 и выше 
По умолчанию __*1*__ 
```javascript
$(".plug").sliderRqik({round: 0})
```

## Передача параметров через data атрибут 
```javascript
// index.html
<div class="plug" data-min-value='10' data-current-val1='20'></div>
```
## Установка значений для уже созданных слайдерова
Метод __*data*__ принимает в себя обьект с новыми парматрами для слайдера

```javascript
let slider = $(".plug").sliderRqik(); 
slider.data({maxValue: 99999})

```

## Получение текущих значений 
Метод __*getData*__ вернет массив с обьеками в которых записаны текущие значения 

```javascript
// index.html
<div class="plug"></div>
<div class="plug"></div>

// index.js
let slider = $(".plug").sliderRqik(); 
let res = slider.getdata()

// res = [{...},{...}]
```



[ Диаграмма ](https://viewer.diagrams.net/?highlight=0000ff&edit=_blank&layers=1&nav=1#R7Z1dc9o4FIZ%2FDTO7F%2B3Ylg3mMkDStEvaTJLpplc7Aiug1liMLL7661e2ZYwROAqxcLKrTmeKD8c20vMe6ejDbgv0Z%2BtPFM6nNyRAYcuxgnULDFqOY1vA5%2F8klk1m8VxhmFAcCKfCcI9%2Fo%2FxMYV3gAMUlR0ZIyPC8bByTKEJjVrJBSsmq7PZEwvJd53CCJMP9GIay9W8csGlm9Z1OYb9GeDLN72y3u9k3M5g7i5LEUxiQ1Y4JXLZAnxLCsk%2BzdR%2BFSeXl9XJ9ZQ36F%2BDrsnv1469%2FRo%2Fr4Bv7kF3s6iWnbItAUcROvvRiePc1JsOLL%2FDXwy2eDIY2wuIUawnDhaivW4pifhtERaHZJq%2FJeIVnIYz4Ue%2BJROxefGPzYxjiScQ%2Fj7MzQW%2BJKMMcwoX4gpE5t46nOAyGcEMWSTFiBse%2F8qPelFD8m18WhuKa%2FGvKhJ6cdsnjPjmTmy1u5T%2BX%2B9zmdWPvmW7guuQ4hDEThjEJQziP8WhbjBmkExz1CGNkJpwUq14gSoqN1jvCEyg%2BITJDjG64i%2FjWFzUvosruiuNVoVG7LWzTXX22XREbIi4m20sX7PkHgf8FUuhKUphljcGeDHgBWYqHkl%2BoT0LCeQ8ikukCh%2BGeKZdGiJ7YUWHEczjG0WSY%2BgzcwnInSp6YCD%2F3KUwjcIqDAEUJVMIggxnBBNec4IilNeP1%2BF9egX3ro9fy%2BA%2Fv82O7OOZ%2FE3fK%2BiTiZYE45Yu4PFYokcgB8pUR9Dx5gZprWYl07lc7aFsCvcRo1UruB%2BxC8wZ5bcg9p2HkjoRcYhzilF3GOO8p7ZMAzziqEBVEHxLggw%2B2RB3I1MEBwiEcofCWxJhhklyfZr575JuC2%2FHV4Pqa2LqeBDdejOIxxSNkglofd7%2FxdlxuyD9HmBnQNYO2bX3NNxn9TAY9jpW2cUVv%2FLEihGNx%2BTgOYmEK4mC3Wa%2BUDdgprJCZEUt9YgGK3cEJYuGHQi8v6R6kRuJ7mu2Zwd3ZBnega6tqQleScCBH4KGFTF9RHf6uMvm3MrhzZNLfRjGiywMTOgb262Cfc1j3OOyM5vTu8%2BWXVWce9566Px6GH9oS696CN2%2BRIV0zadUxnjbSclT3FzQp5ffUYnjXy9u23Ibb8Y4E%2FD7EgWnE60cNFGfetcV2vlJWGsfzTJsfG9p10%2FaaTtDkPluCbKZiT6XrK2ZkuoZZQB5towDz0bQZa2mgrbpmqi2WgZyWpZN3I5OFaxlc20033g4wwM8J3D3jCPvwGosM%2FObgrggzf1rj%2FKkLyhOoyjrYLtXULwS5ZzczqAoxvw2g9zOFasu9uknRa8OrOmmqK0V3TIp%2BRtrtplN0Wx5vp%2B22mD41xOsm3vy2GF8ifr8YmUXvMy96d2zF0N%2FumKh%2FeC7HvplYVYx7Xxn%2FW0nbwIG4T5dM7mA0MV177cAb39QM5DUysyiqk%2Fg5V8EP%2F2T5GRWz4UEP6%2BZXwB15WVTCbIbhJ%2FNVXfbWNg6Xk7PLJS%2Fl0d1qJlmvMVkHdjlbd%2FOlrGezdc%2FSJQi5O8%2B1EEtiMO374WB6P%2Bm6I6frpnmvDW%2FTs6xA7rx3nmgxwVwvbdVZVqCr7Qbyo2gjSmAwTro7g7tm3Kr7XrThduRx2CIy8a0NuO00TRzIxI%2FsRzZpur45dU9RBvq2Qbhyv379cDP8SpJ3%2FJi4r4z7bQy9nyTdlbc%2FHX8%2FkMH9StyNz6i7chpnxmS14W38RSHOAbq8uBa%2F%2FJQEf7DNHP3ZAhfcknw08V23AM65NeLgk0aWxBQFE5SnaLxKpmRCIhheFlZe0YsoQIGo5sJnSNJoTYL1J2JsI3IwuGAkycLYrMjQdlsK58XZUkwWdIyqdC06KZ4JTlAVMVH8pMyVuCgKIcPLXafDMMSpt4n2duZW9zavOntJefY7xUkF0QtK4WbHTSj66G3a5dvYYtvilZq7Y1mV7r5d5c4%2FZD%2B30OK2%2Fk6Xp9zZnEGeXIN08yjOTw9%2BJAe8rRCHg%2FXul4ONONIu6%2Fxlmc%2Bp2qtb1a9qYsB7YlgzMU%2BRWL7SobshcjpeKYjdtqfUEtUVz%2B7%2FWAsdRS3ku5Zq1sIrOxNPPMio2Jl0Ot6efjT0Dp0m1HS6Kqpe4%2FC8KvS0EC9Vhbc%2F%2FeRXqmLP3bds%2Farw%2FwOqaCuqIt%2F%2B1LAq9vJbVzx0fUwVe%2B6%2B0%2F7Y3fnj69dI%2FqLEdy2SfMPG821H%2B02oROpS2tUDjn3%2FtngP%2B3FZvc6%2F45b8NSmvkSGN9qFJV7XBAnVL8fibEYv38Gfwiv%2FNAFz%2BCw%3D%3D)