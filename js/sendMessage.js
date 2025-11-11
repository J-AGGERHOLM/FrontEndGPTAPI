const form = document.querySelector('#messageForm');
const URL = "http://localhost:8080/";
const ingredients = document.querySelector("#ingredients");

async function getRecipe() {

    const raw = ingredients.value;
    const ingredients = raw
        .split(",");

try {

    const response = await fetch(URL + "chat", {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ingredients)
    })
    if (!response.ok) {
        throw new Error(response.statusText);
    }

    const data = await response.json();



form.addEventListener("submit", getRecipe);
