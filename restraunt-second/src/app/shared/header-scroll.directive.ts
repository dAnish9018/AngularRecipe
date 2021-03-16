import { Directive, HostBinding, HostListener } from "@angular/core";

@Directive({
  selector:'[appHeadScroll]'
})
export class HeaderScroll{

  @HostBinding('class.headerscroll') isScrolling = false;
  @HostListener('document:scroll') onClicking(){


    if(document.scrollingElement.scrollTop > 0){
      this.isScrolling = true;
    }else{
      this.isScrolling = false;
    }

  }

}
