import { Component } from '@angular/core';
import { AuthFacade, UserFacade } from '@AtonixWebSites/auth';
import { LayoutComponent } from '../layout.component';
import { LayoutFacade } from '../state/layout.facade';
import { DomSanitizer } from '@angular/platform-browser';
import { expandContract } from '../animations/expand-contract';

@Component({
  selector: 'atx-double-panel',
  templateUrl: './double-panel.component.html',
  styleUrls: ['../layout.component.scss'],
  animations: [expandContract]
})
export class DoublePanelComponent extends LayoutComponent {
  constructor(
    private mySanitizer: DomSanitizer,
    private myAuthFacade: AuthFacade,
    private myUserFacade: UserFacade,
    private myLayoutFacade: LayoutFacade
  ) {
    super(mySanitizer, myAuthFacade, myUserFacade, myLayoutFacade);
  }
}
