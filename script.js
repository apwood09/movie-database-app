const API_KEY = '05102f77f2615fa761b848b32eaf77ad';
const BASE_URL = 'https://api.themoviedb.org/3/'
const IMG_PATH = 'https://image.tmdb.org/t/p/w500';
const SEARCH_API = `${BASE_URL}search/movie?api_key=${API_KEY}&query=`;

const searchForm = document.getElementById('search-form'); 
const searchInput = document.getElementById('search-input'); 
const movieResults = document.getElementById('movie-results'); 

// event listener search submission 
searchForm.addEventListener('submit', (event) => {
    // prevent actual submission 
    event.preventDefault(); 

    const searchTerm = searchInput.value.trim(); 

    if (searchTerm) {
        // fetch movies 
        fetchMovies(SEARCH_API + searchTerm); 
        searchInput.value = ''; // clear after search 
    } else {
        // display message search input empty 
        displayErrorMessage('Enter Movie Title')
    }
});

// fetch movia data from API 
async function fetchMovies(url) {
    try {
        const response = await fetch(url); 
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json(); 

        if (data.results && data.results.length > 0) {
            displayMovies(data.results); 
        } else {
            displayErrorMessage('No movies found. Please try a different search term.');
        }
    } catch (error) {
        console.error("Error fetching movie data:", error); 
        displayErrorMessage('Failed to fetch movie data. Please check your API key and connection.');
    }
}

// display error message 
function displayErrorMessage(message) {
    movieResults.innerHTML = `<div class="error-message">${message}</div>`
}

// display movies in result container 
function displayMovies(movies) {
    movieResults.innerHTML = ''; // clear previous results 

    movies.forEach((movie) => {
        const {title, poster_path, vote_average } = movie; 
        const movieCard = document.createElement('div'); 
        movieCard.classList.add('movie-card'); 

        // check poster_path exist 
        const posterUrl = poster_path 
            ? IMG_PATH + poster_path 
            : 'https://via.placeholder.com';

        movieCard.innerHTML = `
            <div class="poster-container">
                <img src="${posterUrl}" alt="${title}" width="300" height="500">
                <div class="movie-info">
                    <h3>${title}</h3>
                    <span class="rating">${vote_average.toFixed(1)}/10</span>
                </div>
            </div>
        `;

        movieResults.appendChild(movieCard); 
    }); 
}