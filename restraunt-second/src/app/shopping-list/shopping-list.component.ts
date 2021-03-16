import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  ingredients:Ingredient[];

  constructor(private shoppingListService:ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients()
    this.shoppingListService.addIng.subscribe(
      (ing:Ingredient) => {
        this.shoppingListService.addIngredient(ing)
      }
    )
  }

  onIngredientClick(index:number){
    this.shoppingListService.onIngredientEditStarted.next(index)
  }



}
