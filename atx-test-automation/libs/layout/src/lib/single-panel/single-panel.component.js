import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { AuthFacade, UserFacade } from '@AtonixWebSites/auth';
import { LayoutComponent } from '../layout.component';
import { LayoutFacade } from '../state/layout.facade';
import { DomSanitizer } from '@angular/platform-browser';
var SinglePanelComponent = /** @class */ (function (_super) {
    tslib_1.__extends(SinglePanelComponent, _super);
    function SinglePanelComponent(mySanitizer, myAuthFacade, myUserFacade, myLayoutFacade) {
        var _this = _super.call(this, mySanitizer, myAuthFacade, myUserFacade, myLayoutFacade) || this;
        _this.mySanitizer = mySanitizer;
        _this.myAuthFacade = myAuthFacade;
        _this.myUserFacade = myUserFacade;
        _this.myLayoutFacade = myLayoutFacade;
        return _this;
    }
    SinglePanelComponent = tslib_1.__decorate([
        Component({
            selector: 'atx-single-panel',
            templateUrl: './single-panel.component.html',
            styleUrls: ['../layout.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [DomSanitizer,
            AuthFacade,
            UserFacade,
            LayoutFacade])
    ], SinglePanelComponent);
    return SinglePanelComponent;
}(LayoutComponent));
export { SinglePanelComponent };
//# sourceMappingURL=single-panel.component.js.map