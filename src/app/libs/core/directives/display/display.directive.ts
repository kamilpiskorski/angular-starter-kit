// Angular
import { Directive, Inject, Input, NgZone, OnDestroy, OnInit, PLATFORM_ID, TemplateRef, ViewContainerRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appDisplay]'
})
export class DisplayDirective implements OnInit, OnDestroy {

  @Input('appDisplay')
  public query: 'mobile' | 'desktop';

  private hasView: boolean;
  private readonly isBrowser: boolean;

  private readonly desktopScreenWidth: number;

  private matchMedia: MediaQueryList;
  private readonly matchMediaListener: () => void;

  constructor(private zone: NgZone,
              @Inject(PLATFORM_ID) private platformId: string,
              private templateRef: TemplateRef<DisplayDirective>,
              private viewContainer: ViewContainerRef) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.desktopScreenWidth = 960;

    this.matchMediaListener = () => {
      this.zone.run(() => {
        if (this.matchMedia.matches && !this.hasView) {
          this.viewContainer.createEmbeddedView(this.templateRef);
          this.hasView = true;
        } else if (!this.matchMedia.matches && this.hasView) {
          this.viewContainer.clear();
          this.hasView = false;
        }
      });
    };
  }

  ngOnInit() {
    if (this.isBrowser) {
      const query = this.query === 'mobile' ? `(max-width: ${this.desktopScreenWidth - 1}px)` : `(min-width: ${this.desktopScreenWidth}px)`;

      this.matchMedia = window.matchMedia(query);
      this.matchMedia.addListener(this.matchMediaListener);
      this.matchMediaListener();
    }
  }

  ngOnDestroy() {
    if (!!this.matchMedia) {
      this.matchMedia.removeListener(this.matchMediaListener);
    }
  }
}
