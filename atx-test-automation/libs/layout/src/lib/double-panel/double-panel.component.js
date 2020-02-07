import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { AuthFacade, UserFacade } from '@AtonixWebSites/auth';
import { LayoutComponent } from '../layout.component';
import { LayoutFacade } from '../state/layout.facade';
import { DomSanitizer } from '@angular/platform-browser';
import { expandContract } from '../animations/expand-contract';
var DoublePanelComponent = /** @class */ (function (_super) {
    tslib_1.__extends(DoublePanelComponent, _super);
    function DoublePanelComponent(mySanitizer, myAuthFacade, myUserFacade, myLayoutFacade) {
        var _this = _super.call(this, mySanitizer, myAuthFacade, myUserFacade, myLayoutFacade) || this;
        _this.mySanitizer = mySanitizer;
        _this.myAuthFacade = myAuthFacade;
        _this.myUserFacade = myUserFacade;
        _this.myLayoutFacade = myLayoutFacade;
        return _this;
    }
    DoublePanelComponent = tslib_1.__decorate([
        Component({
            selector: 'atx-double-panel',
            templateUrl: './double-panel.component.html',
            styleUrls: ['../layout.component.scss'],
            animations: [expandContract]
        }),
        tslib_1.__metadata("design:paramtypes", [DomSanitizer,
            AuthFacade,
            UserFacade,
            LayoutFacade])
    ], DoublePanelComponent);
    return DoublePanelComponent;
}(LayoutComponent));
export { DoublePanelComponent };
//# sourceMappingURL=double-panel.component.js.map