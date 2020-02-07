import { Component, OnInit, EventEmitter, Output, Input, ViewChild } from '@angular/core';
import { faCalendar, faTh } from '@fortawesome/free-solid-svg-icons';
import { AppUserAuth, IAccountModelUser } from '@AtonixWebSites/auth';
import { AppOverlayService } from '../app-overlay/app-overlay-service';
import { AppOverlayRef } from '../app-overlay/app-overlay-ref';
import { CdkOverlayOrigin } from '@angular/cdk/overlay';

@Component({
  selector: 'atx-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  faCalendar = faCalendar;
  faTh = faTh;
  @Output() toggleAssetNavigator = new EventEmitter();
  @Output() toggleTimeSelector = new EventEmitter();
  @Output() logOut = new EventEmitter();
  @Input() atxTitle = 'Atonix App';
  @Input() loggedIn = false;
  @Input() authUser: AppUserAuth;
  @Input() accountModelUser: IAccountModelUser;
  @Input() showAssetNavigatorButton = false;
  @Input() showTimeSelectorButton = false;
  @Input() logoClass: string;

  @ViewChild(CdkOverlayOrigin) origin: CdkOverlayOrigin;

  constructor(private appOverlayService: AppOverlayService) {}
  showAppContext() {
    const appOverlayRef: AppOverlayRef = this.appOverlayService.open(this.origin);
  }
  ngOnInit() {}
}
