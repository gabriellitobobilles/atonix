import { Routes } from '@angular/router';
import { AuthGuardService } from '@AtonixWebSites/auth';
import { SummaryComponent } from './containers/summary/summary.component';

export const routes: Routes = [
  {
    path: '',
    component: SummaryComponent,
    canActivate: [AuthGuardService]
  }
];
