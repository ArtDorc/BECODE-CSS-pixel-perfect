const researchBar = document.querySelector(".interact .researchBar .researchInput");
const researchButton = document.querySelector(".interact .researchBar .researchButton")
const suggest = document.querySelector("#suggestions");
const main = document.querySelector("#recipeHolder");
/* let showed=true; */

researchBar.addEventListener("keyup",(e) => {
    if (e.key ==="Enter") {
        onClickResearch(e);
        /* researchBar.value=""; */
    }
})
researchBar.addEventListener("change",fetchSuggest); 

async function fetchSuggest() {
    if (researchBar.value.length>=3) {
        let response= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${researchBar.value}`);
        const data = await response.json();
        suggest.innerHTML="";
        for( let i=0; i<Math.min(data.meals.length,5);i++) {
            let dishName=data.meals[i].strMeal;
            suggest.innerHTML +=`<option value="${dishName}">${dishName}</option>`;
        }
    } else {
        suggest.innerHTML="";
    }
}

researchButton.addEventListener("click",onClickResearch);

function onClickResearch(e) {
    console.log("Input : "+researchBar.value);
    callAPI(researchBar.value);
}

async function callAPI(input) {
        try {
            if (input) {
                main.innerHTML="";
                let response= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`)
                const data = await response.json();
                main.style.display="block";
                data.meals.forEach( item => {
                    displayMeal(item);
                })
            } else {
                console.log("No input")
            }
        } catch {
            console.log (`Error calling the API with ${input}`);
        }
}

function displayMeal (meal) {
    let image = meal.strMealThumb;
    let category = meal.strCategory? meal.strCategory:"";;
    let name = meal.strMeal? meal.strMeal:"";
    let area = meal.strArea? meal.strArea:"";
    let subcategory=meal.strTags? meal.strTags:"";
    let instructions=meal.strInstructions? meal.strInstructions:"";
    instructions = instructions.replaceAll("\r\n","<br>");
/*     instructions = instructions.replaceAll("<br><br>","<br>"); */
    let youtubeLink=meal.strYoutube? meal.strYoutube:"";
    let youtubeLine=""
    youtubeLink?youtubeLine=`<a href="${youtubeLink}" target="_blank" class="yt"><div class="imgHolder">
                    <img class="YTlogo" src="Youtube_logo.png">
                </div>
                <p class="YTlink"> Show me</p>
            </a>`:youtubeLine;
    main.innerHTML += 
    `
<div class="recipeContainer" >
    <div class="meal">
        <div class="leftColumn">
            <div class="imgHolder"><img src="${image}" alt=""></div>
            <p class="area">${area}</p>
            <p class="category">${category}</p>
        </div>
        <div class="rightColumn">
            <h2 class="name">${name}</h2>
            <p class="subcategory">${subcategory}</p>
            <p class="instructions">${instructions}</p>
            ${youtubeLine}
            <ul class="ingredients">
                ${displayIngredients(meal)}
            </ul>
        </div>
    </div>
</div>`;
}

function displayIngredients (meal) {
    let displayed = ``
    for(let i=1; i<=20; i++) {
        if (meal[`strIngredient${i}`]) {
            let ingredient = meal[`strIngredient${i}`];
            let quantity = meal[`strMeasure${i}`];
            displayed += `<li>${ingredient} : ${quantity}</li>`
        }
    }
    return displayed;
}
/*     if (showed) {
        document.querySelector(".recipeContainer").style.transform="translateX(-130%)";
        showed=!showed;
    } else {
        document.querySelector(".recipeContainer").style.transform="none";
        showed=!showed;
    }
 */