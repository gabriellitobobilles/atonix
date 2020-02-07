import * as tslib_1 from "tslib";
import { NgModule, InjectionToken } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuardService } from '@AtonixWebSites/auth';
import { MainComponent } from './workflow/containers/main/main.component';
import { ExternalWebsiteComponent } from './workflow/components/external-website/external-website.component';
import { WorkflowFormComponent } from './workflow/containers/workflow-form/workflow-form.component';
import { ConfirmDeactivateGuard } from './workflow/services/confirm-deactivate-guard';
var externalUrlProvider = new InjectionToken('externalUrlRedirectResolver');
var routes = [
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
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = tslib_1.__decorate([
        NgModule({
            imports: [RouterModule.forRoot(routes)],
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