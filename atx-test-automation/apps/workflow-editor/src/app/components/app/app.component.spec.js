/*ANGULAR*/
import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Store, StoreModule } from '@ngrx/store';
/*COMPONENT*/
import { AppComponent } from './app.component';
/*FACADE*/
import { UserFacade } from '@AtonixWebSites/auth';
describe('AppComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule, StoreModule.forRoot({})],
            providers: [Store, UserFacade],
            declarations: [AppComponent]
        }).compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=app.component.spec.js.map