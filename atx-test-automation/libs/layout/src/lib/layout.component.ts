// This class is inherited by the single/double and triple panel layouts.
// Any code that can be generalized should be generalized here.

import { OnInit, Input, OnDestroy, HostListener } from '@angular/core';
import { Observable } from 'rxjs';
import { ResizeEvent } from 'angular-resizable-element';
import { AppUserAuth, AuthFacade, UserFacade, IAccountModelUser } from '@AtonixWebSites/auth';
import { IAppContext } from '@AtonixWebSites/api';
import { LayoutFacade } from './state/layout.facade';
import { takeWhile } from 'rxjs/operators';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

const mainPanelPadding = 5;

export class LayoutComponent implements OnInit, OnDestroy {
  // These are set by the application.  They typically won't change
  @Input() atxTitle = 'Atonix Application';

  // Things that will change at runtime
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.centerPanelWidthStyle = `${event.target.innerWidth - this.sidebarWidthAndPadding}px`;
  }

  public loggedIn$: Observable<boolean>; // Could probably use the authUser instead of the logged in flag
  public authUser$: Observable<AppUserAuth>;
  public accountModelUser$: Observable<IAccountModelUser>;
  public appContexts$: Observable<IAppContext[]>;
  public isAssetNavigatorOpened$: Observable<boolean>;
  public isTimeSelectorOpened$: Observable<boolean>;
  public logoClass$: Observable<string>;
  public assetNavigatorWidth$: Observable<number>;
  public timeSelectorHeight$: Observable<number>;
  public mainPanelBottom$: Observable<number>;

  public centerPanelHeight: SafeStyle;
  public timeSliderHeight: SafeStyle;
  public useLightTheme$: Observable<boolean>;

  sidebarWidthAndPadding: number;
  centerPanelWidthStyle: string;
  componentActive = true;

  constructor(
    private sanitizer: DomSanitizer,
    private authFacade: AuthFacade,
    private userFacade: UserFacade,
    private layoutFacade: LayoutFacade
  ) {}

  ngOnInit() {
    this.loggedIn$ = this.authFacade.loggedIn$;
    this.authUser$ = this.authFacade.authUser$;
    this.accountModelUser$ = this.userFacade.accountModelUser$;
    this.appContexts$ = this.userFacade.appContexts$;
    this.isAssetNavigatorOpened$ = this.layoutFacade.isAssetNavigatorOpened$;
    this.isTimeSelectorOpened$ = this.layoutFacade.isTimeSelectorOpened$;
    this.assetNavigatorWidth$ = this.layoutFacade.currentAssetNavigatorWidth$;
    this.useLightTheme$ = this.userFacade.lightTheme$;

    this.layoutFacade.currentAssetNavigatorWidth$.pipe(takeWhile(() => this.componentActive)).subscribe(width => {
      this.sidebarWidthAndPadding = width + mainPanelPadding;
      this.centerPanelWidthStyle = `${window.innerWidth - this.sidebarWidthAndPadding}px`;
    });

    this.layoutFacade.getMainPanelBottom$.pipe(takeWhile(() => this.componentActive)).subscribe(height => {
      this.centerPanelHeight = this.sanitizer.bypassSecurityTrustStyle(`calc(100% - ${height}px)`);
      this.timeSliderHeight = this.sanitizer.bypassSecurityTrustStyle(`${height - 5}px`);
    });
    this.timeSelectorHeight$ = this.layoutFacade.timeSelectorHeight$;
    this.mainPanelBottom$ = this.layoutFacade.getMainPanelBottom$;
    this.authFacade.loggedIn$.pipe(takeWhile(() => this.componentActive)).subscribe(loggedIn => {
      if (loggedIn) {
        this.userFacade.loadUserInfo();
        this.userFacade.loadAppContexts();
        this.authFacade.getTimeout();
      }
    });
    this.authFacade.getTimeoutInSeconds$.pipe(takeWhile(() => this.componentActive)).subscribe(timeoutInSeconds => {
      if (timeoutInSeconds > 0) {
        this.authFacade.startInactivityService(timeoutInSeconds);
      }
    });
  }

  logout() {
    this.layoutFacade.closeAssetNavigator();
    this.layoutFacade.closeTimeSelector();
    this.authFacade.logout();
  }

  toggleTimeSelector() {
    this.layoutFacade.toggleTimeSelector();
  }

  toggleAssetNavigator() {
    this.layoutFacade.toggleAssetNavigator();
  }

  onResizeEnd(event: ResizeEvent) {
    if (event.rectangle) {
      this.layoutFacade.setAssetNavigatorWidth(Number(event.rectangle.right));
    }
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }
}
