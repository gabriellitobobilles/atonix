/*ANGULAR*/
import { TestBed, inject } from '@angular/core/testing';
/*SERVICE*/
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [ThemeService] });
  });

  it('should create', inject([ThemeService], (themeService: ThemeService) => {
    expect(themeService).toBeDefined();
  }));

  it('should set dark theme', inject([ThemeService], (themeService: ThemeService) => {
    let result;

    themeService.useLightTheme.subscribe((data: any) => {
      result = data;
    });
    themeService.setDarkTheme(true);
    expect(result).toEqual(true);
  }));
});
