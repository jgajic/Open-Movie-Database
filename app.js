const inputSearch = document.querySelector('.inputSearch');
const searchButton = document.querySelector('.searchButton');
const slikaElement = document.querySelector('#slika');
const card = document.querySelector('.cardMain');
const nav = document.querySelector('.nav');
const next = document.querySelector('.next');
const previous = document.querySelector('.previous');
let currentPage = document.querySelector('.currentPage');
let cartBody = document.querySelector('.offcanvas-body');



const apiKey = "7467668d";
let page = 1;
let maxPage;

let filmovi = [];
let korpa = [];


const setFilmovi = (list) => {
  filmovi = [...list];
};

const setKorpa = (list) => {
  korpa = [...list];
};





searchButton.addEventListener('click', (event) => {
  event.preventDefault();
  ispis();
});


previous.addEventListener('click', () => {
  page <= 1 ? page = 1 : page -= 1;
  ispis();
});


next.addEventListener('click', () => {
  page >= maxPage ? page = maxPage : page += 1;
  ispis();
});



const ispis = () => {
  let movieInput = inputSearch.value;
  fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=${movieInput}&page=${page}`)
    .then(res => res.json())
    .then(resJson => {
      console.log(resJson);
      setFilmovi(resJson.Search);


      card.innerHTML = '';
      resJson.Search.forEach((movie, idx) => {
        card.innerHTML += `
      <div class="card" style="width: 22rem;">
          <img src="${movie.Poster}" id="slika" class="card-img-top" alt="...">
        <div class="card-body">
          <h4 class="card-title" id="movieName">${movie.Title}</h4>
          <p class="card-text type">Type: ${movie.Type}</p>
          <p class="card-text year">Year: ${movie.Year}</p>
          <a href="#" class="btn btn-primary cardButton" onclick="addCart(${idx})">Add to Cart</a>
        </div>
      </div>
          `;
      });


      resJson.totalResults % 10 === 0 ? maxPage = resJson.totalResults / 10 : maxPage = Math.floor(resJson.totalResults / 10) + 1;

      currentPage.value = page;
    });
};




const addCart = (idx) => {
  setKorpa([...korpa, filmovi[idx]]);
  // korpa = [...korpa, filmovi[idx]];
  renderKorpa();
};



const renderKorpa = () => {
  cartBody.innerHTML = '';

  korpa.forEach((movie, idx) => {
    cartBody.innerHTML += `
    <div class="card mb-3" style="max-width: 540px;">
        <div class="row g-0">
            <div class="col-md-4">
              <img src="${movie.Poster}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">
              <div class="card-body cardSpace">
                <h5 class="card-title">${movie.Title}</h5>
                <p class="card-text year">Year: ${movie.Year}</p>
                <a href="#" class="btn btn-primary korpaBtn" onclick="remove(${idx})">Remove</a>
              </div>
            </div>
        </div>
      </div>
            `;
  });
};



const remove = (idx) => {
  // let temp = [...korpa];

  // temp.splice(idx, 1);
  let temp = korpa.filter((movie, index) => idx != index);

  setKorpa(temp);



  renderKorpa();
};










