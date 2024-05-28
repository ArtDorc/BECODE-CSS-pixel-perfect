const pokeContain = document.querySelector(".pokemonContainer");

for (let i=0;i<151; i++) {
    const img = document.createElement("img");
    img.classList.add("pokemonImage");
    img.setAttribute("src", `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i+1}.png`)
    pokeContain.appendChild(img);
}