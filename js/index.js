const searchForm = document.getElementById('search-form');

const getMovie = (searchQuery) => {
  const apiKey = 'c8afa8e';
  fetch(`http://www.omdbapi.com/?t=${searchQuery}&apikey=${apiKey}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
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
