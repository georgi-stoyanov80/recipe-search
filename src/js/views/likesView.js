import { elements } from './base';
import { limitRecipeTitle } from './searchView';

export const renderLikes = likesObj => {
    elements.likesDropdown.innerHTML = '';

    likesObj.forEach(item => {
        let html = `
            <a href="#${item.id}" class="list-group-item list-group-item-action">
                <img class="list-image" src="${item.img}" alt="${item.title}">
                ${limitRecipeTitle(item.title, 20)}
                <span class="badge badge-success btn-delete-likes">X</span>
            </a>
        `;

        elements.likesDropdown.insertAdjacentHTML('beforeend', html);
    });
};

export const deleteLike = e => {
    if (e.target.classList.contains('btn-delete-likes')) {
        e.preventDefault();
        let a = e.target.parentElement;
        
        if (a) {
            a.parentElement.removeChild(a);
        }
    }
};
