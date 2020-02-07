import { Component, OnInit, EventEmitter, Output, Input, ChangeDetectionStrategy } from '@angular/core';
import { ThemeService } from '@AtonixWebSites/material';
import { Observable } from 'rxjs';

@Component({
  selector: 'atx-toolbar',
  template: `
    <mat-toolbar id="toolbar" color="primary">
      <span *ngIf="loggedIn">
        <button class="toolbar-button asset-tree-button" title="Toggle Asset Navigator" (click)="toggleAssetNavigator.emit()">
          <img class="asset-tree-image" width="20" height="20" src="./assets/icons/nav-tree.png" />
        </button>
      </span>
      <img class="logo" src="./assets/images/atonix-logo-rev.png" />
      <span class="headline d-none d-sm-block">Workflow Management</span> <span class="right-justify"></span>
    </mat-toolbar>
  `,
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarComponent implements OnInit {
  useDarkTheme: Observable<boolean>;

  constructor(private themeService: ThemeService) {}

  @Output() toggleAssetNavigator = new EventEmitter();

  @Output() logOut = new EventEmitter();

  @Input() loggedIn = false;

  ngOnInit() {
    this.useDarkTheme = this.themeService.useLightTheme;
  }

  toggleDarkTheme(useDarkTheme: boolean) {
    this.themeService.setDarkTheme(useDarkTheme);
  }
}
