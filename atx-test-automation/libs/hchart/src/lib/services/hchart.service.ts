import { Injectable } from '@angular/core';
import * as Highcharts from 'highcharts';
// For next line. See open issue: https://github.com/highcharts/highcharts-angular/issues/54
// tslint:disable-next-line:no-submodule-imports
import * as exporting from 'highcharts/modules/exporting.src';
import * as CustomEvents from 'highcharts-custom-events';
exporting(Highcharts);
CustomEvents(Highcharts);
Highcharts.setOptions({
  lang: {
    thousandsSep: ','
  }
});

@Injectable({
  providedIn: 'root'
})
export class HChartService {
  Highcharts = Highcharts;
  constructor() {}

  getHCharts() {
    return Highcharts;
  }
}
