import { Component, OnInit,ViewChild,ElementRef, Output,EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('f',{static:false}) singUpFrom: NgForm;
   editedIngredient:Ingredient;
   editMode=false;
   editedIndex:number;
  constructor(private slService:ShoppingListService) { }

  ngOnInit(): void {
    this.slService.onIngredientEditStarted.subscribe(
      (index:number)=>{
        this.editMode = true;
        this.editedIndex = index;
       this.editedIngredient = this.slService.getIngredientForEdit(index);

       this.singUpFrom.form.setValue({
         name:this.editedIngredient.name,
         amount:this.editedIngredient.amount
       });


      }
    )
  }

  onAdd(form:{name:string,amount:number}){

     if(this.editMode){

       this.slService.updateIngredient(this.editedIndex,form)
     }
     else
     //this.slService.addIng.emit(new Ingredient(form.name,form.amount))
     this.slService.addIngredient(new Ingredient(form.name,form.amount))
     this.onClear()
  }

  onClear(){
    this.editMode = false;
    this.singUpFrom.reset()
  }

  onDelete(){
    this.slService.onDeleteIng(this.editedIndex)
    this.onClear()
  }

}
