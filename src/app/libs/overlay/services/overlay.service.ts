// Angular
import { ApplicationRef, ComponentFactoryResolver, Inject, Injectable, Injector, Type } from '@angular/core';
import { DOCUMENT } from '@angular/common';
// Models
import { Overlay } from '../models/overlay';
// External
import { first } from 'rxjs/operators';

@Injectable()
export class OverlayService {

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private applicationRef: ApplicationRef,
              private injector: Injector,
              @Inject(DOCUMENT) private document: Document) {
  }

  public create<T>(component: Type<T>) {
    const overlay = new Overlay();
    const injector = Injector.create({ providers: [{ provide: Overlay, useValue: overlay, deps: [] }], parent: this.injector });
    const componentRef = this.componentFactoryResolver.resolveComponentFactory<T>(component).create(injector);

    overlay.onPresent.pipe(
      first()
    ).subscribe(() => {
      this.applicationRef.attachView(componentRef.hostView);
      this.document.body.appendChild(componentRef.location.nativeElement);
    });

    overlay.onDismiss.pipe(
      first()
    ).subscribe(() => {
      this.applicationRef.detachView(componentRef.hostView);
      componentRef.destroy();
    });

    return overlay;
  }
}
