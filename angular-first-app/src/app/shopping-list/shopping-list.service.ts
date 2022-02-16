import { Subject } from "rxjs";
import { Ingredient } from "../shared/Ingredient.model";

export class ShoppingListService{
    startedEditing = new Subject<number>();
    ingredientsChanged = new Subject<Ingredient[]>();
    _ingredients : Ingredient[] = [
        new Ingredient('Tomato',5),
        new Ingredient('Onion',10)
      ];

    getIngredients(){
        return this._ingredients.slice();
    }

    getIngredient(index: number){
        return this._ingredients[index];
    }

    addIngredient(ingredient : Ingredient){
        this._ingredients.push(ingredient);
        this.ingredientsChanged.next(this._ingredients.slice());
    }

    addIngredientFromRecipe(ingredients : Ingredient[]){
        this._ingredients.push(...ingredients);
        this.ingredientsChanged.next(this._ingredients.slice());
    }

    updateIngredient(index: number, newIngredient: Ingredient){
        this._ingredients[index] = newIngredient;
        this.ingredientsChanged.next(this._ingredients.slice());
    }

    deleteIngredient(index: number){
        this._ingredients.splice(index, 1);
        this.ingredientsChanged.next(this._ingredients);
    }
}