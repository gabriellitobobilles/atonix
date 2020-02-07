/*ANGULAR*/
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '@AtonixWebSites/material';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { RouterModule } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
/*COMPONENT*/
import { SummaryComponent } from './summary.component';
import { DonutChartComponent } from '../../components/donut-chart/donut-chart.component';
/*MODULE*/
import { HChartModule } from '@AtonixWebSites/hchart';
import { routes } from '../../performance-analyst-charts-routing.module';
import { HighchartsChartModule } from 'highcharts-angular';
/*FACADE*/
import { PaSummaryFacade } from '../../state/pa-summary.facade';
import { UserFacade } from '@AtonixWebSites/auth';
import { AssetTreeFacadeFactory } from '@AtonixWebSites/asset-tree';
/*REDUCER*/
import { paSummaryReducer } from '../../state/pa-summary.reducer';

describe('SummaryComponent', () => {
  let component: SummaryComponent;
  let fixture: ComponentFixture<SummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        CommonModule,
        FormsModule,
        MaterialModule,
        HChartModule.forRoot(),
        StoreModule.forFeature('paSummaryState', paSummaryReducer),
        HighchartsChartModule,
        RouterModule.forChild(routes),
        StoreModule.forRoot({})
      ],
      declarations: [SummaryComponent, DonutChartComponent],
      providers: [PaSummaryFacade, Actions, AssetTreeFacadeFactory, UserFacade]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
