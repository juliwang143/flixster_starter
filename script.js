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

// initally render page
getMovies();

async function getMovies() {
    const response = await fetch(`${url}${APIkey}&page=${page}`);
    const jsonResponse = await response.json();
    const data = jsonResponse.results;

    // render
    data.forEach(element => {
        loadMovie(imageBaseUrl, element);
    });
}

async function getSearchResults(searchParam) {

    // working    
    const response = await fetch(`${searchUrl}${APIkey}&query=${searchParam}&page=${page}`);
    const jsonResponse = await response.json();
    const data = jsonResponse.results;

    // render
    data.forEach(element => {
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

        // make "clear search" button visible
        clearBtnElem.classList.remove('hidden');
        
        // add search results label
        searchResultsLabelElem.classList.remove('hidden');
        searchResultsLabelElem.innerHTML = `"${searchValue}" results`;
    }
});

function loadMovie(imageBaseUrl, movie) {
    const movieCard = document.createElement("div");
    movieCard.className = "movie-card";

    // console.log('movie poster path: ' + JSON.stringify(movie));
    // // added
    // if (movie.poster_path !== null) {
    //     movieCard.innerHTML += `
    //         <img class="movie-poster" src="${imageBaseUrl}/w342${movie.poster_path}" alt="${movie.title}" title="${movie.title}"/>
    //     `;
    // } else {
    //     movieCard.innerHTML += `
    //         <img class="movie-poster" alt="Image not available" title="${movie.title}"/>
    //     `;
    // }

    // movieCard.innerHTML += `
    // <div class="movie-title-wrapper">
    //     <span class="movie-title text">${movie.title}</span>
    // </div>
    // <div class="movie-title-wrapper">
    //     <span class="text">Rating: ${movie.vote_average}/10</span>
    // </div>
    // `;

    // movieGridElem.appendChild(movieCard); 

    // working
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
        const closePopupButton = document.createElement('button');
        closePopupButton.className = 'close-popup';
        closePopupButton.addEventListener("click", () => {
            popup.parentElement.removeChild(popup);
        })

        const popup = document.createElement('div');
        popup.className = 'popup';

        const popupWrapper = document.createElement('div');
        popupWrapper.className = 'popup-movie-info-wrapper';
        popupWrapper.innerHTML = `
            <span class="popup-movie-title text">${movie.title}</span>
            <span class="text">Rating: ${movie.vote_average}/10</span>
            <span class="text overview">Overview: ${movie.overview}</span>
        `;

        if (movie.video == false) {
            popupWrapper.innerHTML += `
            <img class="movie-poster" src="${imageBaseUrl}/w342${movie.poster_path}" alt="${movie.title}" title="${movie.title}"/>
            `;
        } else {
            getTrailer(movie).then((trailerKey) => {
                popupWrapper.innerHTML += `
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/${trailerKey}" 
                        title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; 
                        clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                `;
                popupWrapper.appendChild(closePopupButton);
                popup.appendChild(popupWrapper);
                document.body.appendChild(popup);
            });
        }

        popupWrapper.appendChild(closePopupButton);
        popup.appendChild(popupWrapper);
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

async function getTrailer(movie) {
    const response = await fetch(`${videoUrl}${movie.id}/videos?api_key=${APIkey}&language=en-US`);
    const jsonResponse = await response.json();
    const data = jsonResponse.results;
    const firstIndex = data[0];
    const key = firstIndex.key;
    return key;
}