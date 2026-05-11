// main.js

// Run the init() function when the page has loaded
window.addEventListener("DOMContentLoaded", init);

// Starts the program, all function calls trace back here
function init() {
	// Get the recipes from localStorage
	let recipes = getRecipesFromStorage();
	// Add each recipe to the <main> element
	addRecipesToDocument(recipes);
	// Add the event listeners to the form elements
	initFormHandler();
}

/**
 * Reads 'recipes' from localStorage and returns an array of
 * all of the recipes found (parsed, not in string form). If
 * nothing is found in localStorage for 'recipes', an empty array
 * is returned.
 * @returns {Array<Object>} An array of recipes found in localStorage
 */
function getRecipesFromStorage() {
	return JSON.parse(localStorage.getItem('recipes')) || [];
}

/**
 * Takes in an array of recipes and for each recipe creates a
 * new <recipe-card> element, adds the recipe data to that card
 * using element.data = {...}, and then appends that new recipe
 * to <main>
 * @param {Array<Object>} recipes An array of recipes
 */
function addRecipesToDocument(recipes) {
	const main = document.querySelector('main');
	recipes.forEach((recipe) => {
		const recipeCard = document.createElement('recipe-card');
		recipeCard.data = recipe;
		main.append(recipeCard);
	});
}

/**
 * Takes in an array of recipes, converts it to a string, and then
 * saves that string to 'recipes' in localStorage
 * @param {Array<Object>} recipes An array of recipes
 */
function saveRecipesToStorage(recipes) {
	localStorage.setItem('recipes', JSON.stringify(recipes));
}

/**
 * Adds the necessary event handlers to <form> and the clear storage
 * <button>.
 */
function initFormHandler() {
	// B2. Get a reference to the <form> element
	const form = document.querySelector('form');

	// B3. Add an event listener for the 'submit' event
	form.addEventListener('submit', (e) => {
		e.preventDefault();

		// B4. Create a new FormData object from the <form> element
		const formData = new FormData(form);

		// B5. Create an empty object and extract keys/values from FormData
		const recipeObject = {};
		for (const [key, value] of formData) {
			recipeObject[key] = value;
		}

		// B6. Create a new <recipe-card> element
		const recipeCard = document.createElement('recipe-card');

		// B7. Add the recipeObject data to <recipe-card>
		recipeCard.data = recipeObject;

		// B8. Append this new <recipe-card> to <main>
		document.querySelector('main').append(recipeCard);

		// B9. Get recipes from localStorage, add new recipe, save back
		const recipes = getRecipesFromStorage();
		recipes.push(recipeObject);
		saveRecipesToStorage(recipes);
	});

	// B10. Get a reference to the "Clear Local Storage" button
	const clearButton = document.querySelector('button.danger');

	// B11. Add a click event listener to clear local storage button
	clearButton.addEventListener('click', () => {
		// B12. Clear the local storage
		localStorage.clear();

		// B13. Delete the contents of <main>
		document.querySelector('main').innerHTML = '';
	});
}
