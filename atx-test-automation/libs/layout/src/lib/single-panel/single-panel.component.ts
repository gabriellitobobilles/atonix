import { Component } from '@angular/core';
import { AuthFacade, UserFacade } from '@AtonixWebSites/auth';
import { LayoutComponent } from '../layout.component';
import { LayoutFacade } from '../state/layout.facade';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'atx-single-panel',
  templateUrl: './single-panel.component.html',
  styleUrls: ['../layout.component.scss']
})
export class SinglePanelComponent extends LayoutComponent {
  constructor(
    private mySanitizer: DomSanitizer,
    private myAuthFacade: AuthFacade,
    private myUserFacade: UserFacade,
    private myLayoutFacade: LayoutFacade
  ) {
    super(mySanitizer, myAuthFacade, myUserFacade, myLayoutFacade);
  }
}
