/*STATES*/
import { layoutQuery } from './layout.selectors';
describe('Layout Selectors', function () {
    var mockLayoutState = {
        isAssetNavigatorOpen: true,
        assetNavigatorWidth: 225,
        isTimeSelectorOpen: true,
        timeSelectorHeight: 75
    };
    var mockLayout = { layout: mockLayoutState };
    describe('getIsAssetNavigatorOpen', function () {
        it('should provide value of isAssetNavigatorOpen', function () {
            var selected = layoutQuery.getIsAssetNavigatorOpen(mockLayout);
            expect(selected).toBe(mockLayoutState.isAssetNavigatorOpen);
        });
    });
    describe('getAssetNavigatorWidth', function () {
        it('should provide value of assetNavigatorWidth', function () {
            var selected = layoutQuery.getAssetNavigatorWidth(mockLayout);
            expect(selected).toBe(mockLayoutState.assetNavigatorWidth);
        });
    });
    describe('getIsTimeSelectorOpen', function () {
        it('should provide value of isTimeSelectorOpen', function () {
            var selected = layoutQuery.getIsTimeSelectorOpen(mockLayout);
            expect(selected).toBe(mockLayoutState.isTimeSelectorOpen);
        });
    });
    describe('getTimeSelectorHeight', function () {
        it('should provide value of timeSelectorHeight', function () {
            var selected = layoutQuery.getTimeSelectorHeight(mockLayout);
            expect(selected).toBe(mockLayoutState.timeSelectorHeight);
        });
    });
    describe('getCurrentAssetNavigatorWidth', function () {
        it('should provide value of assetNavigatorWidth', function () {
            var selected = layoutQuery.getCurrentAssetNavigatorWidth(mockLayout);
            expect(selected).toBe(mockLayoutState.assetNavigatorWidth);
        });
    });
    describe('getMainPanelBottom', function () {
        it('should provide value of timeSelectorHeight', function () {
            var selected = layoutQuery.getMainPanelBottom(mockLayout);
            expect(selected).toBe(mockLayoutState.timeSelectorHeight);
        });
    });
});
//# sourceMappingURL=layout.selectors.spec.js.map