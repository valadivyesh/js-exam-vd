let recipes = JSON.parse(localStorage.getItem("recipes")) || [];
let editIndex = null;
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("recipeList");
const search = document.getElementById("search");
const filterCuisine = document.getElementById("filterCuisine");
const form = document.getElementById("rec-form");
const title = document.getElementById("title");
const ingredients = document.getElementById("ingredients");
const instructions = document.getElementById("instructions");
const cuisine = document.getElementById("cuisine");


function DataSave() {
    localStorage.setItem("recipes", JSON.stringify(recipes));
}

function displayRecipes(data = recipes) {
    list.innerHTML = "";
    filterCuisine.innerHTML = `<option value="all">All</option>`;

    let cuisines = [...new Set(recipes.map(r => r.cuisine))];
    cuisines.forEach(c => {
        filterCuisine.innerHTML += `<option value="${c}">${c}</option>`;
    });

    if (data.length === 0) {
        list.innerHTML = "<p style='text-align:center;'>No recipes found</p>";
        return;
    }

    data.forEach((r, i) => {
        list.innerHTML += `
      <div class="card">
        <h4>${r.title}</h4>
        <p><b>Ingredients:</b> ${r.ingredients}</p>
        <p><b>Instructions:</b> ${r.instructions}</p>
        <p><b>Cuisine:</b> ${r.cuisine}</p>
        <button onclick="editRecipe(${i})">Edit</button>
        <button onclick="deleteRecipe(${i})">Delete</button>
      </div>
    `;
    });
}

form.addEventListener("submit", e => {
    e.preventDefault();
    if (!title.value || !ingredients.value) {
        alert("Please enter title and ingredients");
        return;
    }
    const recipe = {
        title: title.value.trim(),
        ingredients: ingredients.value.trim(),
        instructions: instructions.value.trim(),
        cuisine: cuisine.value.trim()
    };
    if (editIndex === null) {
        recipes.push(recipe);
    } else {
        recipes[editIndex] = recipe;
        editIndex = null;
        addBtn.textContent = "Add Recipe";
    }
   DataSave();
    displayRecipes();
    form.reset();
});

function editRecipe(i) {
    const r = recipes[i];
    title.value = r.title;
    ingredients.value = r.ingredients;
    instructions.value = r.instructions;
    cuisine.value = r.cuisine;
    editIndex = i;
    addBtn.textContent = "Update Recipe";
}

function deleteRecipe(i) {
    recipes.splice(i, 1);
    DataSave();
    displayRecipes();
}

search.addEventListener("input", () => {
    const val = search.value.toLowerCase();
    const filtered = recipes.filter(r =>
        r.title.toLowerCase().includes(val) ||
        r.ingredients.toLowerCase().includes(val)
    );
    displayRecipes(filtered);
});

filterCuisine.addEventListener("change", () => {
    const val = filterCuisine.value;
    if (val === "all") {
        displayRecipes();
    } else {
        displayRecipes(recipes.filter(r => r.cuisine === val));
    }
});

displayRecipes();