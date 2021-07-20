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
