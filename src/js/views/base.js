export const apiKey = 'c911c7a6e36c4e568e9996870383ab49';

export const elements = {
    searchForm: document.getElementById('form'),
    searchValue: document.querySelector('.form-control'),
    recipeList: document.querySelector('.recipe-list'),
    autocompleteList: document.querySelector('.autocomplete-list'),
    btnSubmit: document.querySelector('.btn-submit'),
    btnsRecipeList: document.querySelector('.btns-recipe-list'),
    recipe: document.querySelector('.recipe'),
    similarRecipes: document.querySelector('.similar-recipes'),
    similarRecipesHeading: document.querySelector('.similar-recipes-heading'),
    likesDropdown: document.querySelector('.likes-dropdown'),
    likesCounter: document.querySelector('.likes-counter'),
    likesBtn: document.querySelector('.likes-btn')
};

export const spinner = position => {
    position.innerHTML = '';

    let html = `
        <div class="text-center text-success" style="margin-top: 50px">
            <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
            </div>
        </div>
    `;
    
    position.insertAdjacentHTML('afterbegin', html);
};

export const clearRecipeList = () => {
    elements.recipeList.innerHTML = '';
    elements.btnsRecipeList.innerHTML = '';
};

export const clearSimilarRecipe = () => {
    elements.similarRecipesHeading.innerHTML = '';
    elements.similarRecipes.innerHTML = '';
};