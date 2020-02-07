import { Component, OnInit, Input } from '@angular/core';
import { AtonixDonutChart } from '@AtonixWebSites/hchart';

@Component({
  selector: 'atx-donut-chart',
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.scss']
})
export class DonutChartComponent implements OnInit {
  constructor() {}
  @Input() highCharts: any;
  @Input() categories: number;
  @Input() donutChart: AtonixDonutChart;

  ngOnInit() {}
}
