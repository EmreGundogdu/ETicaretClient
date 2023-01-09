import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appDynamicLoadComponentDirective]'
})
export class DynamicLoadComponentDirectiveDirective {

  constructor(public viewContaineref: ViewContainerRef) { }

}
