/*ANGULAR*/
import { TestBed, inject } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
/*SERVICE*/
import { WorkflowFormService } from './workflow-form.service';

describe('WorkflowFormService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      providers: [WorkflowFormService]
    });
  });

  it('should be created', inject([WorkflowFormService], (service: WorkflowFormService) => {
    expect(service).toBeTruthy();
  }));
});
