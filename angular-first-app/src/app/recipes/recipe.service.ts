import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/Ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService{
    recipeSelected = new EventEmitter<Recipe>();

    private _recipes : Recipe[] = [
        new Recipe(
            'Burger',
            'This is just a test recipe',
            'https://nationaltoday.com/wp-content/uploads/2021/07/Kebab-Day.jpg',
            [
                new Ingredient('Chicken',5),
                new Ingredient('Bun',2)
            ]),
        new Recipe(
            'Shawarma',
            'This is just a test recipe',
            'https://nationaltoday.com/wp-content/uploads/2021/07/Kebab-Day.jpg',
            [
                new Ingredient('Meat',5),
                new Ingredient('Egg',10)
            ])
      ];

    constructor(private shoppingListService : ShoppingListService) {

    } 

    getRecipes(){
        return this._recipes.slice();
    }

    addIngredientToShoppingList(ingredients : Ingredient[]){
        this.shoppingListService.addIngredientFromRecipe(ingredients);
    }
}