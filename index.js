function saveToWatchlist(movieID) {
  const movie = movieData.find(function (currentMovie) {
    return currentMovie.imdbID == movieID
  })
  let watchlistJSON = localStorage.getItem("watchlist")
  let watchlist = JSON.parse(watchlistJSON)
  if (watchlist === null) {
    watchlist = []
  }
  let newlist = watchlist.filter(currentMovie => currentMovie.imdbID === movieID)
  newlist.forEach(newMovie => watchlist.splice(watchlist.findIndex(movie => movie.imdbID === newMovie.imdbID), 1))
  watchlist.push(movie)
  watchlistJSON = JSON.stringify(watchlist)
  localStorage.setItem('watchlist', watchlistJSON)
}




function renderMovies(movieData) {
  const movieHTMLArray = movieData.map(function (currentMovie) {
    return `
    <div class="card movie col-4 mx-3 my-5 p-0" style="width: 18rem;">
    <img src="${currentMovie.Poster}" class="card-img-top" alt="movie poster">
    <div class="card-body d-flex flex-column">
      <h5 class="movie-title">${currentMovie.Title}</h5>
      <p class="movie-release-date">${currentMovie.Year}</p>
      <button data-imdbid=${currentMovie.imdbID} class="add-button align-center mt-auto btn btn-lg btn-block" >Add</button>
      </div>
      </div>
      `
  })
  const results = document.querySelector("#results")
  results.innerHTML = movieHTMLArray.join("")
}

document.addEventListener('click', (e) => {
  const addButton = e.target
  const card = document.querySelector(".card")
  if (e.target.classList.contains("add-button")) {
    const movieID = e.target.dataset.imdbid
    saveToWatchlist(movieID)
    addButton.setAttribute("disabled", "disabled")
    addButton.innerText = "Added to watchlist"
  }
})

const searchForm = document.querySelector('#search-form');
searchForm.addEventListener('submit', function (e) {
  e.preventDefault()
  const searchString = document.querySelector('#search-bar').value
  const urlEncodedSearchString = encodeURIComponent(searchString)
  fetch(`https://www.omdbapi.com/?apikey=59354c85&s=${urlEncodedSearchString}`)
    .then(res => res.json())
    .then(data => {
      renderMovies(data.Search)
      movieData = data.Search
    })
  myForm.reset()
})





