/*Кнопка поиска*/

let btnSearh = document.querySelector(".header__search-btn");
let fieldSearch = document.querySelector(".header__search");
let btnCloseSearch = document.querySelector(".header__close-search");

btnSearh.addEventListener("click", function () {
  fieldSearch.classList.add("header__search--active");
  btnSearh.style.visibility = 'hidden';
});

btnCloseSearch.addEventListener("click", function () {
  fieldSearch.classList.remove("header__search--active");
  btnSearh.style.visibility = 'visible';;
});

/*БУРГЕР*/
let burger = document.querySelector('.burger');
let navigation = document.querySelector('.header__nav-mobile');

let menuLinks = navigation.querySelectorAll('.nav__link-mobile');

burger.addEventListener('click',
  function () {
    burger.classList.toggle('burger--active');
    navigation.classList.toggle('header__nav-mobile--active');
    document.body.classList.toggle('stop-scroll');
  }
)

menuLinks.forEach(function (el) {
  el.addEventListener('click',
    function () {

      burger.classList.remove('burger--active');
      navigation.classList.remove('header__nav-mobile--active');
      document.body.classList.remove('stop-scroll');
    })
})

//карта
const infoMap = document.querySelector('.map-contacts');
const closeInfoMapBtn = document.getElementById('closeInfoMapBtn');

const menuBtn = document.querySelector('.header__burger-btn');
const menu = document.querySelector('.nav');
menuBtn.addEventListener('click', function () {
  menuBtn.classList.toggle('active');
  menu.classList.toggle('active');
})

closeInfoMapBtn.addEventListener('click', () => {
  infoMap.style.display = 'none'
})

// Функция ymaps.ready() будет вызвана, когда
// загрузятся все компоненты API, а также когда будет готово DOM-дерево.
ymaps.ready(init);
function init() {
  // Создание карты.
  var myMap = new ymaps.Map("map", {
    center: [55.763, 37.6226],
    zoom: 14
  }, {
    suppressMapOpenBlock: true // убирает с карты метку "как добраться"
  });
  myMap.controls.remove('zoomControl'); //Удалим с карты «Ползунок масштаба».
  myMap.controls.remove('searchControl'); // Удалим с карты «Поиск».
  myMap.controls.remove('geolocationControl'); // Удалим с карты «геолокацию».
  myMap.controls.remove('typeSelector'); // Удалим с карты «Тип».
  myMap.controls.remove('fullscreenControl'); // Удалим с карты «Переход в полноэкранный режим».
  myMap.controls.remove('rulerControl'); // Удалим с карты «контрол правил».
  myMap.controls.remove('trafficControl'); // Удалим с карты «Пробки».

  var myPlacemark = new ymaps.Placemark([55.769383, 37.638521], {}, {
    iconLayout: 'default#image',
    iconImageHref: 'img/Ellipse.png',
    iconImageSize: [15, 15],
    iconImageOffset: [-3, -3]
  });
  // Размещение геообъекта на карте.
  //myMap.geoObjects.add(myGeoObject);
  myMap.geoObjects.add(myPlacemark);

  myPlacemark.events.add('click', function () {
    infoMap.style.display = 'block'
  });
}

//Форма. Валидация
const form = document.querySelector(".form");
var selector = document.querySelector("input[type='tel']");
var im = new Inputmask("+7 (999) 999-99-99");

im.mask(selector);

new JustValidate('.form', {
  rules: {
    name: {
      required: true,
      minLength: 2,
      maxLength: 15,
      customRegexp: /[a-zа-я]/gi,
    },
    mail: {
      required: true,
      email: true,
      errorMessage: 'Вы не ввели e-mail',
    },
  },

  messages: {
    name: {
      required: 'Вы не ввели имя',
      minLength: 'Введите минимум 2 символа',
      maxLength: 'Должно быть меньше 15 символов',
    },
    mail: {
      email: 'Введите корректный e-mail',
      required: 'Вы не ввели e-mail',
    },
  },
  colorWrong: '#FF5C00'
});


