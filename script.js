const key = '1eb0a1c18307918499a667fef3653e0e';
const popularMovies = 'https://api.themoviedb.org/3/movie/popular?api_key=1eb0a1c18307918499a667fef3653e0e&language=en-US&page=1';
const searchMovie = 'https://api.themoviedb.org/3/search/movie?api_key=1eb0a1c18307918499a667fef3653e0e&language=en-US&query=&page=1&include_adult=false'


// constants 
const moviesBlock = document.querySelector('.movies');
const search = document.querySelector('.search')
const sortBy = document.querySelectorAll('[data-info]');
const burger = document.querySelectorAll('.bi');
const cover = document.querySelector('.cover')

// events
search.addEventListener('keyup', (e) => {
    if (e.key == 'Enter') {
        fetchUserMovie(e.target.value);
    }
    
})

sortBy.forEach(li => li.addEventListener('click', sortByFunction))

burger.forEach(btn => btn.addEventListener('click', (e) => {
    cover.classList.toggle('active');
}))


//functions 
function sortByFunction(e) {
    cover.classList.remove('active')
    fetchMovie(`https://api.themoviedb.org/3/movie/${e.target.dataset.info}?api_key=1eb0a1c18307918499a667fef3653e0e&language=en-US&page=1`)
}





fetchMovie()
async function fetchUserMovie(movie) {
    clear()
    try {
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=1eb0a1c18307918499a667fef3653e0e&language=en-US&query=${movie}&page=1&include_adult=false`);
        const result = await response.json();
        handler(result)
    } catch(err) {
        alert(err)
    }
}

async function fetchMovie(url = popularMovies) {
    clear()
    try {
        const response = await fetch(url);
        const result = await response.json();
        handler(result)
    } catch(err) {
        alert(err)
    }
}


function handler(obj) {
    console.log(obj);
    obj.results.forEach(result => {
        creatingMovie(result.title, result.overview, result.poster_path, result.vote_average);
    })
}



function creatingMovie(name, overview, poster, rate) {
    let div = document.createElement('div');
    div.classList.add('movie');
    moviesBlock.appendChild(div);
    let img = document.createElement('img');
    img.setAttribute('src', `https://image.tmdb.org/t/p/original${poster}`)
    div.appendChild(img)
    let divContent = document.createElement('div');
    divContent.classList.add('movie-content');
    div.appendChild(divContent);
    divContent.innerHTML = `<div class="movie-visible-content">
    <h2 class="movie__heading">${name}</h2>
    <span class="movie__rate">${rate}</span>
    </div>
    <div class="movie-hover-content">
    <p><span>Overwiev</span>${overview}
    </p>
    </div>`;
    rateFunction()
}


function rateFunction() {
    document.querySelectorAll('.movie__rate').forEach(rate => {
        if (rate.innerText <= 5) {
            rate.classList.add('red')
        } else if (rate.innerText > 5 && rate.innerText < 8) {
            rate.classList.add('orange');
        } else {
            rate.classList.add('green')
        }
    })
}



function clear() {
    moviesBlock.querySelectorAll('.movie').forEach(movie => movie.remove())
}