// Function to reload the page (navigate to home)
document.getElementById('homeLink').addEventListener('click', function() {
    location.reload();
});

// Function to fetch movies based on search query
async function searchMovies() {
    const apiKey = '4d883bd23a20b74916116e3129cf9d1e';
    const query = document.getElementById('searchInput').value;
    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${query}&page=1&include_adult=false`;
    
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        displayMovies(data.results);
    } catch (error) {
        console.error('Error searching movies:', error);
    }
}

// Function to fetch popular movies
async function fetchMovies() {
    const apiKey = '4d883bd23a20b74916116e3129cf9d1e';
    const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;
    
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error fetching movies:', error);
    }
}

// Function to shuffle array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Function to display movies
function displayMovies(movies) {
    const shuffledMovies = shuffleArray(movies);
    const moviesContainer = document.getElementById('movies');
    moviesContainer.innerHTML = '';

    shuffledMovies.forEach(movie => {
        const movieCard = `
            <div class="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105">
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" class="w-full h-auto">
                <div class="px-6 py-4 opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-center items-center">
                    <h3 class="text-xl font-bold mb-2">${movie.title}</h3>
                    <p class="text-gray-300">${movie.release_date}</p>
                    <p class="mt-2">${movie.overview}</p>
                </div>
            </div>
        `;
        moviesContainer.innerHTML += movieCard;
    });
}

// Function to display popular movies when the page loads
window.onload = async function() {
    const popularMovies = await fetchMovies();
    displayMovies(popularMovies);
};

// Add event listener for Enter key press in search input
document.getElementById('searchInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        searchMovies();
    }
});