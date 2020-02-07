import { ViewsModule } from './views.module';

describe('Asset360Module', () => {
  let asset360Module: ViewsModule;

  beforeEach(() => {
    asset360Module = new ViewsModule();
  });

  it('should create an instance', () => {
    expect(asset360Module).toBeTruthy();
  });
});
