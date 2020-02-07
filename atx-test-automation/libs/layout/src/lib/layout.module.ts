import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResizableModule } from 'angular-resizable-element';
import { StoreModule } from '@ngrx/store';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MaterialModule } from '@AtonixWebSites/material';
import { AuthModule, UserFacade } from '@AtonixWebSites/auth';
import { reducer } from './state/layout.reducer';
import { LayoutFacade } from './state/layout.facade';
import { SinglePanelComponent } from './single-panel/single-panel.component';
import { DoublePanelComponent } from './double-panel/double-panel.component';
import { TriplePanelComponent } from './triple-panel/triple-panel.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { AppOverlayComponent } from './app-overlay/app-overlay.component';
import { AppOverlayService } from './app-overlay/app-overlay-service';

@NgModule({
  imports: [
    CommonModule,
    ResizableModule,
    MaterialModule,
    RouterModule,
    FontAwesomeModule,
    AuthModule,
    StoreModule.forFeature('layout', reducer)
  ],
  declarations: [SinglePanelComponent, DoublePanelComponent, TriplePanelComponent, NavbarComponent, AppOverlayComponent],
  providers: [LayoutFacade, UserFacade, AppOverlayService],
  entryComponents: [AppOverlayComponent],
  exports: [SinglePanelComponent, DoublePanelComponent, TriplePanelComponent]
})
export class LayoutModule {}
