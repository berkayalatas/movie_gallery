//initial Values
const API_KEY = 'edc1f1d207ed1ebb38efc80f79026ee6'
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500/';

const url = 'https://api.themoviedb.org/3/search/movie?api_key=edc1f1d207ed1ebb38efc80f79026ee6'

//url function
generateUrl = (path) => {
    const url = `https://api.themoviedb.org/3${path}?api_key=edc1f1d207ed1ebb38efc80f79026ee6`
    return url;
}


/* get the movie from API */ 
requestMovies = (url,onComplete,onError) => {
    fetch(url)
        .then((response) => response.json())
        .then(onComplete)
        .catch(onError);
}


/* Search Movie */
function searchMovie(value){
    const path = '/search/movie'
    const url = generateUrl(path) + '&query=' + value;

    requestMovies(url , renderSearchMovies , handleError);
}


getUpcomingMovies = () => {
    const path = '/movie/upcoming';
    const url = generateUrl(path);

    const render = renderMovies.bind({ title: 'Upcoming Movies' })
    requestMovies(url , render ,handleError);
}


getTopRatedMovies = () => {
    const path = '/movie/top_rated';
    const url = generateUrl(path);

    const render = renderMovies.bind({ title: 'Top Rated Movies' })
    requestMovies(url , render ,handleError);
}

getMostPopularMovies = () => {
    const path = '/movie/popular';
    const url = generateUrl(path);

    const render = renderMovies.bind({ title: 'Popular Movies' })
    requestMovies(url, render, handleError);
}


getNowPlayingMovies = () => {
    const path = '/movie/now_playing';
    const url = generateUrl(path);

    const render = renderMovies.bind({ title: 'Now Playing' })
    requestMovies(url , render ,handleError);
}