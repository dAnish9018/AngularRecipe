import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import {Ingredient} from '../../shared/ingredient.model'


import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  editMode = false;
  editedRecipe:Recipe;
  editedIndex:number;
  ingValue = 'default'

  editForm:FormGroup;

  constructor(private route:ActivatedRoute,private router:Router,private recipeService:RecipeService) { }

  ngOnInit(): void {

    this.route.params.subscribe((param)=>{
      this.editedIndex = +param['id'];
      this.editMode = param['id'] != null;
      console.log(this.editMode);
      this.editedRecipe = this.recipeService.getRecipeItem(this.editedIndex);
    })

    this.initForm();


  }


  initForm(){

    let recipeName:string ;
    let imagePath:string ;
    let description:string ;
    let ingredients = new FormArray([]);

    if(this.editMode){
      if(this.editedRecipe){

        recipeName = this.editedRecipe.name
        imagePath = this.editedRecipe.imagePath
        description = this.editedRecipe.description

        if(this.editedRecipe['ingredients']){
          for(let ing of this.editedRecipe.ingredients){
            ingredients.push(new FormGroup({
              'name' : new FormControl(ing.name,Validators.required),
              'amount' : new FormControl(ing.amount,[Validators.required])
            }))
          }
        }


      }
    }else{

    }

    this.editForm = new FormGroup({
      'name' :new FormControl(recipeName,Validators.required),
      'imagePath' : new FormControl(imagePath,Validators.required),
      'description' : new FormControl(description,Validators.required),
      'ingredients' : ingredients
    })

  }

  getControls() {
    return (<FormArray>this.editForm.get('ingredients')).controls;
  }



  onSubmit(){


    if(this.editForm){
      console.log('updating recipe...');

      this.recipeService.updateRecipe(this.editedIndex, this.editForm.value);
    }

    this.router.navigate(['../'],{relativeTo:this.route})

  }

  onRecipeIngDelete(index:number){

    (<FormArray>this.editForm.get('ingredients')).removeAt(index)


  }

  onAddIngredient(){
    const control = new FormGroup({
      'name' : new FormControl(null,Validators.required),
      'amount' : new FormControl(null,Validators.required)
    });
     (<FormArray>this.editForm.get('ingredients')).push(control);

     console.log((<FormArray>this.editForm.get('ingredients')).valid);

  }

  checkIngredientValidation(){


   return (<FormArray>this.editForm.get('ingredients')).valid;
  }

  onCancel(){
    this.router.navigate(['../'],{relativeTo:this.route})
  }

}
