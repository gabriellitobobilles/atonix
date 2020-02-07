var AppOverlayRef = /** @class */ (function () {
    function AppOverlayRef(overlayRef) {
        this.overlayRef = overlayRef;
    }
    AppOverlayRef.prototype.close = function () {
        this.overlayRef.dispose();
    };
    return AppOverlayRef;
}());
export { AppOverlayRef };
//# sourceMappingURL=app-overlay-ref.js.map