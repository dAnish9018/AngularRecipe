import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
   recipe:Recipe;
   id:number;
  constructor(private recipeService:RecipeService,
    private route:ActivatedRoute
    ) {

    }

  ngOnInit(): void {
    this.route.params.subscribe((param)=>{
      this.id = +param['id']
      this.recipe = this.recipeService.getRecipeItem(+param['id'])
    })

  }

  onAddToShoppingList(){
    this.recipeService.addIngToShoppingService(this.recipe.ingredients)
  }
  onEditRecipe(){
    this.recipeService.onRecipeEditClicked.next()
  }

}
