import * as tslib_1 from "tslib";
import { NgModule, InjectionToken } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuardService } from '@AtonixWebSites/auth';
import { UserComponent } from './user/user.component';
import { NotFoundComponent } from './views/containers/tabs/not-found/not-found.component';
var externalUrlProvider = new InjectionToken('externalUrlRedirectResolver');
var routes = [
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
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = tslib_1.__decorate([
        NgModule({
            imports: [
                RouterModule.forRoot(routes, { initialNavigation: 'enabled', enableTracing: false, paramsInheritanceStrategy: 'always' })
            ],
            exports: [RouterModule],
            providers: [
                {
                    provide: externalUrlProvider,
                    useValue: function (route) {
                        var externalUrl = route.paramMap.get('externalUrl');
                        window.open(externalUrl, '_self');
                    }
                }
            ]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map