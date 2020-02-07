import { async, TestBed } from '@angular/core/testing';
import { ActionFormCreateBlogEntryComponent } from './action-form-create-blog-entry.component';
describe('ActionFormCreateBlogEntryComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [ActionFormCreateBlogEntryComponent]
        }).compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(ActionFormCreateBlogEntryComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=action-form-create-blog-entry.component.spec.js.map