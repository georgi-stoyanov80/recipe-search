import "babel-polyfill";
import Search from './models/Search';
import Recipe from './models/Recipe';
import Likes from './models/Likes';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as likesView from './views/likesView';
import { elements, clearRecipeList, spinner } from './views/base';

let state = {};

// SEARCH CONTROLLER
const controlSearch = async e => {
    e.preventDefault();
    let query = elements.searchValue.value.trim();
    
    if (query) {
        state.search = new Search(query);
        clearRecipeList();
        spinner(elements.recipeList);

        try {  
            await state.search.getResults();
            searchView.renderListRecipe(state.search.results, state.search.baseUri);

            if (state.search) {
                recipeView.selectedList();
            }
            
        } catch (error) {
            console.log(error);
        }
    }
};

const autocomplete = async () => {
    let query = elements.searchValue.value.trim();

    if (query) {
        state.search = new Search(query);

        try {
            await state.search.autocompleteSearch();
            
        } catch (error) {
            console.log(error);
        }
    }
};

export const setAutocompleteRecipe = listItem => {
    listItem.addEventListener('click', e => {
        elements.searchValue.value = e.target.textContent;
        elements.btnSubmit.click();
    }); 
}

document.addEventListener('click', e => {
    if (!elements.autocompleteList.contains(e.target)) {
        elements.autocompleteList.innerHTML = '';
    }
});

elements.btnsRecipeList.addEventListener('click', e => {
    let btn = e.target;
    
    if (btn) {
        let goToPage = parseInt(btn.dataset.goto, 10);
        clearRecipeList();
        searchView.renderListRecipe(state.search.results, state.search.baseUri, goToPage);
        recipeView.selectedList();
    }
});

elements.searchForm.addEventListener('submit', controlSearch);
elements.searchForm.addEventListener('input', autocomplete);


// RECIPE CONTROLLER
const controlRecipe = async e => {
    let id = parseInt(e.target.location.hash.replace('#', ''), 10);

    state.recipe = new Recipe(id);
    spinner(elements.recipe);
    
    try {
        await state.recipe.getRecipe();
        await state.recipe.getSimilarRecipe();
        
        recipeView.renderRecipe(state.recipe, state.likes.isLiked(id));
        recipeView.renderSimilarRecipe(state.recipe.similarRecipe);
        
    } catch (error) {
        console.log(error);
    }
};

window.addEventListener('hashchange', controlRecipe);


// LIKES CONTROLLER
const controlLikes = e => {
    if (!state.likes) {
        state.likes = new Likes();
    }
    
    if (e.target.classList.contains('likes-btn')) {
        let obj = {
            id: state.recipe.id,
            img: state.recipe.img,
            title: state.recipe.title
        };

        state.likes.addLikes(obj);
        state.likes.isLiked(state.likes.likes.map(el => el.id));

        e.target.textContent = 'added in likes';
        e.target.disabled = true;
    }
    
    likesView.renderLikes(state.likes.likes);
    state.likes.likesCounter(elements.likesCounter);
};

const deleteLikeItem = e => {
    if (e.target.classList.contains('list-group-item')) {
        return;
		
    } else {
        likesView.deleteLike(e);
        state.likes.deleteLike(e);
        state.likes.likesCounter(elements.likesCounter);
        state.likes.isLiked(state.likes.likes.map(el => el.id));
    }
};

const persistStorage = () => {
    state.likes = new Likes();

    state.likes.getStorage();
    likesView.renderLikes(state.likes.likes);
    state.likes.likesCounter(elements.likesCounter);
};

elements.recipe.addEventListener('click', controlLikes);
elements.likesDropdown.addEventListener('click', deleteLikeItem);
window.addEventListener('load', persistStorage);

