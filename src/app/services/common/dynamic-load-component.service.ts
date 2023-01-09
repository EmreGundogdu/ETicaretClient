import { ComponentFactoryResolver, Injectable, ViewContainerRef } from '@angular/core';
import { BaseComponent } from 'src/app/base/base.component';

@Injectable({
  providedIn: 'root'
})
export class DynamicLoadComponentService {

  //ViewContainerRef : Dinamik olarak yüklecek componenti içerisinde barındıran container'dir (her dinamik yükleme sürecinde önceki view'leri clear etmemiz gerekmektedir.)
  //ComponentFactory : Componentlerin instance'lerini oluşturmak için kullanılan nesnedir.
  //ComponentFactoryResolver : Belirli bir component için ComponentFactory'i resolve eden sınıftır. İçerisindeki resolveComponentFactory fonk aracılığıyla ilgili componente dair ComponentFactory nesnesini opluşturup, döner.

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  async loadComponent(component: Component, viewContainerRef: ViewContainerRef) {
    let _component: any = null;
    switch (component) {
      case Component.BasketComponent:
        _component = await import("../../ui/components/baskets/baskets.component");
        break;
    }
    viewContainerRef.clear();
    return viewContainerRef.createComponent(this.componentFactoryResolver.resolveComponentFactory(_component))
  }
}

export enum Component {
  BasketComponent,
}
