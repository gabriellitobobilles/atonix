/*ANGULAR*/
import { async, TestBed, inject } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MaterialModule } from '@AtonixWebSites/material';
/*SERVICE*/
import { AppOverlayService } from '../app-overlay/app-overlay-service';
describe('NavbarComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            imports: [FontAwesomeModule, MaterialModule],
            providers: [AppOverlayService],
            declarations: [NavbarComponent]
        }).compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(NavbarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
    it('should show App Context', inject([AppOverlayService], function (appOverlayService) {
        var spy = spyOn(appOverlayService, 'open');
        component.showAppContext();
        expect(spy).toHaveBeenCalled();
    }));
});
//# sourceMappingURL=navbar.component.spec.js.map