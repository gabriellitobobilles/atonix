import { reducer, initialState, LayoutState } from './layout.reducer';
import { LayoutFacade } from './layout.facade';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { NxModule } from '@nrwl/nx';

interface TestSchema {
  layoutState: LayoutState;
}

describe('Layout Facade', () => {
  const facade: LayoutFacade;
  const store: Store<TestSchema>;

  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = { type: 'NOOP' } as any;
      const result = reducer(undefined, action);
      expect(result).toBe(initialState);
    });
  });
});
