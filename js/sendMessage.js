const form = document.querySelector('#messageForm');
const URL = "http://localhost:8080/";
const ingredients = document.getElementById("ingredients");
const recipeOutput = document.querySelector("#RecipeOutput");

async function getRecipe(event) {
    event.preventDefault();

    const ingredient = ingredients.value.split(",");

    const loadingMessages = [
        "Calling Grandma... 👵",
        "Speaking with Gordon Ramsay... 👨‍🍳",
        "Mixing recipe... 🥄",
        "Almost done... 🔥"
    ];

    try {
        // Make text centered while loading
        recipeOutput.style.display = "flex";
        recipeOutput.style.alignItems = "center";
        recipeOutput.style.justifyContent = "center";
        recipeOutput.style.textAlign = "center";
        recipeOutput.style.fontSize = "2.3rem";
        recipeOutput.style.fontSize = "bold";

        for (const message of loadingMessages) {
            recipeOutput.value = message;
            await new Promise(resolve => setTimeout(resolve, 1000));
        }

        const response = await fetch(URL + "chat", {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(ingredient)
        });

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        const data = await response.json();

        // Reset styling and show recipe normally
        recipeOutput.style.display = "";
        recipeOutput.style.alignItems = "";
        recipeOutput.style.justifyContent = "";
        recipeOutput.style.textAlign = "left";
        recipeOutput.style.fontSize = "";

        recipeOutput.value = data.Choices[0].message.content;

    } catch (err) {
        console.error(err);
        recipeOutput.value = "Oops! Something went wrong. 😔";
    }
}

form.addEventListener("submit", getRecipe);
