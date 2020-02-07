/*ANGULAR*/
import { async, TestBed, inject } from '@angular/core/testing';
import { MaterialModule } from '@AtonixWebSites/material';
import { StoreModule } from '@ngrx/store';
/*COMPONENT*/
import { AppOverlayComponent } from './app-overlay.component';
/*FACADE*/
import { UserFacade } from '@AtonixWebSites/auth';
describe('AppOverlayComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            imports: [MaterialModule, StoreModule.forRoot({})],
            providers: [
                {
                    provide: UserFacade,
                    useValue: {
                        setAppContext: function () {
                            return true;
                        }
                    }
                }
            ],
            declarations: [AppOverlayComponent]
        }).compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(AppOverlayComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
    it('should set App Context', inject([UserFacade], function (userFacade) {
        var spy1 = spyOn(userFacade, 'setAppContext');
        var spy2 = spyOn(component.cancel, 'emit');
        component.setAppContext({
            AppContextID: 1,
            Name: 'Atonix test',
            Icon: null,
            DisplayName: 'Atonix test',
            DisplayOrder: 2,
            SecurityResourceID: 3,
            Path: 'testPath',
            OpenInNew: true,
            StopAtLevel: 4,
            ShowFuture: true,
            Tabs: null,
            TimeRange: 'test',
            TimeSelection: 'test',
            Locale: 'test',
            StartAsset: 5,
            Refresh: 6
        });
        expect(spy1).toHaveBeenCalled();
        expect(spy2).toHaveBeenCalled();
    }));
});
//# sourceMappingURL=app-overlay.component.spec.js.map