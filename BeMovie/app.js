function resetSwiper() {
    const swiper = new Swiper('.swiper', {
        direction: 'horizontal',
        loop: true,
        spaceBetween:19,
        slidesPerView: 1,
        slidesPerGroup: 1,
        breakpoints: {
            500:{
                slidesPerView:2,
            },
            768:{
                slidesPerView:3,
            },
            1250: {
                slidesPerView:4,
            },
        },
        pagination: {
            el: '.swiper-pagination',
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        grabCursor: true,
    });
}

//////     START POPUP PART /////////

document.querySelectorAll(".signinButton").forEach(item => item.addEventListener("click",displaySignin));
document.querySelector(".cross").addEventListener('click',closeSignin);
document.querySelector(".signin").addEventListener('click',closeSignin);
document.querySelector(".crossMovieImg").addEventListener('click',closeMovie);
document.querySelector(".movie-popup").addEventListener('click',closeMovie);
const signup = document.querySelector(".signin-bloc .signup");
signup.addEventListener("click",clickSignup);
const login = document.querySelector(".signin-bloc .login");
login.addEventListener("click",clickLogin);
const connectEmail =document.querySelector("#connect .email"); 
const connectConfirmPassword =document.querySelector("#connect .confirmPassword");

function addClickOnMovies() {
    document.querySelectorAll(".swiper-slide").forEach(item => item.addEventListener('click',displayMovie));
    document.querySelectorAll(".swiper-slide").forEach(item => item.addEventListener('mouseenter',displayHover));
    document.querySelectorAll(".swiper-slide").forEach(item => item.addEventListener('mouseleave',closeHover));
}
function clickSignup(){
    signup.classList.add("activeLink");
    login.classList.remove("activeLink");
    login.classList.add("loginOff");
    signup.classList.remove("signupOff");
    connectEmail.classList.remove("hidden");
    connectConfirmPassword.classList.remove("hidden");
};
function clickLogin(){
    signup.classList.remove("activeLink");
    login.classList.add("activeLink");
    login.classList.remove("loginOff");
    signup.classList.add("signupOff");
    connectEmail.classList.add("hidden");
    connectConfirmPassword.classList.add("hidden");
};
function displaySignin(e){
    if (e) {
        e.preventDefault();
    }
    document.querySelector(".popup").style.display="block";
    document.querySelector(".popup").style.visibility="visible";
}

function closeSignin(e) {
    if (e.target.classList =="signin"|| e.target.classList =="cross" || e.target.classList =="crossImg") {
        e.preventDefault();
        document.querySelector(".popup").style.display="none";
        document.querySelector(".popup").style.visibility="hidden";
    }
}
async function displayMovie(e) {
    await generateMovieModal(e.currentTarget.dataset.movieid);
    document.querySelector(".movie-popup").style.visibility="visible";

}

function closeMovie(e) {
    if (e.target.classList =="movie-popup" || e.target.classList =="crossMovieImg") {
        document.querySelector(".movie-popup").style.visibility="hidden";
    }
}

function displayHover(e){
    if (e.target.querySelector(".hoverMovie")) {
        e.target.querySelector(".hoverMovie").style.visibility="visible";
    }
}
function closeHover(e){
    if(e.target.querySelector(".hoverMovie")) {
        e.target.querySelector(".hoverMovie").style.visibility="hidden";
    }
}

//////     START API PART /////////
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2OGQ0NjAxOGY4MjVjOTdkMTM2ZWQ3ZDEyMzZiZTZmYyIsInN1YiI6IjY2NmZlMjVhMTM1ZDM5MTdmMTU0NzA1MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yBakHCKugpBK7pQtkIV_rvYAqZpKB7c0zTs8qQ5bVGM'
    }
}; 
const researchInput = document.querySelector("#research");
const searchWrapper = document.querySelector("#swipper1").querySelector(".swiper-wrapper");
const lastestWrapper = document.querySelector("#swipper2").querySelector(".swiper-wrapper");
const genreWrapper = document.querySelector("#swipper3").querySelector(".swiper-wrapper");
const navLinks = document.querySelector(".categories .genresList");
const headerResearch=document.querySelector(".research .header");
navLinks.querySelectorAll("a").forEach(item => item.addEventListener("click",onClickGenre));
document.querySelector(".researchButton").addEventListener("click", (e) => {
    e.preventDefault();
    displayResult(researchInput.value.trim());
    document.querySelector(".research .header").innerText = `Results for \"${researchInput.value.trim()}\"`;
} )
researchInput.addEventListener("keyup",async (e) => {
    if (e.key ==="Enter") {
        displayResult(researchInput.value.trim());
        document.querySelector(".research .header").innerText = `Results for \"${researchInput.value.trim()}\"`;
        researchInput.value="";
    }
})
let genreIdList;

const baseUrl="https://image.tmdb.org/t/p/w300";

//For any name genre return the id
function getIdforGenre (genre) {
    let idGenre;
    genreIdList.forEach(item => {
        if (item.name == genre) {
            idGenre = item.id;
        }
        })
        if (idGenre) { 
            return idGenre;
        } else {
            console.log(`The genre ${genre} has no id in the list`);
        }
}
//For any idgenre return the genre
function getGenreforId (idgenre) {
    let genre;
    genreIdList.forEach(item => {
        if (item.id == idgenre) {
            genre = item.name;
        }
        })
        if (genre) { 
            return genre;
        } else {
            console.log(`The genre ${idgenre} has no name in the list`);
        }
}

//fectch the ID of every genre and store it in GenreIdList
function getGenreIdList() {
    return fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options)
        .then(data => data.json())
        .then(data => {
            return data.genres;
        })
        .catch(err => console.error("failed to fetch the GenreIdList"));
}

//function that activate on the click on a genre

function onClickGenre(e) {
    if (e) {
        e.preventDefault();
    }
    navLinks.querySelectorAll("a").forEach(item =>item.classList.remove("activeLink"));
    e.target.classList.add("activeLink");
    let genre = e.target.innerText;
    displayGenre(genre);
}
//function that create an array of movie's formatted HTML based on the results;
function createMovieHTMLArray (results) {
    let htmlArray =[];
    results.forEach(movie =>{
        let title = movie.title;
        let image = "no-poster-found.png";
        if (movie.poster_path) {
        image = baseUrl+movie.poster_path;
        }
        
        let date = new Date(movie.release_date);
        let year = date.getFullYear();
        let categories ="";
            let indexId=0;
            movie.genre_ids.forEach(item => {
                indexId++;
                if (indexId==1) {
                    categories += getGenreforId(item)
                } else {
                    categories += " / "+ getGenreforId(item)
                }
                });
        let rating = Math.round(movie.vote_average*10)/10;
        let id=movie.id;
        if (movie.vote_count != 0) { 
        htmlArray.push(
        `
    <div class="swiper-slide" data-movieId="${id}">            
            <div class="hoverMovie">
                <h2 class="title">${title}</h2>
                <p class="date">${year}</p>
                <p class="categories">${categories}</p>
                <div class="ratings">
                    <img src="star.svg" alt="">
                    <p class="rating">${rating}</p>
                </div>
            </div>
            <img src="${image}" alt="">
    </div>
        `)}
    })
    return htmlArray;
}
async function displayGenre(genre) {
    let genreID = await getIdforGenre(genre);
    let results = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genreID}`, options)
        .then(response => response.json())
        .then(response => {
            return response.results;
        })
        .catch(err => console.error(err));
    document.querySelector("#category").innerText=genre;
    genreWrapper.innerHTML="";
    await createMovieHTMLArray(results).forEach(item => genreWrapper.innerHTML+=item);
    resetSwiper();
    addClickOnMovies();
}

async function displayLastest() {
    const todayDate =new Date().toJSON().slice(0, 10);
    let results = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&primary_release_date.lte=${todayDate}&include_video=false&language=en-US&page=1&sort_by=popularity.desc&vote_count.gte=20`, options)
        .then(response => response.json())
        .then(response => {
        return response.results;
        })
        .catch(err => console.error("Error on connecting with the API for Lastest Movies."));
        lastestWrapper.innerHTML="";
        await createMovieHTMLArray(results).forEach(item => lastestWrapper.innerHTML+=item);
        resetSwiper();
        addClickOnMovies();
}

async function displayResult (research) {
    let results = await fetch(`https://api.themoviedb.org/3/search/movie?query=${research}&include_adult=false&language=en-US&page=1`, options)
        .then(response => response.json())
        .then(response => {
        return response.results
        })
        .catch(err => console.error(err));
    searchWrapper.innerHTML="";
    if (results.length>0) {
        await createMovieHTMLArray(results).forEach(item => searchWrapper.innerHTML+=item);
        resetSwiper();
        addClickOnMovies();
    } else {
        headerResearch.innerText += " : No results found";
    }
    
}

const movieModalContentHolder = document.querySelector(".movie-popup .contentholder");

async function generateMovieModal(movieId) {
    let movie = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en`, options)
    .then(response => response.json())
    .then(response => {
        return response;
    })
    .catch(err => console.error("Error while attempting to get the movie by ID"));
    
    let credits = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits`, options)
    .then(response => response.json())
    .then(response => {
        return response;
    })
    .catch(err => console.error("Error while attempting to get the credits of the movie by ID"));
    let title = movie.title;
    let image = "no-poster-found.png";
    if (movie.poster_path) {
        image = baseUrl+movie.poster_path;
    }
    let year = "No date found."
    if (movie.release_date) {
        let date = new Date(movie.release_date);
        year = date.getFullYear();
    }
    
    let details = movie.overview? movie.overview:"No description available for this movie.";
    let categories ="";
        let indexId=0;
        if (movie.genres) {
            movie.genres.forEach(item => {
            indexId++;
            if (indexId==1) {
                categories += item.name;
            } else {
                categories += " / "+ item.name;
            }
            });
        } else {
        categories = "none";
    }
    let rating = "none";
        if (movie.vote_average) {
        rating = Math.round(movie.vote_average*10)/10;
        }
    
    let cast = credits.cast;
    let castDisplayed = "No cast information found.";
    let indexCast=0;
        while(indexCast<4 && cast[indexCast]) {
        if (indexCast==0){
            castDisplayed = cast[indexCast].name;
        } else {
            castDisplayed += ", "+cast[indexCast].name;
        };
        indexCast++;
        }
    movieModalContentHolder.innerHTML=
    `
    <div class="imgholder"><img src="${image}" alt=""></div>
    <div class="textArea">
        <h2 class="title">${title}</h2>
        <p class="date">${year}</p>
        <div class="rating"><img src="star.svg" alt="">${rating}</div>
        <div class="category">${categories}</div>
        <div class="description">${details}</div>
        <div class="cast"><span>Cast: </span>${castDisplayed}</div>
    </div>
    `
}

//function that will run at the start
async function initalisation () {
    genreIdList = await getGenreIdList();
    headerResearch.innerText="";
    searchWrapper.innerHTML="";
    displayLastest();
    console.log(navLinks);
    let firstGenre = navLinks.querySelector("a");
    firstGenre.classList.add("activeLink");
    displayGenre(firstGenre.innerText);
}
initalisation();
