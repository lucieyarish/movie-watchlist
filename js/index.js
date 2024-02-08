const searchForm = document.getElementById('search-form');
const searchResultNoData = document.getElementById('search-result-no-data');
const searchResult = document.getElementById('search-result');

const renderMovies = (movie) => {
  searchResultNoData.style.display = 'none';

  //TODO: redo -> render list of movies, not just one movie
  const movieHtml = `
        <img class="movie-img" src="${movie.Poster}" alt="${movie.Title} movie poster">
        <div class="movie-info">
                <div class="movie-header">
                    <h2 class="movie-title">${movie.Title}</h2>
                    <img class="movie-rating-icon" src="assets/images/star-icon.png" alt="Yellow star icon">
                    <p class="movie-rating">${movie.Ratings[0].Value}</p>
                </div>
                <div class="movie-details">
                    <p class="movie-length">${movie.Runtime}</p>
                    <p class="movie-genre">${movie.Genre}</p>
                    <button class="add-btn"><span class="add-icon">+</span> Watchlist</button>
                </div>
                <div class="movie-description">
                    <p class="movie-description-text">
                        ${movie.Plot}
                        <span><button class="read-more-btn">Read more</button></span>
                    </p>
                </div>
        </div>            
    `;

  searchResult.innerHTML = movieHtml;
};

const renderErrorMsg = () => {
  searchResultNoData.innerHTML = `
        <p class="error-text">Unable to find what you’re looking for. Please try another search.</p>
    `;
};

const getMovies = (movieIds) => {
  const apiKey = 'c8afa8e';
  const movies = [];

  movieIds.map((movieId) => {
    fetch(`http://www.omdbapi.com/?i=${movieId}&apikey=${apiKey}`)
      .then((res) => res.json())
      .then((data) => movies.push(data));
  });

  return movies;
};

const getSearchResults = (searchQuery) => {
  const apiKey = 'c8afa8e';
  fetch(`http://www.omdbapi.com/?s=${searchQuery}&apikey=${apiKey}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.Response === 'False') {
        renderErrorMsg();
      } else {
        const movieIds = data.Search.map((movie) => movie.imdbID);

        const movies = getMovies(movieIds);

        //TODO: call renderMovies function
      }
    })
    .catch((err) => {
      console.error(err);
    });
};

searchForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const formData = new FormData(searchForm);
  const searchQuery = formData.get('searchQuery');

  getSearchResults(searchQuery);

  searchForm.reset();
});
