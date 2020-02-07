import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatInputModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AssetInfoTrayComponent } from './asset-info-tray/asset-info-tray.component';
import { AssetInfoTrayService } from './asset-info-tray.service';

@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    OverlayModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDatepickerModule
  ],
  declarations: [AssetInfoTrayComponent],
  entryComponents: [AssetInfoTrayComponent]
})
export class AssetInfoTrayModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AssetInfoTrayModule,
      providers: [AssetInfoTrayService]
    };
  }
}
