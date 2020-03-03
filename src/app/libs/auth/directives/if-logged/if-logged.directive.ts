// Angular
import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
// Services
import { AuthService } from '../../services/auth.service';

@Directive({
  selector: '[appIfLogged]'
})
export class IfLoggedDirective {

  constructor(private templateRef: TemplateRef<IfLoggedDirective>,
              private viewContainer: ViewContainerRef,
              private authService: AuthService) {
  }

  @Input('appIfLogged')
  public set visibility(condition: boolean) {
    if (condition === !!this.authService.authTokenValue) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}