// Angular
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
// Services
import { OverlayService } from './services/overlay.service';

@NgModule()
export class OverlayModule {

  constructor(@Optional() @SkipSelf() parentModule: OverlayModule) {
    if (parentModule) {
      throw new Error('OverlayModule has already been loaded. Import OverlayModule modules in the AppModule only.');
    }
  }

  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: OverlayModule,
      providers: [
        OverlayService
      ]
    };
  }
}
