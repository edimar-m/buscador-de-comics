/*******CAMBIO DE TEMA MODO CLARO/OSCURO*****/

lightThemeButton.addEventListener("click", () => {
    lightThemeButton.classList.add("is-hidden");
    darkThemeButton.classList.remove("is-hidden");
    document.body.classList.add("theme--dark");
  });
    darkThemeButton.addEventListener("click", () => {
    lightThemeButton.classList.remove("is-hidden");
    darkThemeButton.classList.add("is-hidden");
    document.body.classList.remove("theme--dark");
  });

/*******IMPRESIÓN COMICS*****/

const pathNonFoundNowanted =
"https://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available";
const pathNonFoundWanted =
"https://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available/portrait_uncanny";  

const printData = (arr) => {
    containerInfoCharacter.classList.add("is-hidden");
    comicInfoContainer.classList.add("is-hidden");
    characterContainer.classList.remove("is-hidden");
    let box = "";
    arr.forEach((comic) => {
      const {
        title,
        thumbnail: { extension, path },
        id,
      } = comic;
      box += `
          <div class="column is-full-mobile is-one-third-tablet is-one-fifth-desktop center" onclick="getDetail(${id})">
              <figure class="card-image">
                  <a class="center go-to-image">
                      <img class="img-height" src="${
                        path === pathNonFoundNowanted ? pathNonFoundWanted : path
                      }.${extension}" alt="${title}">
                      <p class="has-text-centered">${title}</p>
                  </a>
              </figure>
          </div>`;
    });
    characterContainer.innerHTML = box;
    
    //PAGINADOR EN FUNCIÓN DE LA BUSQUEDA PRINCIPAL DE COMICS
    paginationContainer.innerHTML = `
              <button id="first-page-btn" class="button button mr-3 is-danger" ${
                offset === 0 && "disabled"
              } onclick="firstPage(${() => fetchData(input, order)})">
                  <i class="fas fa-caret-square-left is-size-4"></i>
              </button>
              <button id="previews-page-btn" class="button mr-2" ${
                offset === 0 && "disabled"
              } onclick="previewsPage(${() => fetchData(input, order)})">
                  <i class="fas fa-caret-left is-size-4"></i>
              </button>
              <div class="button mr-2">
                  <span id="page-number">${pageNumber}</span>
              </div>
              <button id="next-page-btn" class="button" ${
                offset === total - (total % 20) && "disabled"
              } onclick="nextPage(${() => fetchData(input, order)})">
                  <i class="fas fa-caret-right is-size-4"></i>
              </button>
              <button id="last-page-btn" class="button ml-3 is-danger" ${
                offset === total - (total % 20) && "disabled"
              } onclick="lastPage(${() => fetchData(input, order)})">
                  <i class="fas fa-caret-square-right is-size-4"></i>
              </button>
      `;
  };
  
  const printComicInfo = (arr) => {
    containerComics.classList.add("is-hidden");
    containerInfoCharacter.classList.add("is-hidden");
    comicInfoContainer.classList.remove("is-hidden");
  
    let box = "";
    arr.forEach((comic) => {
      const {
        title,
        thumbnail: { extension, path },
        creators,
        description,
        dates,
        characters: { items },
      } = comic;
      const releaseDate = new Intl.DateTimeFormat("es-AR").format(
        new Date(dates?.find((el) => el.type === "onsaleDate").date)
      );
      const writer = creators?.items
        ?.filter((el) => el.role === "writer")
        .map((creator) => creator.name)
        .join(", ");
      box += `
          <div class="columns">
              <div class="column is-one-quarter">
                  <figure class="img-detalle">
                  <img src="${
                    path === pathNonFoundNowanted ? pathNonFoundWanted : path
                  }.${extension}" alt="${title}" class="img-comic-info">
                  </figure>
              </div>
              <div class="column is-size-5 px-6 py-4 title-color">
                  <h3 class="title title-color">${title}</h3>
                  <h4 class="has-text-weight-bold m-0 mb-2">Publicado:</h4>
                  <p>${releaseDate}</p>
                  <h4 class="has-text-weight-bold m-0 mt-3 mb-2">Guionistas:</h4>
                  <p>${writer ? writer : "Sin información"}</p>
                  <h4 class="has-text-weight-bold m-0 mt-3 mb-2">Descripción:</h4>
                  <p class="has-text-justified pr-6">${
                    description ? description : "Sin información"
                  }</p>
              </div>
          </div>`;
    });
    comicInfo.innerHTML = box;
  };

  const printCharactersComic = (arr, containerText, container) => {
    container.classList.remove("is-hidden");
    if (arr.length === 0) {
      containerText.innerHTML = `
              <h3 class="title mb-2 title-color">Personajes</h3>
              <p class="is-size-6 has-text-weight-bold mt-0">${arr.length} Resultado(s)</p>
              <p class="subtitle has-text-weight-bold mt-6 title-color">No se han encontrado resultados</p>`;
    }
    let box = "";
    arr.forEach((character) => {
      const {
        name,
        thumbnail: { extension, path },
        id,
      } = character;
      const pathNonFoundNowanted =
        "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available";
      const pathNonFoundWanted =
        "https://i.pinimg.com/564x/6d/af/a0/6dafa08555ee450d9d61061c7bc23cb5";
  
      containerText.innerHTML = `
                  <h3 class="title mb-2 title-color">Personajes</h3>
                  <p class="is-size-6 has-text-weight-bold mt-0">${arr.length} Resultado(s)</p>`;
      box += `<div class="column is-full-mobile is-one-third-tablet is-one-fifth-desktop center" onclick="getCharacterDetail(${id})">
                      <div class="character-card" data-title="Character" >
                          <img src="${
                            path === pathNonFoundNowanted
                              ? pathNonFoundWanted
                              : path
                          }.${extension}" alt="${name}" class="character-img">
                          <span class="character-span"></span>
                          <p class="name is-size-5 has-text-weight-bold has-text-centered mt-1 p-3">${name}</p>
                      </div>
                  </div> `;
    });
    container.innerHTML = box;

     //PAGINADOR EN FUNCIÓN DE LOS PERSONAJES 
    paginationContainer.innerHTML = `
              <button id="first-page-btn" class="button button mr-3 is-primary" ${
                offset === 0 && "disabled"
              } onclick="firstPage(${() => fetchCharacters(input, order)})">
                  <i class="fas fa-caret-square-left is-size-4"></i>
              </button>
              <button id="previews-page-btn" class="button mr-2" ${
                offset === 0 && "disabled"
              } onclick="previewsPage(${() => fetchCharacters(input, order)})">
                  <i class="fas fa-caret-left is-size-4"></i>
              </button>
              <div class="button mr-2">
                  <span id="page-number">${pageNumber}</span>
              </div>
              <button id="next-page-btn" class="button" ${
                offset === total - (total % 20) && "disabled"
              } onclick="nextPage(${() => fetchCharacters(input, order)})">
                  <i class="fas fa-caret-right is-size-4"></i>
              </button>
              <button id="last-page-btn" class="button ml-3 is-primary" ${
                offset === total - (total % 20) && "disabled"
              } onclick="lastPage(${() => fetchCharacters(input, order)})">
                  <i class="fas fa-caret-square-right is-size-4"></i>
              </button>
      `;
  };
  
  const printInfoCharater = (arr) => {
    containerComics.classList.add("is-hidden");
    comicInfoContainer.classList.add("is-hidden");
    containerInfoCharacter.classList.remove("is-hidden");
    let box = "";
    arr.forEach((character) => {
      const {
        name,
        thumbnail: { extension, path },
        description,
      } = character;
      box += `
          <div class="columns">
              <div class="column is-one-quarter">
                  <figure class="img-detalle">
                  <img src="${
                    path === pathNonFoundNowanted ? pathNonFoundWanted : path
                  }.${extension}" alt="${name}" class="img-comic-info">
                  </figure>
              </div>
              <div class="column is-size-5 px-6 py-4 label-select">
                  <h3 class="title title-color">${name}</h3>
                  <h4 class="has-text-weight-bold m-0 mt-3 mb-2">Descripción:</h4>
                  <p class="has-text-justified pr-6">${
                    description ? description : "Sin información"
                  }</p>
              </div>
          </div>`;
    });
    characterInfo.innerHTML = box;
  
    if (arr[0].comics.available == 0) {
      characterDataComics.innerHTML = `
              <h3 class="title mb-2 title-color">Comics</h3>
              <p class="is-size-6 has-text-weight-bold mt-0 label-select">${arr[0].comics.available} Resultado(s)</p>
              <p class="subtitle has-text-weight-bold mt-6 title-color">No se han encontrado resultados</p>`;
    } else {
      characterDataComics.innerHTML = `
          <h3 class="title mb-2 title-color">Comics</h3>
          <p class="is-size-6 has-text-weight-bold mt-0 label-select">${arr[0].comics.available} Resultado(s)</p>`;
    }
  };
  
  const printCharacter = (arr) => {
    comicsCharacterInfo.classList.remove('is-hidden');
    let box = "";
    arr.forEach((comic) => {
      const {
        title,
        thumbnail: { extension, path },
        id,
      } = comic;
      box += `
          <div class="column is-full-mobile is-one-third-tablet is-one-fifth-desktop center" onclick="getDetail(${id})">
              <figure class="card-image">
                  <a class="center go-to-image">
                      <img class="img-height" src="${
                        path === pathNonFoundNowanted ? pathNonFoundWanted : path
                      }.${extension}" alt="${title}">
                      <p class="has-text-centered">${title}</p>
                  </a>
              </figure>
          </div>`;
    });
    comicsCharacterInfo.innerHTML = box;

    //PAGINADOR EN FUNCIÓN DE UN PERSONAJE
    paginationContainer.innerHTML = `
    <button id="first-page-btn" class="button button mr-3" ${
      offset === 0 && "disabled"
    } onclick="firstPage(${() => getCharacterDetail(characterDetail)})">
                  <i class="fas fa-caret-square-left is-size-4"></i>
              </button>
              <button id="previews-page-btn" class="button mr-2" ${
                offset === 0 && "disabled"
              } onclick="previewsPage(${() => getCharacterDetail(characterDetail)})">
                  <i class="fas fa-caret-left is-size-4"></i>
              </button>
              <div class="button mr-2">
                  <span id="page-number">${pageNumber}</span>
              </div>
              <button id="next-page-btn" class="button" ${
                offset === total - (total % 20) && "disabled"
              } onclick="nextPage(${() => getCharacterDetail(characterDetail)})">
                  <i class="fas fa-caret-right is-size-4"></i>
              </button>
              <button id="last-page-btn" class="button ml-3" ${
                offset === total - (total % 20) && "disabled"
              } onclick="lastPage(${() => getCharacterDetail(characterDetail)})">
                  <i class="fas fa-caret-square-right is-size-4"></i>
              </button>
      `;
  };