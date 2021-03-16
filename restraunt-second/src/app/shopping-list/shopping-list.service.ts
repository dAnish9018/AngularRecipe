import { Ingredient } from "../shared/ingredient.model";
import {EventEmitter} from '@angular/core'
import { Subject } from "rxjs";
export class ShoppingListService{

  addIng = new EventEmitter<Ingredient>();
  onIngredientEditStarted = new Subject<number>()

  private ingredients:Ingredient[] = [new Ingredient('Bread',200),
  new Ingredient('Butter',300)
];

  getIngredients(){
    return this.ingredients;
  }

  getIngredientForEdit(index:number){
   return this.ingredients.slice()[index]
  }

  addIngredient(ing:Ingredient){
    this.ingredients.push(ing)
  }

  addIngredients(ing:Ingredient[]){
    this.ingredients.push(...ing)
  }

  updateIngredient(index:number,updatedIng:Ingredient){
    this.ingredients[index] = updatedIng;
    console.log(this.ingredients);

  }

  onDeleteIng(index:number){
    this.ingredients.splice(index,1)
  }

}
