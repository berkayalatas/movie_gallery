
const buttonElement = $('#search');
const inputElement = $('#inputValue');
const imgElement = $('img')
const movieSearchable = $('#movies-searchable');
const moviesContainer = $('#movies-container');


/* Error Handling Function */
handleError = (err) => {
    console.log('Error: ',err)
}



movieSection = (movies) => {
    return movies.map((movie) => {
        if (movie.poster_path) {
            return `
            <img src = ${IMAGE_URL + movie.poster_path} 
            data-movie-id = ${movie.id}/>`;
        }
    })
}


createMovieContainer = (movies, title='' ) => {
    const movieElement = $("<div>");
    movieElement.attr('class', 'movie');

    const movieTemplate = `
       <h2 style="margin-left:15px;"> ${ title } </h2>
        <section class="section">
            ${movieSection(movies)}
        </section>    
        <div class="content">
            <i class="fas fa-times" id="content-close"/> 
        </div>
    `;

    movieElement.html(movieTemplate);
    return movieElement;
}


function renderSearchMovies(data){
    //data.result[]
    movieSearchable.html('')
    const movies = data.results;
    const movieBlock = createMovieContainer(movies)
    movieSearchable.append(movieBlock);
}


function renderMovies(data) {
    const movies = data.results;
    const movieBlock = createMovieContainer(movies, this.title)
    moviesContainer.append(movieBlock);
}


buttonElement.click((event) => {
    
    const value = inputElement.val()
    searchMovie(value);

    inputElement.val('');
    console.log(value)
    event.preventDefault()
})


createIframe = (video) => {
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${video.key}`;
    iframe.width = 400;
    iframe.height = 350;
    iframe.allowFullscreen = true;

    return iframe;
}

//video template
createVideoTemplate = (data, content) => {
    //dispay Movies
    content.innerHTML = '<i class="fas fa-times" id="content-close"/>'
    console.log("Videos:", data);
    const videos = data.results;
    const length = videos.length > 3 ? 3 : videos.length;
    const iframeContainer = document.createElement('div');

    for (let i = 0; i < length; i++) {
        const video = videos[i]; //video
        const iframe = createIframe(video);
        iframeContainer.appendChild(iframe);
        content.appendChild(iframeContainer);
    }
}



//Click event Picture
document.onclick = function (event) {

    const target = event.target;

    if (target.tagName.toLowerCase() === 'img') {
        const movieId = target.dataset.movieId;
        console.log('Movie ID: ', movieId)
        const section = event.target.parentElement; //section
        const content = section.nextElementSibling; //content
        content.classList.add('content-display')

        const path = `/movie/${movieId}videos`;
        const url = generateUrl(path)
        //fetch movie videos
        fetch(url)
            .then((response) => response.json())
            .then((data) => createVideoTemplate(data,content))
            .catch((error) => {
                console.log('Error: ', error);
            });
    }

    if (target.id === 'content-close') {
        const content = target.parentElement;
        content.classList.remove('content-display')
    }

}


 

getUpcomingMovies();

getMostPopularMovies();

getTopRatedMovies();

getNowPlayingMovies();