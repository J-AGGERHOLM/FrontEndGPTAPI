const form = document.querySelector('#messageForm');
const URL = "http://localhost:8080/";
const ingredients = document.getElementById("ingredients");
const recipeOutput = document.querySelector("#RecipeOutput");

async function getRecipe(event) {
    event.preventDefault();

    const ingredient = ingredients.value.split(",");

    const loadingMessages = [
        "Checking ingredients... 🍅",
        "Speaking with head chef... 👨‍🍳",
        "Mixing recipe... 🥄",
        "Almost done... 🔥"
    ];

    try {

        for (const message of loadingMessages) {
            recipeOutput.textContent = message
            await new Promise(resolve => setTimeout(resolve, 1000))
        }

        const response = await fetch(URL + "chat", {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(ingredient)
        })

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        const data = await response.json();
        recipeOutput.textContent = data.Choices[0].message.content;
        console.log(data)


    }catch(err) {
        console.log(err);}
}


form.addEventListener("submit", getRecipe);