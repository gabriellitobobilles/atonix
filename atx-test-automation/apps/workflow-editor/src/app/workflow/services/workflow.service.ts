import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { IssueClassesCategoriesAndAssetClassTypes, Category } from '../model/issue-class-and-categories';
import { IssueAndResolutionStatuses } from '../model/issue-and-resolution-statuses';
import { HttpClient } from '@angular/common/http';
import { NewCategory } from '../model/new-category';
import { ThrowMessage } from '@AtonixWebSites/shared';
import { WorkflowAction } from '../model/actions';
import { IAssetIssue } from '@AtonixWebSites/api';

@Injectable({
  providedIn: 'root'
})
export class WorkflowService {
  constructor(private http: HttpClient) {}

  canConfigureWorkflow(): Observable<boolean> {
    return this.http
      .get<boolean>(`${environment.baseUrl}/Services/api/Authorization/CanConfigureWorkflow`)
      .pipe(catchError(ThrowMessage.error));
  }

  issueWarnings(assetIssueCategoryTypeID: number): Observable<IAssetIssue[]> {
    return this.http.get<IAssetIssue[]>(
      `${environment.baseUrl}/Services/api/Issues/AssetIssueByCategoryTypeID?assetIssueCategoryTypeID=${assetIssueCategoryTypeID}`
    );
  }

  resolutionAndIssueStatuses(assetIssueCategoryTypeID: number): Observable<IssueAndResolutionStatuses> {
    return this.http
      .get<IssueAndResolutionStatuses>(
        `${
          environment.baseUrl
        }/Services/api/Issues/ResolutionAndIssueStatuses?assetIssueCategoryTypeID=${assetIssueCategoryTypeID}`
      )
      .pipe(
        tap(results => {
          results.ResolutionStatuses.sort((leftSide, rightSide) => {
            if (+leftSide.DisplayOrder < +rightSide.DisplayOrder) {
              return -1;
            }
            if (+leftSide.DisplayOrder > +rightSide.DisplayOrder) {
              return 1;
            }
            return 0;
          });
        })
      );
  }

  issueCategoryTypes(guid: string): Observable<IssueClassesCategoriesAndAssetClassTypes> {
    return this.http
      .get<IssueClassesCategoriesAndAssetClassTypes>(`${environment.baseUrl}/Services/api/Issues/ClassAndCategories?guid=${guid}`)
      .pipe(catchError(ThrowMessage.error));
  }

  saveCategory(newCategory: NewCategory): Observable<Category> {
    return this.http.post<Category>(`${environment.baseUrl}/Services/api/Issues/SaveIssueCategory`, newCategory);
  }

  saveWorkflowAction(action: WorkflowAction): Observable<WorkflowAction> {
    return this.http
      .post<WorkflowAction>(`${environment.baseUrl}/Services/api/Issues/SaveWorkflowAction`, action)
      .pipe(catchError(ThrowMessage.error));
  }

  deleteCategory(selectedCategoryTypeID: number) {
    return this.http.delete<any>(`${environment.baseUrl}/Services/api/Issues/IssueCategory/${selectedCategoryTypeID}`);
  }
}
