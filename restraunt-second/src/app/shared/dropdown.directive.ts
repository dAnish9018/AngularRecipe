import { Directive, HostBinding, HostListener } from "@angular/core";

@Directive({
  selector:'[appDropDown]'
})
export class AppDropDown{

  @HostBinding('class.open') isOpen = false;
  @HostListener('click') onClicking(){

    this.isOpen = !this.isOpen

  }

}
