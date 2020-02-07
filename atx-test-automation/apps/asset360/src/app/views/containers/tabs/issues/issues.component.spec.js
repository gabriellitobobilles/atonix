/*ANGULAR*/
import { async, TestBed } from '@angular/core/testing';
import { MaterialModule } from '@AtonixWebSites/material';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatIconModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
/*COMPONENT*/
import { IssuesComponent } from './issues.component';
describe('IssuesComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            imports: [MaterialModule, FontAwesomeModule, NoopAnimationsModule, MatIconModule],
            declarations: [IssuesComponent]
        }).compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(IssuesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=issues.component.spec.js.map