import { reducer, initialState } from './layout.reducer';
describe('Layout Facade', function () {
    var facade;
    var store;
    describe('undefined action', function () {
        it('should return the default state', function () {
            var action = { type: 'NOOP' };
            var result = reducer(undefined, action);
            expect(result).toBe(initialState);
        });
    });
});
//# sourceMappingURL=layout.facade.spec.js.map