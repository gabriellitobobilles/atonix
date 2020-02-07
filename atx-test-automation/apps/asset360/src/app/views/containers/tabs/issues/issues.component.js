import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { faCog, faArrowCircleDown, faArrowCircleUp, faArrowDown, faArrowUp, faSave, faBan, faTimes, faPlus, faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
var IssuesComponent = /** @class */ (function () {
    function IssuesComponent() {
        this.faIcons = {
            faCog: faCog,
            faArrowCircleDown: faArrowCircleDown,
            faArrowCircleUp: faArrowCircleUp,
            faArrowDown: faArrowDown,
            faArrowUp: faArrowUp,
            faSave: faSave,
            faBan: faBan,
            faTimes: faTimes,
            faPlus: faPlus,
            faCaretDown: faCaretDown,
            faCaretUp: faCaretUp
        };
    }
    IssuesComponent.prototype.ngOnInit = function () { };
    IssuesComponent = tslib_1.__decorate([
        Component({
            selector: 'atx-issues',
            templateUrl: './issues.component.html',
            styleUrls: ['./issues.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], IssuesComponent);
    return IssuesComponent;
}());
export { IssuesComponent };
//# sourceMappingURL=issues.component.js.map