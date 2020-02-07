/*ANGULAR*/
import { async, TestBed } from '@angular/core/testing';
import { HighchartsChartModule } from 'highcharts-angular';
import { AtonixDonutChart } from '@AtonixWebSites/hchart';
/*COMPONENT*/
import { DonutChartComponent } from './donut-chart.component';
describe('DonutChartComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            imports: [HighchartsChartModule],
            declarations: [DonutChartComponent]
        }).compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(DonutChartComponent);
        component = fixture.componentInstance;
        component.donutChart = new AtonixDonutChart('Test', 'This just a test!');
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=donut-chart.component.spec.js.map