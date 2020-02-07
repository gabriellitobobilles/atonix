import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './containers/main/main.component';
import { MaterialModule } from '@AtonixWebSites/material';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthGuardService, AuthModule } from '@AtonixWebSites/auth';
import { TodoComponent } from './todo/todo.component';
import { childRoutes } from './views-routing.module';
import { reducer } from './state/tab-view.reducer';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MatButtonModule } from '@angular/material/button';
import { TabViewEffects } from './state/tab-view.effects';
import { TabViewFacade } from './state/tab-view.facade';
import { WeatherComponent } from './containers/tabs/weather/weather.component';
import { SummaryComponent } from './containers/tabs/summary/summary.component';
import { ReportComponent } from './containers/tabs/report/report.component';
import { MapComponent } from './containers/tabs/map/map.component';
import { AlertsComponent } from './containers/tabs/alerts/alerts.component';
import { ChartGalleryComponent } from './containers/tabs/chart-gallery/chart-gallery.component';
import { AdaptivePlanningComponent } from './containers/tabs/adaptive-planning/adaptive-planning.component';
import { IssuesComponent } from './containers/tabs/issues/issues.component';
import { PerformanceAnalystIssuesComponent } from './containers/tabs/performance-analyst-issues/performance-analyst-issues.component';
import { AssetTreeModule } from '@AtonixWebSites/asset-tree';
import { LayoutModule } from '@AtonixWebSites/layout';
import { TimeRangeSelectorModule } from '@AtonixWebSites/time-range-selector';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    MatIconModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forFeature('tabview', reducer),
    EffectsModule.forFeature([TabViewEffects]),
    AuthModule,
    LayoutModule,
    AssetTreeModule,
    MatButtonModule,
    TimeRangeSelectorModule,
    RouterModule.forChild([
      {
        path: 'views',
        component: MainComponent,
        children: childRoutes,
        canActivate: [AuthGuardService]
      }
    ])
  ],
  declarations: [
    AlertsComponent,
    MapComponent,
    ReportComponent,
    ChartGalleryComponent,
    WeatherComponent,
    MainComponent,
    TodoComponent,
    SummaryComponent,
    AdaptivePlanningComponent,
    IssuesComponent,
    PerformanceAnalystIssuesComponent
  ],
  exports: [MainComponent],
  providers: [TabViewFacade]
})
export class ViewsModule {}
