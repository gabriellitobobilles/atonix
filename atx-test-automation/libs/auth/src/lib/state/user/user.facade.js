import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { userQuery } from './user.selectors';
import { LoadUserInfo, LoadAppContext, ClearUser, SetAppContext, SetAppContextSuccess } from './user.actions';
var UserFacade = /** @class */ (function () {
    function UserFacade(store) {
        this.store = store;
        this.accountModelUser$ = this.store.pipe(select(userQuery.getUser));
        this.errorMessage$ = this.store.pipe(select(userQuery.getErrorMessage));
        this.appContexts$ = this.store.pipe(select(userQuery.getAppContexts));
        this.selectedAppContextID$ = this.store.pipe(select(userQuery.getSelectedAppContextID));
        this.selectedAppContext$ = this.store.pipe(select(userQuery.getSelectedAppContext));
        this.lightTheme$ = this.store.pipe(select(userQuery.getLightTheme));
    }
    UserFacade.prototype.loadAppContexts = function () {
        this.store.dispatch(new LoadAppContext());
    };
    UserFacade.prototype.setAppContext = function (appContextId) {
        this.store.dispatch(new SetAppContext(appContextId));
    };
    UserFacade.prototype.clearUser = function () {
        this.store.dispatch(new ClearUser());
    };
    UserFacade.prototype.loadUserInfo = function () {
        this.store.dispatch(new LoadUserInfo());
    };
    UserFacade.prototype.appLoaded = function (appContextID) {
        this.store.dispatch(new SetAppContextSuccess(appContextID));
    };
    UserFacade = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [Store])
    ], UserFacade);
    return UserFacade;
}());
export { UserFacade };
//# sourceMappingURL=user.facade.js.map