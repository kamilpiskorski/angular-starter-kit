// Angular
import { Directive, Inject, Input, NgZone, PLATFORM_ID, TemplateRef, ViewContainerRef } from '@angular/core';
// Models
import { MatchMedia } from '../../models';

@Directive({
  selector: '[appIfMobile]'
})
export class IfMobileDirective extends MatchMedia {

  @Input('appIfMobile')
  public visibility: boolean;

  constructor(private zone: NgZone,
              @Inject(PLATFORM_ID) platformId: string,
              private templateRef: TemplateRef<IfMobileDirective>,
              private viewContainer: ViewContainerRef) {
    super(platformId);

    this.mediaQuery = '(max-width: 1263px)';
    this.matchMediaListener = () => {
      this.zone.run(() => {
        if (this.visibility === this.matchMedia.matches) {
          this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
          this.viewContainer.clear();
        }
      });
    };
  }
}
