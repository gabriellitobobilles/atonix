import { Component, OnInit, EventEmitter, OnDestroy, Output } from '@angular/core';
import { UserFacade } from '@AtonixWebSites/auth';
import { IAppContext } from '@AtonixWebSites/api';
import { Observable } from 'rxjs';
import * as _ from 'lodash';

@Component({
  selector: 'atx-app-overlay',
  templateUrl: './app-overlay.component.html',
  styleUrls: ['./app-overlay.component.scss']
})
export class AppOverlayComponent implements OnInit, OnDestroy {
  constructor(private userFacade: UserFacade) {}
  appContexts$: Observable<IAppContext[]>;
  selectedAppContext$: Observable<IAppContext>;
  @Output() cancel = new EventEmitter();

  ngOnInit() {
    this.appContexts$ = this.userFacade.appContexts$;
    this.selectedAppContext$ = this.userFacade.selectedAppContext$;
  }

  setAppContext(appContext: IAppContext) {
    this.userFacade.setAppContext(appContext.AppContextID);
    this.cancel.emit();
  }

  ngOnDestroy() {}
}
