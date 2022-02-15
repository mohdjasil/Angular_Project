import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/Ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService{
    recipesChanged = new Subject<Recipe[]>();
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

    getRecipe(index : number){
        return this._recipes[index];
    }

    addIngredientToShoppingList(ingredients : Ingredient[]){
        this.shoppingListService.addIngredientFromRecipe(ingredients);
    }

    addRecipe(recipe: Recipe){
        this._recipes.push(recipe);
        this.recipesChanged.next(this._recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe){
        this._recipes[index] = newRecipe;
        this.recipesChanged.next(this._recipes.slice());
    }

    deleteRecipe(index: number){
        this._recipes.splice(index, 1);
        this.recipesChanged.next(this._recipes.slice());
    }
}