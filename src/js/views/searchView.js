import { elements, clearRecipeList } from './base';
import { setAutocompleteRecipe } from '../index';

export const limitRecipeTitle = (title, limit = 15) => {
    const newTitle = [];
    if (title.length > limit) {
        title.split(' ').reduce((acc, cur) => {
            if (acc + cur.length <= limit) {
                newTitle.push(cur);
            }
            return acc + cur.length;
        }, 0);

        return `${newTitle.join(' ')} ...`;
    }
    return title;
};

const createButton = (page, type, position) => `
        <button type="button" class="btn btn-success btn-sm btn-inline ${position}" data-goto=${type === 'next' ? page + 1 : page - 1}>
            ${type}
        </button>
    `;
    
const renderButtons = (page, numResults, resPerPage) => {
    let pages = Math.ceil(numResults / resPerPage);
    let button;
    
    if (page === 1 && pages > 1) {
		button = createButton(page, 'next', 'float-right');
    
    } else if (page < pages) {
        button = `
            ${createButton(page, 'prev', 'float-left')}
            ${createButton(page, 'next', 'float-right')}
        `;
        
    } else if (page === pages && pages > 1) {
        button = createButton(page, 'prev', 'float-left');
        
    } else {
        button = '';
    }

    elements.btnsRecipeList.insertAdjacentHTML('beforeend', button);
};

export const renderListRecipe = (results, baseUri, page = 1, resPerPage = 10) => {
    let start = (page - 1) * resPerPage;
    let end = page * resPerPage;

    if (results) {
        clearRecipeList();
           
        results.slice(start, end).forEach(item => {
            let html = `
                <a href="#${item.id}" class="list-group-item list-group-item-action recipe-list-item">
                    <img src="${baseUri + item.image}" class="list-image" alt="${item.title}">
                    ${limitRecipeTitle(item.title)}
                </a>
            `;
            
            elements.recipeList.insertAdjacentHTML('beforeend', html);
        });
            
        renderButtons(page, results.length, resPerPage);
    }
}

export const renderListAutocomplete = data => {
    let val = elements.searchValue.value;
    elements.autocompleteList.innerHTML = '';

    if (val) {
        data.forEach(item => {
            let html = `
                <a class="autocomplete-list-item list-group-item list-group-item-action">${item.title}</a>
            `; 

            elements.autocompleteList.insertAdjacentHTML('beforeend', html); 
            getAutocompleteList(document.querySelectorAll('.autocomplete-list-item'));
        }); 
    } else if (val.length === 0) {
        elements.autocompleteList.innerHTML = '';
    } 
}

const getAutocompleteList = list => list.forEach(setAutocompleteRecipe);




