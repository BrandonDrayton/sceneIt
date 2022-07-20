
let watchlist = JSON.parse(localStorage.getItem("watchlist"))



function renderMovies(movieData) {
    const movieHTMLArray = movieData.map(function (currentMovie) {
        return `
      <div class="border-0 card movie col-4 mx-3 my-5 p-0" style="width: 18rem;">
      <img src="${currentMovie.Poster}" class="card-img-top" alt="movie poster">
      <div class="card-body d-flex flex-column">
        <h5 class="movie-title">${currentMovie.Title}</h5>
        <p class="movie-release-date">${currentMovie.Year}</p>
        <button data-imdbid=${currentMovie.imdbID} class="delete-button align-center mt-auto btn btn-lg btn-block" >Delete</button>
        </div>
        </div>  
        `



    })
    const results = document.querySelector("#results")
    results.innerHTML = movieHTMLArray.join("")
}
renderMovies(watchlist)


document.addEventListener('click', (e) => {
    if (e.target.classList.contains("delete-button")) {
        const movieID = e.target.dataset.imdbid
        watchlist = watchlist.filter(movie => {
            if (movieID == movie.imdbID) {
                return false
            } else return true
        })
        watchlistJSON = JSON.stringify(watchlist)
        localStorage.setItem('watchlist', watchlistJSON)
        renderMovies(watchlist)

    }



})

