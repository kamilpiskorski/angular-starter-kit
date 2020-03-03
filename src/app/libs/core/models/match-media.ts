// Angular
import { Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export abstract class MatchMedia implements OnInit, OnDestroy {

  public mediaQuery: string;
  public matchMedia: MediaQueryList;
  public matchMediaListener: () => void;

  public isBrowser: boolean;

  protected constructor(@Inject(PLATFORM_ID) platformId: string) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    if (this.isBrowser) {
      this.matchMedia = window.matchMedia(this.mediaQuery);
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
