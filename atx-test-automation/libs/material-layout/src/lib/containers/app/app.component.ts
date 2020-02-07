import { Component, OnInit, DoCheck, ChangeDetectorRef, HostListener, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { AppUserAuth, AuthFacade } from '@AtonixWebSites/auth';
import { ThemeService } from '@AtonixWebSites/material';
import { LayoutFacade } from '../../state/layout.facade';
import * as _ from 'lodash';

@Component({
  selector: 'atx-layout-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LayoutAppComponent implements OnInit, DoCheck {
  showSidenav$: Observable<boolean>;
  componentActive = true;
  sidenavWidth$: Observable<number>;
  loggedIn$: Observable<boolean>;
  user$: Observable<AppUserAuth>;
  useLightTheme$: Observable<boolean>;
  innerWidth: number;
  constructor(
    private layoutFacade: LayoutFacade,
    private changeDetector: ChangeDetectorRef,
    private themeService: ThemeService,
    private authFacade: AuthFacade
  ) {}

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    this.loggedIn$ = this.authFacade.loggedIn$;
    this.user$ = this.authFacade.authUser$;
    this.showSidenav$ = this.layoutFacade.showSideNav$;
    this.sidenavWidth$ = this.layoutFacade.sidenavWidth$;
    this.useLightTheme$ = this.themeService.useLightTheme;
  }

  public resizeSideNav($event) {
    if (!_.isNil($event.resizeWidth)) {
      this.layoutFacade.setSideNavWidth($event.resizeWidth);
    }
  }

  public ngDoCheck(): void {
    this.changeDetector.detectChanges();
  }
  resetLayout() {
    if (this.innerWidth >= 700) {
      this.layoutFacade.openSidenav();
    }
  }

  toggleAssetNavigator() {
    this.layoutFacade.toggleAssetNavigator();
  }

  closeSidenav() {
    this.layoutFacade.closeSideNav();
  }

  openSidenav() {
    this.layoutFacade.openSidenav();
  }

  logout() {
    this.authFacade.logout();
    this.layoutFacade.closeSideNav();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = event.target.innerWidth;
    if (event.target.innerWidth < 700) {
      this.layoutFacade.closeSideNav();
    }
  }
}
