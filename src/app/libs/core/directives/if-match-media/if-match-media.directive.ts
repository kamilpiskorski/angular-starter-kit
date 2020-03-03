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

  constructor(private zone: NgZone,
              @Inject(PLATFORM_ID) platformId: string,
              private templateRef: TemplateRef<IfMatchMediaDirective>,
              private viewContainer: ViewContainerRef) {
    super(platformId);

    this.matchMediaListener = () => {
      this.zone.run(() => {
        if (this.matchMedia.matches) {
          this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
          this.viewContainer.clear();
        }
      });
    };
  }
}
