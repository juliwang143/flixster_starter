// const APIkey = "01dd4debe44e9c69de7ca9ec4ff95794";
// const imageBaseUrl = 'https://image.tmdb.org/t/p';
// const url = "https://api.themoviedb.org/3/movie/now_playing?api_key=";
// const searchUrl = "https://api.themoviedb.org/3/search/movie?api_key=";

// var page = 1;
// var searchValue = '';

// const containerElem = document.getElementById('container');
// const movieGridElem = document.querySelector('#movies-grid');
// const searchInputElem = document.querySelector('#search-input');
// const loadBtnElem = document.querySelector('#load-more-movies-btn');
// const clearBtnElem = document.querySelector('#clear-btn');
// const nowPlayingElem = document.getElementById('now-playing-header');

// // initally render page
// getMovies();

// async function getMovies() {
//     console.log('getting movies');
//     const response = await fetch(`${url}${APIkey}&page=${page}`);
//     const jsonResponse = await response.json();
//     const data = jsonResponse.results;

//     // render
//     data.forEach(element => {
//         const movie = {title: element.title, voteAverage: element.vote_average, posterPath: element.poster_path};
//         console.log('movie: ' + JSON.stringify(movie));
//         loadMovie(imageBaseUrl, movie);
//     });
// }

// async function getSearchResults(searchParam) {

//     // working    
//     const response = await fetch(`${searchUrl}${APIkey}&query=${searchParam}&page=${page}`);
//     const jsonResponse = await response.json();
//     const data = jsonResponse.results;

//     console.log('data: ' + JSON.stringify(data));
//     // render
//     data.forEach(element => {
//         const movie = {title: element.title, voteAverage: element.vote_average, posterPath: element.poster_path};
//         console.log('movie: ' + JSON.stringify(movie));
//         loadMovie(imageBaseUrl, movie);
//     });
// }

// loadBtnElem.addEventListener("click", function () {
//     page++;
//     if (searchValue != '') {
//         getSearchResults(searchValue);
//     } else {
//         getMovies();
//     }
//     searchInputElem.value = '';
// });

// searchInputElem.addEventListener("keyup", (e) => {
//     if (e.which === 13) {
//         //The keycode for enter key is 13

//         // remove "now playing" header
//         nowPlayingElem.classList.add('hidden');

//         // clear gifResults
//         page = 1;
//         movieGridElem.innerHTML = ``;

//         searchValue = searchInputElem.value;
//         getSearchResults(searchInputElem.value);
//         // reset search bar
//         searchInputElem.value = '';

//         // make "clear search" button visible
//         clearBtnElem.classList.remove('hidden');
//     }
// });

// function loadMovie(imageBaseUrl, movie) {
//     movieGridElem.innerHTML += `
//         <div class="movie-card">
//             <div class="movie-title-wrapper">
//                 <span class="movie-title text">${movie.title}</span>
//             </div>
//             <img class="movie-poster" src="${imageBaseUrl}/w342${movie.posterPath}" alt="${movie.title}" title="${movie.title}"/>
//             <div class="movie-title-wrapper">
//                 <span class="text">${movie.voteAverage}</span>
//             </div>
//         </div>
//     `
// }

// clearBtnElem.addEventListener("click", function () {
//     page = 1;
//     searchValue = '';
//     clearBtnElem.classList.add('hidden');
//     nowPlayingElem.classList.remove('hidden');
//     movieGridElem.innerHTML = ``;
//     getMovies();
// });




const APIkey = "01dd4debe44e9c69de7ca9ec4ff95794";
const imageBaseUrl = 'https://image.tmdb.org/t/p';
const url = "https://api.themoviedb.org/3/movie/now_playing?api_key=";
const searchUrl = "https://api.themoviedb.org/3/search/movie?api_key=";
const videoUrl = "https://api.themoviedb.org/3/movie/";

var page = 1;
var searchValue = '';

const containerElem = document.getElementById('container');
const movieGridElem = document.querySelector('#movies-grid');
const searchInputElem = document.querySelector('#search-input');
const loadBtnElem = document.querySelector('#load-more-movies-btn');
const clearBtnElem = document.querySelector('#clear-btn');
const nowPlayingElem = document.getElementById('now-playing-header');
const searchResultsLabelElem = document.getElementById('search-results-label');

// added
// keep track of state of popup and previous container html code
// var containerCode = '';
// added

// initally render page
getMovies();

async function getMovies() {
    console.log('getting movies');
    const response = await fetch(`${url}${APIkey}&page=${page}`);
    const jsonResponse = await response.json();
    const data = jsonResponse.results;

    console.log('data: ' + JSON.stringify(data));
    // render
    data.forEach(element => {
        // const movie = {title: element.title, voteAverage: element.vote_average, posterPath: element.poster_path};
        // console.log('movie: ' + JSON.stringify(movie));
        loadMovie(imageBaseUrl, element);
    });
}

async function getSearchResults(searchParam) {

    // working    
    const response = await fetch(`${searchUrl}${APIkey}&query=${searchParam}&page=${page}`);
    const jsonResponse = await response.json();
    const data = jsonResponse.results;

    console.log('data: ' + JSON.stringify(data));
    // render
    data.forEach(element => {
        // const movie = {title: element.title, voteAverage: element.vote_average, posterPath: element.poster_path};
        // console.log('movie: ' + JSON.stringify(movie));
        loadMovie(imageBaseUrl, element);
    });
}

loadBtnElem.addEventListener("click", function () {
    page++;
    if (searchValue != '') {
        getSearchResults(searchValue);
    } else {
        getMovies();
    }
    searchInputElem.value = '';
});

searchInputElem.addEventListener("keyup", (e) => {
    if (e.which === 13) {
        //The keycode for enter key is 13

        // remove "now playing" header
        nowPlayingElem.classList.add('hidden');

        // clear gifResults
        page = 1;
        movieGridElem.innerHTML = ``;

        searchValue = searchInputElem.value;
        getSearchResults(searchInputElem.value);
        // reset search bar
        // searchInputElem.value = '';

        // make "clear search" button visible
        clearBtnElem.classList.remove('hidden');
        
        // add search results label
        searchResultsLabelElem.classList.remove('hidden');
        searchResultsLabelElem.innerHTML = `"${searchValue}" results`;
        console.log('hiii: ' + searchResultsLabelElem.value);
    }
});

function loadMovie(imageBaseUrl, movie) {
    const movieCard = document.createElement("div");
    movieCard.className = "movie-card";
    movieCard.innerHTML = `
    <img class="movie-poster" src="${imageBaseUrl}/w342${movie.poster_path}" alt="${movie.title}" title="${movie.title}"/>
    <div class="movie-title-wrapper">
        <span class="movie-title text">${movie.title}</span>
    </div>
    <div class="movie-title-wrapper">
        <span class="text">Rating: ${movie.vote_average}/10</span>
    </div>
    `;

    movieGridElem.appendChild(movieCard);

    movieCard.addEventListener("click", function () {
        // containerElem.style.opacity = 0.2;
        console.log('click');

        const closePopupButton = document.createElement('button');
        closePopupButton.className = 'close-popup';
        closePopupButton.addEventListener("click", () => {
            popup.parentElement.removeChild(popup);
        })

        const popup = document.createElement('div');
        popup.className = 'popup';
        popup.innerHTML = `
        <div class="popup-movie-info-wrapper">
            <span class="popup-movie-title text">${movie.title}</span>
            <span class="text">Rating: ${movie.vote_average}/10</span>
            <span class="text">Overview: ${movie.overview}</span>
        </div>
        `;

        popup.appendChild(closePopupButton);
        document.body.appendChild(popup);
    }); 
}

clearBtnElem.addEventListener("click", function () {
    page = 1;
    searchValue = '';
    searchInputElem.value = '';
    clearBtnElem.classList.add('hidden');
    nowPlayingElem.classList.remove('hidden');
    movieGridElem.innerHTML = ``;
    searchResultsLabelElem.innerHTML = ``;
    getMovies();
});

async function getTrailer() {
    const response = await fetch(`${videourl}${APIkey}&page=${page}`);
    const jsonResponse = await response.json();
    const data = jsonResponse.results;

    console.log('video: ' + JSON.stringify(data));
    if (data.length == 0) {
        // TODO return image poster path
        return 'No Trailer';
    } else {
        return data[0].key;
    }
}