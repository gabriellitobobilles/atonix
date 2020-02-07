import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HChartService } from './services/hchart.service';

@NgModule({
  imports: [CommonModule],
  providers: []
})
export class HChartModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: HChartModule,
      providers: [HChartService]
    };
  }
}
