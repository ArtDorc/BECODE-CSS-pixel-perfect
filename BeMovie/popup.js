document.querySelectorAll(".signinButton").forEach(item => item.addEventListener("click",displaySignin));
document.querySelector(".cross").addEventListener('click',closeSignin);
document.querySelector(".signin").addEventListener('click',closeSignin);
document.querySelectorAll(".swiper-slide").forEach(item => item.addEventListener('click',displayMovie));
document.querySelectorAll(".swiper-slide").forEach(item => item.addEventListener('mouseenter',displayHover));
document.querySelectorAll(".swiper-slide").forEach(item => item.addEventListener('mouseleave',closeHover));
document.querySelector(".crossMovieImg").addEventListener('click',closeMovie);
document.querySelector(".movie-popup").addEventListener('click',closeMovie);

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
function displayMovie(e) {
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