document.querySelectorAll(".imgHolder").forEach(item => item.addEventListener("click", onClick));
let charactTarget = document.querySelector(".charact0");
let previousChar=false;

function onClick(e) {
    
    e.stopPropagation();
    //reset previous
    charactTarget.style.display="none";
    if (previousChar) {
        previousChar.children[0].style.backgroundColor="rgba(0,0,0,0.75)";
        previousChar.style.transform="scale(1)"
    }
    //set next one
    previousChar = e.target;
    previousChar.children[0].style.backgroundColor="rgba(0,0,0,0)"
    previousChar.style.transform="scale(1.1)"

    //select the paragraph to display
    charactTarget = document.querySelector(`.box2 .${e.target.dataset.character}`)
    charactTarget.style.display="block";
}

