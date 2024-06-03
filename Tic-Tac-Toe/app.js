const boxes = document.querySelectorAll(".box");
let clickCount = 0;
boxes.forEach(box => box.addEventListener("click", clickBox))
document.querySelectorAll("#reset").forEach(btn => btn.addEventListener("click", reset));
reset();
console.log(boxes);
console.log(boxes[1]);
console.log(boxes[1].getAttribute("value"));

//trigger when a box is clicked
function clickBox (evt) {
    clickCount++;
    console.log("clickCount = " + clickCount)
    if (clickCount%2 == 0) {
        evt.target.querySelector(".cross").style.display="block";
        evt.target.setAttribute("value","X");
        evt.target.removeEventListener("click", clickBox);
    } else {
        evt.target.querySelector(".circle").style.display="block";
        evt.target.setAttribute("value","O");
        evt.target.removeEventListener("click", clickBox);
    }
    winCheck();
}

//trigger when reset button is clicked, reset the game
function reset(evt) {
    if (evt) {
    evt.preventDefault();
    }
    clickCount=0;
    boxes.forEach(box => {
        box.querySelector(".cross").style.display ="none";
        box.querySelector(".circle").style.display ="none";
        box.addEventListener("click", clickBox);
        box.setAttribute("value","none");
        });
    document.querySelector(".popUp").style.display  = "none";
}
const winCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];


function winCheck () {
    for (i=0; i<winCombinations.length; i++) {
        let array=winCombinations[i];
        if ((boxes[array[0]].getAttribute("value")!== "none") && (boxes[array[1]].getAttribute("value")!== "none") && (boxes[array[2]].getAttribute("value")!== "none")) {   
            if ((boxes[array[0]].getAttribute("value") === boxes[array[1]].getAttribute("value")) && (boxes[array[1]].getAttribute("value") === boxes[array[2]].getAttribute("value"))) {
                displayWin(boxes[array[0]].getAttribute("value"));
            }
        }
    }
}

function displayWin (winner) {
    document.querySelector(".popUp").style.display  = "flex";
    document.querySelector(".winner").innerText  = winner;
    boxes.forEach(box => box.removeEventListener("click", clickBox))
}