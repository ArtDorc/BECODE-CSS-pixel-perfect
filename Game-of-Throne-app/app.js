document.querySelectorAll(".imgHolder").forEach(item => {
    item.addEventListener("click", onClick);
    item.addEventListener("mouseenter",hoverMouseIn);
    item.addEventListener("mouseleave",hoverMouseOut);
});

let charactTarget = document.querySelector(".charact0");
let previousChar=false;

function hoverMouseIn(e) {
    e.stopPropagation();
    e.target.children[0].style.backgroundColor="rgba(0,0,0,0.45)"
}

function hoverMouseOut(e) {
    e.stopPropagation();
    e.target.children[0].style.backgroundColor="rgba(0,0,0,0.75)"
}

function onClick(e) {
    e.stopPropagation();
    //remove hover when clicked
    e.target.removeEventListener("mouseenter", hoverMouseIn);
    e.target.removeEventListener("mouseleave", hoverMouseOut);

    //reset previous
    charactTarget.style.display="none";
    if (previousChar) {
        previousChar.children[0].style.backgroundColor="rgba(0,0,0,0.75)";
        previousChar.style.transform="scale(1)"
        //reinstal hover
        if (previousChar!== e.target) {
        previousChar.addEventListener("mouseenter",hoverMouseIn);
        previousChar.addEventListener("mouseleave",hoverMouseOut);
        }
    }
    //set next one
    previousChar = e.target;
    previousChar.children[0].style.backgroundColor="rgba(0,0,0,0)"
    previousChar.style.transform="scale(1.1)"

    //select the paragraph to display
    charactTarget = document.querySelector(`.box2 .${e.target.dataset.character}`)
    charactTarget.style.display="block";
}

