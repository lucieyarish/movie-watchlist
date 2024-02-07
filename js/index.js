const searchForm = document.getElementById('search-form');
const searchResultInit = document.getElementById('search-result-init');
const searchResult = document.getElementById('search-result');

const renderMovie = (movie) => {
  searchResultInit.style.display = 'none';

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
                <button class="remove-btn"><span class="remove-icon">–</span> Remove</button>
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

const getMovie = (searchQuery) => {
  const apiKey = 'c8afa8e';
  fetch(`http://www.omdbapi.com/?t=${searchQuery}&apikey=${apiKey}`)
    .then((res) => res.json())
    .then((data) => {
      renderMovie(data);
    })
    .catch((err) => {
      //TODO: display error msg inside search-results container
      console.error(err);
    });
};

searchForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const formData = new FormData(searchForm);
  const searchQuery = formData.get('searchQuery');

  getMovie(searchQuery);

  searchForm.reset();
});
