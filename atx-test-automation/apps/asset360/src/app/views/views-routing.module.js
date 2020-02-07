import { AuthGuardService } from '@AtonixWebSites/auth';
import { ReportComponent } from './containers/tabs/report/report.component';
import { MapComponent } from './containers/tabs/map/map.component';
import { AlertsComponent } from './containers/tabs/alerts/alerts.component';
import { NotFoundComponent } from './containers/tabs/not-found/not-found.component';
import { AdaptivePlanningComponent } from './containers/tabs/adaptive-planning/adaptive-planning.component';
import { IssuesComponent } from './containers/tabs/issues/issues.component';
import { PerformanceAnalystIssuesComponent } from './containers/tabs/performance-analyst-issues/performance-analyst-issues.component';
export var childRoutes = [
    {
        path: 'chartgallery',
        // component: ChartGalleryComponent,
        loadChildren: './containers/tabs/performance-analyst-charts/performance-analyst-charts.module#PerformanceAnalystChartsModule'
    },
    {
        path: 'apAnalyst',
        canActivateChild: [AuthGuardService],
        component: AdaptivePlanningComponent
    },
    {
        path: 'issues',
        canActivateChild: [AuthGuardService],
        component: IssuesComponent
    },
    {
        path: 'fleet',
        canActivateChild: [AuthGuardService],
        component: MapComponent
    },
    {
        path: 'performanceAnalystReport',
        canActivateChild: [AuthGuardService],
        component: ReportComponent
    },
    {
        path: 'performanceAnalyst',
        // component: ChartGalleryComponent,
        loadChildren: './containers/tabs/performance-analyst-charts/performance-analyst-charts.module#PerformanceAnalystChartsModule'
    },
    {
        path: 'performanceAnalystAlerts',
        canActivateChild: [AuthGuardService],
        component: AlertsComponent
    },
    {
        path: 'alerts',
        canActivateChild: [AuthGuardService],
        component: AlertsComponent
    },
    {
        path: 'performanceAnalystIssues',
        canActivateChild: [AuthGuardService],
        component: PerformanceAnalystIssuesComponent
    },
    { path: '**', component: NotFoundComponent }
];
//# sourceMappingURL=views-routing.module.js.map