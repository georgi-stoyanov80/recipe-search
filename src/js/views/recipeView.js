import { elements, clearSimilarRecipe } from './base';

export const renderRecipe = (recipe, isLiked) => {
    elements.recipe.innerHTML = '';

    let html = `
        <h4 class="text-center text-success">${recipe.title}</h4>
        <div class="main-image mb-3 mt-4">
            <img src="${recipe.img}" alt="${recipe.title}">
        </div>

        <h5>Ingredients:</h5>
        <ul class="list-group mb-3">
            ${recipe.ingredients.map(ing => `
                <li class="list-group-item">${ing.original}</li>
            `).join('')}
        </ul>

        <h5>Instructions:</h5>
        <ul class="list-group mb-3">
            <li class="list-group-item">${recipe.instructions}</li>
        </ul>

        <button type="button" class="btn btn-success likes-btn" ${isLiked ? 'disabled' : ''} data-recipeId=${recipe.recipeId}>
            ${isLiked ? 'added in likes' : 'add to favorites'}  
        </button>
    `;

    elements.recipe.insertAdjacentHTML('beforeend', html);
};

export const renderSimilarRecipe = similarRecipe => {
    clearSimilarRecipe();
    elements.similarRecipesHeading.insertAdjacentHTML('beforeend', '<h5>Similar Recipes:</h5>');

    similarRecipe.forEach(item => {
        let html = `
            <a href="#${item.id}" class="col-sm-3 text-decoration-none mr-1">
                <div class="card border border-success">
                    <div class="card-body">
                        <h5 class="card-text text-body">${item.title}</h5>
                        <p class="card-text text-body">servings: ${item.servings}</p>
                        <p class="card-text text-body">ready in minutes: ${item.readyInMinutes}</p>
                    </div>
                </div>
            </a>
        `;

        elements.similarRecipes.insertAdjacentHTML('beforeend', html);
    });
};

export const selectedList = () => {
    let recipeListItem = document.querySelectorAll('.recipe-list-item');

    recipeListItem.forEach(list => {    
        list.addEventListener('click', e => {
            let listImage = e.target.closest('.list-image');
            
            recipeListItem.forEach(item => item.classList.remove('active', 'bg-success'));
            e.target.classList.add('active', 'bg-success');
            if (listImage) {
                listImage.parentElement.classList.add('active', 'bg-success');
            }
        });
    });
};