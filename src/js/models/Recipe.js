import "babel-polyfill";
import { apiKey } from '../views/base';

export default class Recipe {
    constructor(id) {
        this.id = id;
    }

    async getRecipe() {
        try {
            let res = await fetch(`https://api.spoonacular.com/recipes/${this.id}/information?apiKey=${apiKey}&includeNutrition=false`); 
            let data = await res.json();
            this.recipeId = data.id;
            this.title = data.title;
            this.img = data.image;
            this.instructions = data.instructions || 'No instructions';
            this.ingredients = data.extendedIngredients;

        } catch (error) {
            console.log(error);
        }
    }

    async getSimilarRecipe() {
        try {
            let res = await fetch(`https://api.spoonacular.com/recipes/${this.id}/similar?apiKey=${apiKey}&number=3`); 
            let data = await res.json();
            this.similarRecipe = data;
            
        } catch (error) {
            console.log(error);
        }
    }
} 