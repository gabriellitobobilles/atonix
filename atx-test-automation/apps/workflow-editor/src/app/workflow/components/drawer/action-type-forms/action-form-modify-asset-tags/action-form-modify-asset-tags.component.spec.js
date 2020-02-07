import { async, TestBed } from '@angular/core/testing';
import { ActionFormModifyAssetTagsComponent } from './action-form-modify-asset-tags.component';
describe('ActionFormModifyAssetTagsComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [ActionFormModifyAssetTagsComponent]
        }).compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(ActionFormModifyAssetTagsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=action-form-modify-asset-tags.component.spec.js.map