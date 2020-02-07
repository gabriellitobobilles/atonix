/*ANGULAR*/
import { async, TestBed } from '@angular/core/testing';
import { MaterialModule } from '@AtonixWebSites/material';
import { StoreModule } from '@ngrx/store';
import { Actions, EffectsModule } from '@ngrx/effects';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
/*COMPONENT*/
import { MapComponent } from './map.component';
/*FACADE*/
import { UserFacade } from '@AtonixWebSites/auth';
import { TimeRangeSelectorFacade } from '@AtonixWebSites/time-range-selector';
/*MODULE*/
import { AssetTreeModule } from '@AtonixWebSites/asset-tree';
describe('MapComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                NoopAnimationsModule,
                MaterialModule,
                AssetTreeModule,
                StoreModule.forRoot({}),
                EffectsModule.forRoot([])
            ],
            declarations: [MapComponent],
            providers: [Actions, UserFacade, TimeRangeSelectorFacade]
        }).compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(MapComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=map.component.spec.js.map