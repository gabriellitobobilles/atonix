var AtonixOverlayRef = /** @class */ (function () {
    function AtonixOverlayRef(overlayRef) {
        this.overlayRef = overlayRef;
    }
    AtonixOverlayRef.prototype.close = function () {
        this.overlayRef.dispose();
    };
    return AtonixOverlayRef;
}());
export { AtonixOverlayRef };
//# sourceMappingURL=overlay-ref.js.map