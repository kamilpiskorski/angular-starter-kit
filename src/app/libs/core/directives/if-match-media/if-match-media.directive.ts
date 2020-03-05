// Angular
import { Directive, Inject, Input, NgZone, PLATFORM_ID, TemplateRef, ViewContainerRef } from '@angular/core';
// Models
import { MatchMedia } from '../../models';

@Directive({
  selector: '[appIfMatchMedia]'
})
export class IfMatchMediaDirective extends MatchMedia {

  @Input('appIfMatchMedia')
  public mediaQuery: string;

  constructor(@Inject(PLATFORM_ID) platformId: string,
              zone: NgZone,
              templateRef: TemplateRef<IfMatchMediaDirective>,
              viewContainer: ViewContainerRef) {
    super(platformId);

    this.matchMediaListener = () => {
      zone.run(() => {
        if (this.matchMedia.matches) {
          viewContainer.createEmbeddedView(templateRef);
        } else {
          viewContainer.clear();
        }
      });
    };
  }
}
