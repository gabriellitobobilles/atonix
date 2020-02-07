import { Component, OnInit } from '@angular/core';
import { UserFacade } from '@AtonixWebSites/auth';
import { Observable } from 'rxjs';

@Component({
  selector: 'atx-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private userFacade: UserFacade) {}
  appContextID$: Observable<number>;

  ngOnInit() {
    this.appContextID$ = this.userFacade.selectedAppContextID$;
  }
}
