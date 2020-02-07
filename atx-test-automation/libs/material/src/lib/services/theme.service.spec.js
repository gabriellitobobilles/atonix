/*ANGULAR*/
import { TestBed, inject } from '@angular/core/testing';
/*SERVICE*/
import { ThemeService } from './theme.service';
describe('ThemeService', function () {
    beforeEach(function () {
        TestBed.configureTestingModule({ providers: [ThemeService] });
    });
    it('should create', inject([ThemeService], function (themeService) {
        expect(themeService).toBeDefined();
    }));
    it('should set dark theme', inject([ThemeService], function (themeService) {
        var result;
        themeService.useLightTheme.subscribe(function (data) {
            result = data;
        });
        themeService.setDarkTheme(true);
        expect(result).toEqual(true);
    }));
});
//# sourceMappingURL=theme.service.spec.js.map