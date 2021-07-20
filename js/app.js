//API Key
//Hashear nuestras keys
const private = '745b5e34dc8dbfd68ba1bb8d9ee5511b38b356aa';
const public = '519eb1362038e44871da07e7549b508b';
const timestamp = Date.now(); // miliseegundos de donde se hace la llamada
const hash = md5(timestamp + private + public);
const totalData = document.getElementById("total-result");

//DOM 
//Vista general
const loaderContanier = document.getElementById("container-loader");
const containerComics = document.getElementById("container-comics");
const characterContainer = document.getElementById("main-container");
const comicInfoContainer = document.getElementById("container-comic-info");
const comicInfo = document.getElementById("comic-info");
const comicCharactersInfo = document.getElementById("comic-characters-info");
const comicDataCharacters = document.getElementById(
  "comic-data-characters"
);
const containerInfoCharacter = document.getElementById(
  "container-character-info"
);
const characterInfo = document.getElementById("character-info");
const comicsCharacterInfo = document.getElementById("comics-character-info");
const characterDataComics = document.getElementById(
  "character-data-comics"
);
const lightThemeButton = document.getElementById("light-theme-button");
const darkThemeButton = document.getElementById("dark-theme-button");

//Búsqueda
const searchInput = document.getElementById("search-input");
const searchType = document.getElementById("search-type");
const searchOrder = document.getElementById("search-order");
const btnSearch = document.getElementById("btn-search");

// Paginado
const paginationContainer = document.getElementById("pagination-container");

//configuraciones generales
let offset = 0;
let total;
let input = searchInput.value;
let order = searchOrder.value;
let type = searchType.value;
let pageNumber = 1;

/** PETICIONES COMICS/PERSONAJES  ***/ 

const fetchData = (input, order) => {
  containerInfoCharacter.classList.add("is-hidden");
  comicInfoContainer.classList.add("is-hidden");
  containerComics.classList.remove("is-hidden");
  loaderContanier.classList.remove("is-hidden");
  characterContainer.classList.add("is-hidden");
  total = undefined;
  let url;
  if (input !== "") {
    url = `https://gateway.marvel.com/v1/public/comics?titleStartsWith=${input}&orderBy=${order}&limit=20&offset=${offset}&ts=${timestamp}&apikey=${public}&hash=${hash}`;
  } else {
    url = `https://gateway.marvel.com/v1/public/comics?&orderBy=${order}&limit=20&offset=${offset}&ts=${timestamp}&apikey=${public}&hash=${hash}`;
  }
  loader('show');
  fetch(url)
    .then((response) => response.json())
    .then((obj) => {
      loader('hide'),
      printData(obj.data.results);
      total = obj.data.total;
      totalData.innerHTML = total;
    })
    .catch((error) => console.error(error));
};

const fetchCharacters = (input, order) => {
  characterContainer.classList.add("is-hidden");
  total = undefined;
  loader('show');
  let url;
  if (input !== "") {
    url = `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${input}&orderBy=${order}&limit=20&offset=${offset}&ts=${timestamp}&apikey=${public}&hash=${hash}`;
  } else {
    url = `https://gateway.marvel.com/v1/public/characters?&orderBy=${order}&limit=20&offset=${offset}&ts=${timestamp}&apikey=${public}&hash=${hash}`;
  }
  fetch(url)
    .then((response) => response.json())
    .then((obj) => {
      printCharactersComic(obj.data.results, "", characterContainer);
      total = obj.data.total;
      totalData.innerHTML = total;
      loader('hide');
    })
    .catch((error) => console.error(error));
};
/** COMICS  ***/
let comicDetail = "";
const getDetail = (id) => {
  total = undefined;

  const url = `https://gateway.marvel.com/v1/public/comics/${id}?&limit=20&offset=${offset}&ts=${timestamp}&apikey=${public}&hash=${hash}`;
  fetch(url)
    .then((response) => response.json())
    .then((obj) => {
      printComicInfo(obj.data.results);
      total = obj.data.total;
    })
    .catch((error) => console.error(error));
  comicDetail = id;
  pageNumber = 1;
  getCharacterComicDetail(comicDetail);
  return comicDetail;
};

const getCharacterComicDetail = (id) => {
  loader('show');
  offset = 0;
  const url = `https://gateway.marvel.com/v1/public/comics/${id}/characters?&limit=20&offset=${offset}&ts=${timestamp}&apikey=${public}&hash=${hash}`;
  fetch(url)
    .then((response) => response.json())
    .then((obj) => {
      printCharactersComic(
        obj.data.results,
        comicDataCharacters,
        comicCharactersInfo
      );
      loader('hide');
    })
    .catch((error) => console.error(error));
};
/** PERSONAJES  ***/

let characterDetail = "";
const getCharacterDetail = (id) => {
  total = undefined;

  const url = `https://gateway.marvel.com/v1/public/characters/${id}?&limit=20&offset=${offset}&ts=${timestamp}&apikey=${public}&hash=${hash}`;
  fetch(url)
    .then((response) => response.json())
    .then((obj) => {
      printInfoCharater(obj.data.results);
      total = obj.data.results[0].comics.available;
    })
    .catch((error) => console.error(error));
  characterDetail = id;
  pageNumber = 1;
  getComicsCharacterDetail(characterDetail);
  return characterDetail;
};

const getComicsCharacterDetail = (id) => {
  comicsCharacterInfo.classList.add("is-hidden");
  loaderContanier.classList.remove("is-hidden");
  const url = `https://gateway.marvel.com/v1/public/characters/${id}/comics?&limit=20&offset=${offset}&ts=${timestamp}&apikey=${public}&hash=${hash}`;
  fetch(url)
    .then((response) => response.json())
    .then((obj) => {
      printCharacter(obj.data.results);
      loaderContanier.classList.add("is-hidden");
    })
    .catch((error) => console.error(error));
};
