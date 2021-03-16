import {EventEmitter, Injectable} from '@angular/core'
import { Ingredient } from 'prj-basics-final/prj-basics-final/src/app/shared/ingredient.model';
import { Subject } from 'rxjs';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from "./recipe.model";

@Injectable({providedIn:'root'})
export class RecipeService{


  onSelected = new EventEmitter<Recipe>();
  onRecipeEditClicked = new Subject<void>()


  private recipes:Recipe[] = [new Recipe('Burger','Awesome Burger','https://i.ndtvimg.com/i/2017-09/kebab_625x350_71504248496.jpg',
  [new Ingredient('Meat',10)]
  ),
  new Recipe('Burger','Awesome Burger','https://i.ndtvimg.com/i/2017-09/kebab_625x350_71504248496.jpg',
  [new Ingredient('Burger',20),new Ingredient('Masala',30)]
  ),
  new Recipe('Burger','Awesome Burger','https://i.ndtvimg.com/i/2017-09/kebab_625x350_71504248496.jpg',
  [new Ingredient('Rice',40),new Ingredient('Vegs',50),new Ingredient('Giinger',60)]
  )
]

  getRecipe(){
    return this.recipes;
  }

  getRecipeItem(index:number){
    return this.recipes.slice()[index]
  }


  constructor(private slService:ShoppingListService){

  }

  updateRecipe(index:number,updatedRecipe:Recipe){
    this.recipes[index] = updatedRecipe;
    console.log(this.recipes[index]);

  }

  addIngToShoppingService(ing:Ingredient[]){
    this.slService.addIngredients(ing)
  }


}
