import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { TimeRangeSelectorFacade } from '../../state/time-range-selector.facade';
import { FormGroup, FormControl } from '@angular/forms';
var JumpToListComponent = /** @class */ (function () {
    function JumpToListComponent(facade) {
        this.facade = facade;
        this.form = new FormGroup({
            coValue: new FormControl('')
        });
        this.jumpToList$ = facade.jumpToList$;
    }
    JumpToListComponent.prototype.ngOnInit = function () {
        this.facade.GetDefaultJumpToList();
    };
    JumpToListComponent.prototype.SelectionChanged = function ($event) {
        if ($event.value) {
            this.facade.SelectJumpToListItem($event.value);
            this.form.reset();
        }
    };
    JumpToListComponent = tslib_1.__decorate([
        Component({
            selector: 'atx-jump-to-list',
            templateUrl: './jump-to-list.component.html',
            styleUrls: ['./jump-to-list.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [TimeRangeSelectorFacade])
    ], JumpToListComponent);
    return JumpToListComponent;
}());
export { JumpToListComponent };
//# sourceMappingURL=jump-to-list.component.js.map