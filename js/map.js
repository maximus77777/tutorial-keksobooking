'use strict';

var MIN_AVATAR = 1;
var MAX_AVATAR = 8;
var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var MIN_X = 300;
var MAX_X = 900;
var MIN_Y = 150;
var MAX_Y = 500;
var MIN_PRICE = 1000;
var MAX_PRICE = 1000000;
var TYPES = ['flat', 'house', 'bungalo'];
var MIN_ROOMS = 1;
var MAX_ROOMS = 5;
var MIN_GUESTS = 1;
var MAX_GUESTS = 5;
var CHECKIN = ['12:00', '13:00', '14:00'];
var CHECKOUT = ['12:00', '13:00', '14:00'];
var randomList = [];
var LIST_COUNT = 8;
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

// Случайное число
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Случайный индекс массива
function getRandomArray(Words) {
  return Words[Math.floor(Math.random() * Words.length)];
}

function getRandomAvatar() {
  for (var i = 0; i < LIST_COUNT; i++) {
    var imageAvatar = 'img/avatars/user0' + getRandomNumber(MIN_AVATAR, MAX_AVATAR) + '.png';
  }
  return imageAvatar;
}

function translatePlaceType(englishType) {
  var translate = {
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };
  return translate[englishType];
}

// Случайная длина массива

function getRandomFeature() {
  var randomFeature = [];
  var feature = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  for (var i = 0; i < feature.length; i++) {
    if (getRandomNumber(0, 1)) {
      randomFeature.push(feature[i]);
    }
  }
  return randomFeature;
}

function getRandomPhotos() {
  var randomPhotos = [];
  for (var i = 0; i < PHOTOS.length; i++) {
    randomPhotos.push(getRandomArray(PHOTOS));
  }
  return randomPhotos;
}

function createSetList() {
  var avatar = getRandomAvatar();
  var title = getRandomArray(TITLES);
  var locationX = getRandomNumber(MIN_X, MAX_X);
  var locationY = getRandomNumber(MIN_Y, MAX_Y);
  var price = getRandomNumber(MIN_PRICE, MAX_PRICE);
  var type = getRandomArray(TYPES);
  var rooms = getRandomNumber(MIN_ROOMS, MAX_ROOMS);
  var guests = getRandomNumber(MIN_GUESTS, MAX_GUESTS);
  var checkin = getRandomArray(CHECKIN);
  var checkout = getRandomArray(CHECKOUT);
  var features = getRandomFeature();
  var photos = getRandomPhotos();
  var info =
  {
    'author': {
      'avatar': avatar,
    },

    'offer': {
      'title': title,
      'address': locationX + ',' + locationY,
      'price': price + ' &#x20bd;/ночь',
      'type': type,
      'rooms': rooms + ' комнаты для ',
      'guests': guests + ' гостей ',
      'checkin': 'Заезд после ' + checkin,
      'checkout': ', выезд до ' + checkout,
      'features': features,
      'description': ' ',
      'photos': photos,
    },

    'location': {
      'x': locationX,
      'y': locationY,
    }
  };
  return info;
}

var getRandomList = function () {
  for (var i = 0; i < LIST_COUNT; i++) {
    var newList = createSetList();
    randomList.push(newList);
    console.log(createSetList());
  }
};

console.log(getRandomList());

var cityMap = document.querySelector('.map');
cityMap.classList.remove('map--faded');
