import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/Ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService{
    recipesChanged = new Subject<Recipe[]>();
    // private _recipes : Recipe[] = [
    //     new Recipe(
    //         'Burger',
    //         'Burgers are so Awesommee',
    //         'https://nationaltoday.com/wp-content/uploads/2021/07/Kebab-Day.jpg',
    //         [
    //             new Ingredient('Chicken',5),
    //             new Ingredient('Bun',2)
    //         ]),
    //     new Recipe(
    //         'Shawarma',
    //         'Shawarmas are super Yummy',
    //         'https://static.toiimg.com/thumb/64696930.cms?imgsize=329052&width=800&height=800',
    //         [
    //             new Ingredient('Meat',5),
    //             new Ingredient('Egg',10)
    //         ])
    //   ];

    private _recipes: Recipe[] = [];

    constructor(private shoppingListService : ShoppingListService) {} 

    setRecies(recipes: Recipe[]){
        this._recipes = recipes;
        this.recipesChanged.next(this._recipes.slice());
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