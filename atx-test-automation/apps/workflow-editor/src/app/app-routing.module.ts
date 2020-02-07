import { NgModule, InjectionToken } from '@angular/core';
import { RouterModule, Routes, ActivatedRouteSnapshot } from '@angular/router';
import { AuthGuardService } from '@AtonixWebSites/auth';
import { MainComponent } from './workflow/containers/main/main.component';
import { ExternalWebsiteComponent } from './workflow/components/external-website/external-website.component';
import { WorkflowFormComponent } from './workflow/containers/workflow-form/workflow-form.component';
import { ConfirmDeactivateGuard } from './workflow/services/confirm-deactivate-guard';
const externalUrlProvider = new InjectionToken('externalUrlRedirectResolver');

const routes: Routes = [
  {
    path: 'externalRedirect',
    canActivate: [externalUrlProvider],
    component: ExternalWebsiteComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/categories'
  },
  {
    path: 'categories',
    canActivate: [AuthGuardService],
    component: MainComponent,
    children: [
      {
        path: '',
        component: WorkflowFormComponent,
        canDeactivate: [ConfirmDeactivateGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    {
      provide: externalUrlProvider,
      useValue: (route: ActivatedRouteSnapshot) => {
        const externalUrl = route.paramMap.get('externalUrl');
        window.open(externalUrl, '_self');
      }
    }
  ]
})
export class AppRoutingModule {}
