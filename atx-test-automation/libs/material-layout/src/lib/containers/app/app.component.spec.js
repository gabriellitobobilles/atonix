import { async, TestBed } from '@angular/core/testing';
import { LayoutAppComponent } from './app.component';
import { LayoutComponent } from '../../components/layout.component';
import { SidenavComponent } from '../../components/sidenav.component';
import { ToolbarComponent } from '../../components/toolbar.component';
import { MatSidenavModule, MatToolbarModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule, combineReducers } from '@ngrx/store';
import * as fromLayout from '../../state/layout.reducer';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
describe('AppComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule,
                MatSidenavModule,
                MatToolbarModule,
                StoreModule.forRoot({
                    layout: combineReducers(fromLayout.reducer)
                }),
                RouterTestingModule
            ],
            declarations: [LayoutComponent, SidenavComponent, ToolbarComponent, LayoutAppComponent]
        }).compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(LayoutAppComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=app.component.spec.js.map