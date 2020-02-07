import { AuthGuardService } from '@AtonixWebSites/auth';
import { SummaryComponent } from './containers/summary/summary.component';
export var routes = [
    {
        path: '',
        component: SummaryComponent,
        canActivate: [AuthGuardService]
    }
];
//# sourceMappingURL=performance-analyst-charts-routing.module.js.map