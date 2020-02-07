/*ANGULAR*/
import { async, TestBed } from '@angular/core/testing';
import { MaterialModule } from '@AtonixWebSites/material';
/*COMPONENT*/
import { NotFoundComponent } from './not-found.component';
describe('NotFoundComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            imports: [MaterialModule],
            declarations: [NotFoundComponent]
        }).compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(NotFoundComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=not-found.component.spec.js.map