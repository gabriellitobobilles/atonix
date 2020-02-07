import * as tslib_1 from "tslib";
/*STATES*/
import * as actions from './layout.actions';
import { reducer } from './layout.reducer';
describe('Layout Reducer', function () {
    var initialState = {
        isAssetNavigatorOpen: true,
        assetNavigatorWidth: 225,
        isTimeSelectorOpen: true,
        timeSelectorHeight: 75
    };
    describe('[atxLayout] Set Asset Navigator Width', function () {
        it('should toggle state', function () {
            var action = new actions.SetAssetNavigatorWidth(1);
            var result = reducer(initialState, action);
            expect(result).toEqual(tslib_1.__assign({}, initialState, { assetNavigatorWidth: 1 }));
        });
    });
    describe('[atxLayout] Set Time Selector Height', function () {
        it('should toggle state', function () {
            var action = new actions.SetTimeSelectorHeight(1);
            var result = reducer(initialState, action);
            expect(result).toEqual(tslib_1.__assign({}, initialState, { timeSelectorHeight: 1 }));
        });
    });
    describe('[atxLayout] Open Asset Navigator', function () {
        it('should toggle state', function () {
            var action = new actions.OpenAssetNavigator();
            var result = reducer(initialState, action);
            expect(result).toEqual(tslib_1.__assign({}, initialState, { isAssetNavigatorOpen: true }));
        });
    });
    describe('[atxLayout] Open Time Selector', function () {
        it('should toggle state', function () {
            var action = new actions.OpenTimeSelector();
            var result = reducer(initialState, action);
            expect(result).toEqual(tslib_1.__assign({}, initialState, { isTimeSelectorOpen: true }));
        });
    });
    describe('[atxLayout] Toggle Asset Navigator', function () {
        it('should toggle state', function () {
            var action = new actions.ToggleAssetNavigator();
            var result = reducer(initialState, action);
            expect(result).toEqual(tslib_1.__assign({}, initialState, { isAssetNavigatorOpen: false }));
        });
    });
    describe('[atxLayout] Toggle Time Selector', function () {
        it('should toggle state', function () {
            var action = new actions.ToggleTimeSelector();
            var result = reducer(initialState, action);
            expect(result).toEqual(tslib_1.__assign({}, initialState, { isTimeSelectorOpen: false }));
        });
    });
    describe('[atxLayout] Close Asset Navigator', function () {
        it('should toggle state', function () {
            var action = new actions.CloseAssetNavigator();
            var result = reducer(initialState, action);
            expect(result).toEqual(tslib_1.__assign({}, initialState, { isAssetNavigatorOpen: false }));
        });
    });
    describe('[atxLayout] Close Time Selector', function () {
        it('should toggle state', function () {
            var action = new actions.CloseTimeSelector();
            var result = reducer(initialState, action);
            expect(result).toEqual(tslib_1.__assign({}, initialState, { isTimeSelectorOpen: false }));
        });
    });
});
//# sourceMappingURL=layout.reducer.spec.js.map