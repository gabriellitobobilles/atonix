import { NgModule, InjectionToken } from '@angular/core';
import { RouterModule, Routes, ActivatedRouteSnapshot } from '@angular/router';
import { AuthGuardService } from '@AtonixWebSites/auth';
import { UserComponent } from './user/user.component';
import { NotFoundComponent } from './views/containers/tabs/not-found/not-found.component';

const externalUrlProvider = new InjectionToken('externalUrlRedirectResolver');

const routes: Routes = [
  {
    path: 'views',
    // canActivate: [AuthGuardService],
    loadChildren: './views/views.module#ViewsModule'
  },
  {
    path: 'user',
    canActivate: [AuthGuardService],
    component: UserComponent
  },
  {
    path: '',
    redirectTo: 'views',
    pathMatch: 'full'
  },
  {
    path: 'externalRedirect',
    canActivate: [externalUrlProvider],
    component: NotFoundComponent
  },
  {
    path: '**',
    redirectTo: 'views'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { initialNavigation: 'enabled', enableTracing: false, paramsInheritanceStrategy: 'always' })
  ],
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
