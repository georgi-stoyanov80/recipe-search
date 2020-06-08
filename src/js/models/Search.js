import "babel-polyfill";
import * as searchView from '../views/searchView';
import { apiKey } from '../views/base';

export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getResults() {
        try {
            let res = await fetch(`https://api.spoonacular.com/recipes/search?apiKey=${apiKey}&query=${this.query}&number=30`);
            let data = await res.json();
            this.baseUri = data.baseUri;
            this.results = data.results;

        } catch (error) {
            console.log(error); 
        }
    }

    async autocompleteSearch() {
        try {
            let res = await fetch(`https://api.spoonacular.com/recipes/autocomplete?apiKey=${apiKey}&number=5&query=${this.query}`);
            let data = await res.json();
            searchView.renderListAutocomplete(data);
            
        } catch (error) {
            console.log(error); 
        }
    }
}