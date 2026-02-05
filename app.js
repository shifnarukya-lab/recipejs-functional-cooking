// ------------------ Recipe Data ------------------
// Original data NEVER changes (important for functional programming)
const recipes = [
  { id: 1, title: "Classic Spaghetti Carbonara", time: 25, difficulty: "easy", description: "A creamy Italian pasta dish.", category: "pasta" },
  { id: 2, title: "Chicken Tikka Masala", time: 45, difficulty: "medium", description: "Tender chicken in spiced sauce.", category: "curry" },
  { id: 3, title: "Homemade Croissants", time: 180, difficulty: "hard", description: "Buttery French pastries.", category: "baking" },
  { id: 4, title: "Greek Salad", time: 15, difficulty: "easy", description: "Fresh vegetables and feta.", category: "salad" },
  { id: 5, title: "Beef Wellington", time: 120, difficulty: "hard", description: "Beef wrapped in pastry.", category: "meat" },
  { id: 6, title: "Vegetable Stir Fry", time: 20, difficulty: "easy", description: "Quick mixed vegetables.", category: "vegetarian" },
  { id: 7, title: "Pad Thai", time: 30, difficulty: "medium", description: "Thai noodles with sauce.", category: "noodles" },
  { id: 8, title: "Margherita Pizza", time: 60, difficulty: "medium", description: "Classic pizza.", category: "pizza" }
];

// ------------------ DOM Elements ------------------
const recipeContainer = document.querySelector("#recipe-container");
const filterButtons = document.querySelectorAll(".filters button");
const sortButtons = document.querySelectorAll(".sorts button");

// ------------------ App State ------------------
//State variables control what is shown
let currentFilter = "all";
let currentSort = "none";

// ------------------ Pure Functions ------------------

// Creates HTML for ONE recipe card (pure function)
const createRecipeCard = (recipe) => `
  <div class="recipe-card">
    <h3>${recipe.title}</h3>
    <p>${recipe.time} min | ${recipe.difficulty}</p>
    <p>${recipe.description}</p>
  </div>
`;

// Filters recipes based on current filter (pure)
const filterRecipes = (recipes, filter) => {
  if (filter === "all") return recipes;

  if (filter === "quick"){
    return recipes.filter(r => r.time <= 30);
} 
  return recipes.filter(r => r.difficulty === filter);
};

// Sorts recipes based on current sort (pure)
const sortRecipes = (recipes, sortType) => {
  if (sortType === "name") {
    return [...recipes].sort((a, b) => a.title.localeCompare(b.title));
}
  if (sortType === "time") {
    return [...recipes].sort((a, b) => a.time - b.time);
  }
  return recipes; // default (no sorting)
};

// ------------------ Render ------------------

// Displays recipes on the page
const renderRecipes = (recipesToRender) => {
  recipeContainer.innerHTML = recipesToRender
  .map(createRecipeCard)
  .join("");
};

// ------------------ Update Display ------------------
// Central function (VERY IMPORTANT FOR KALVIUM)
const updateDisplay = () => {
  const filtered = filterRecipes(recipes, currentFilter);
  const sorted = sortRecipes(filtered, currentSort);
  renderRecipes(sorted);
};

// ------------------ Event Listeners ------------------

// Filter buttons
filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(b => b.classList.remove("active"));
    button.classList.add("active");
    
    currentFilter = button.dataset.filter;
    updateDisplay();
  });
});

// Sort buttons
sortButtons.forEach(button => {
  button.addEventListener("click", () => {
    sortButtons.forEach(b => b.classList.remove("active"));
    button.classList.add("active");
    
    currentSort = button.dataset.sort;
    updateDisplay();
  });
});

// ------------------ Initial Render ------------------
updateDisplay();