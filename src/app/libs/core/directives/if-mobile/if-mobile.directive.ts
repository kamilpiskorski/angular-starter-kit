// Angular
import { Directive, Inject, Input, NgZone, PLATFORM_ID, TemplateRef, ViewContainerRef } from '@angular/core';
// Models
import { MatchMedia } from '../../models';

@Directive({
  selector: '[appIfMobile]'
})
export class IfMobileDirective extends MatchMedia {

  @Input('appIfMobile')
  public visible: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: string,
              zone: NgZone,
              templateRef: TemplateRef<IfMobileDirective>,
              viewContainer: ViewContainerRef) {
    super(platformId);

    this.mediaQuery = '(max-width: 1263px)';
    this.matchMediaListener = () => {
      zone.run(() => {
        if (this.visible === this.matchMedia.matches) {
          viewContainer.createEmbeddedView(templateRef);
        } else {
          viewContainer.clear();
        }
      });
    };
  }
}
