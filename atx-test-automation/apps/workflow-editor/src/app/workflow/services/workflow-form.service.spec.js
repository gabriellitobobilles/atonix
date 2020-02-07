/*ANGULAR*/
import { TestBed, inject } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
/*SERVICE*/
import { WorkflowFormService } from './workflow-form.service';
describe('WorkflowFormService', function () {
    beforeEach(function () {
        TestBed.configureTestingModule({
            imports: [FormsModule, ReactiveFormsModule],
            providers: [WorkflowFormService]
        });
    });
    it('should be created', inject([WorkflowFormService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=workflow-form.service.spec.js.map