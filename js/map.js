'use strict';
var MIN_X = 300;
var MAX_X = 900;
var MIN_Y = 150;
var MAX_Y = 500;
var MIN_PRICE = 1000;
var MAX_PRICE = 1000000;
var HOUSE_TYPE = ['flat', 'house', 'bungalo'];
var MIN_ROOMS = 1;
var MAX_ROOMS = 5;
var MIN_GUESTS = 1;
var MAX_GUESTS = 5;
var CHECKIN_TIME = ['12:00', '13:00', '14:00'];
var CHECKOUT_TIME = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var ADVERTS_COUNT = 8;
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var cityMap = document.querySelector('.map');
cityMap.classList.remove('map--faded');

function getRandomAvatar(index) {
  var indexAvatar = index + 1;
  return 'img/avatars/user0' + indexAvatar + '.png';
}

// Случайное число
function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function translatePlaceType(englishType) {
  var translate = {
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };
  return translate[englishType];
}

function getHouseTitle(index) {
  var houseTitles = ['Большая уютная квартира', 'Маленькая неуютная квартира',
    'Огромный прекрасный дворец', 'Маленький ужасный дворец',
    'Красивый гостевой домик', 'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  return houseTitles[index];
}

function getRandomValueFromArray(arr) {
  var randomIndex = getRandomValue(0, arr.length - 1);
  return arr[randomIndex];
}

function getRandomFeatures(fearuresArr) {
  var features = [];
  var featuresCount = Math.floor(Math.random() * FEATURES.length + 1);
  for (var i = 0; i < featuresCount; i++) {
    features.push(fearuresArr[i]);
  }
  return features;
}

var getShuffledPhotos = function (a) {
  var j;
  var x;
  var i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
};

function createPopupDatas(advertCount) {
  var adverts = [];
  var advert = {};

  var locationX = '';
  var locationY = '';

  for (var i = 0; i < advertCount; i++) {
    locationX = getRandomValue(MIN_X, MAX_X);
    locationY = getRandomValue(MIN_Y, MAX_Y);

    advert = {
      'author': {
        'avatar': getRandomAvatar(i)
      },
      'offer': {
        'title': getHouseTitle(i),
        'address': locationX + ',' + locationY,
        'price': getRandomValue(MIN_PRICE, MAX_PRICE),
        'type': translatePlaceType(getRandomValueFromArray(HOUSE_TYPE)),
        'rooms': getRandomValue(MIN_ROOMS, MAX_ROOMS),
        'guests': getRandomValue(MIN_GUESTS, MAX_GUESTS),
        'checkin': getRandomValueFromArray(CHECKIN_TIME),
        'checkout': getRandomValueFromArray(CHECKOUT_TIME),
        'features': getRandomFeatures(FEATURES),
        'description': '',
        'photos': getShuffledPhotos(PHOTOS),
      },
      'location': {
        'x': locationX,
        'y': locationY
      }
    };
    adverts.push(advert);
  }
  return adverts;
}

//  console.log(createPopupDatas(ADVERTS_COUNT));

var adverts = createPopupDatas(ADVERTS_COUNT);

var renderPins = function (add) {
  var template = document.querySelector('.map__pins');
  var similarElement = document.querySelector('template').content.querySelector('.map__pin');
  var fragment = document.createDocumentFragment();

  add.forEach(function (item) {
    var element = similarElement.cloneNode(true);
    element.querySelector('img').setAttribute('src', item.author.avatar);
    element.setAttribute('style', 'left: ' + item.location.x + 'px; ' + 'top:' + item.location.y + 'px');
    fragment.appendChild(element);
    template.appendChild(fragment);
  });
};

renderPins(adverts);

var renderFeatures = function (features) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < features.length; i++) {
    var newElement = document.createElement('li');
    newElement.className = 'feature feature--' + features[i];
    fragment.appendChild(newElement);
  }
  return fragment;
};

var renderPictures = function (photos) {
  var fragment = document.createDocumentfragment();
  for (var i = 0; i < photos.length; i++) {
    var similarElement = document.querySelector('template').content.querySelector('.popup__pictures li').cloneNode(true);
    similarElement.querySelector('img').setAttribute('src', photos[i]);
    similarElement.querySelector('img').setAttribute('height', 60);
    similarElement.querySelector('img').setAttribute('width', 60);
    fragment.appendChild(similarElement);
  }
  return fragment;
};

function renderPopUp(item) {
  var similarCardTemplate = document.querySelector('template').content.querySelector('article.map__card');
  var cardElement = similarCardTemplate.cloneNode(true);
  cardElement.querySelector('img').setAttribute('src', item.author.avatar);
  cardElement.querySelector('h3').textContent = item.offer.title;
  cardElement.querySelector('p small').textContent = item.offer.address;
  cardElement.querySelector('.popup__price').textContent = item.offer.price;
  cardElement.querySelector('h4').textContent = item.offer.type;
  cardElement.querySelector('h4 + p').textContent = item.offer.rooms + item.offer.guests;
  cardElement.querySelector('h4 + p + p').textContent = item.offer.checkin + item.offer.checkout;
  cardElement.querySelector('.popup__features').textContent = '';
  cardElement.querySelector('.popup__features').appendChild(renderFeatures(item.offer.features));
  cardElement.querySelector('ul + p').textContent = item.offer.description;
  cardElement.querySelector('.popup__pictures').appendChild(renderPictures(item.offer.photos));
  return cardElement;
}

var cardFragment = document.createDocumentFragment();
cardFragment.appendChild(renderPopUp(adverts[0]));
document.querySelector('.map').insertBefore(cardFragment, document.querySelector('.map__filters-container'));
