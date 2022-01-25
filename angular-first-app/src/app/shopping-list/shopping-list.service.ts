import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/Ingredient.model";

export class ShoppingListService{
    ingredientsChanged = new EventEmitter<Ingredient[]>();
    _ingredients : Ingredient[] = [
        new Ingredient('Tomato',5),
        new Ingredient('Onion',10)
      ];

    getIngredients(){
        return this._ingredients.slice();
    }

    addIngredient(ingredient : Ingredient){
        this._ingredients.push(ingredient);
        this.ingredientsChanged.emit(this._ingredients.slice());
    }

    addIngredientFromRecipe(ingredients : Ingredient[]){
        this._ingredients.push(...ingredients);
        this.ingredientsChanged.emit(this._ingredients.slice());
    }
}