import * as tslib_1 from "tslib";
import { Directive, Output, EventEmitter, ElementRef, HostListener } from '@angular/core';
var WatchElementSizeDirective = /** @class */ (function () {
    function WatchElementSizeDirective(elementRef) {
        var _this = this;
        this.elementRef = elementRef;
        this.atxWatchElementSize = new EventEmitter();
        console.log('Element size watcher started.');
        this.element = elementRef.nativeElement;
        this.changes = new MutationObserver(function (mutations) {
            _this.calculateChanges();
        });
        this.changes.observe(this.element, {
            attributes: true,
            childList: true,
            characterData: true
        });
        this.calculateChanges();
    }
    WatchElementSizeDirective.prototype.onresize = function (event) {
        this.calculateChanges();
    };
    WatchElementSizeDirective.prototype.calculateChanges = function () {
        var bounds = this.element.getBoundingClientRect();
        this.atxWatchElementSize.emit({ height: bounds.height, width: bounds.width, left: bounds.left });
    };
    WatchElementSizeDirective.prototype.ngOnDestroy = function () {
        this.changes.disconnect();
    };
    tslib_1.__decorate([
        HostListener('window:resize', ['$event']),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], WatchElementSizeDirective.prototype, "onresize", null);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], WatchElementSizeDirective.prototype, "atxWatchElementSize", void 0);
    WatchElementSizeDirective = tslib_1.__decorate([
        Directive({
            selector: '[atxWatchElementSize]'
        }),
        tslib_1.__metadata("design:paramtypes", [ElementRef])
    ], WatchElementSizeDirective);
    return WatchElementSizeDirective;
}());
export { WatchElementSizeDirective };
//# sourceMappingURL=watch-element-size.directive.js.map