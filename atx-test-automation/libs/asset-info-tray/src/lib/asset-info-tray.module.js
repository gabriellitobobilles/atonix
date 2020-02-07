import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
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
var AssetInfoTrayModule = /** @class */ (function () {
    function AssetInfoTrayModule() {
    }
    AssetInfoTrayModule_1 = AssetInfoTrayModule;
    AssetInfoTrayModule.forRoot = function () {
        return {
            ngModule: AssetInfoTrayModule_1,
            providers: [AssetInfoTrayService]
        };
    };
    var AssetInfoTrayModule_1;
    AssetInfoTrayModule = AssetInfoTrayModule_1 = tslib_1.__decorate([
        NgModule({
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
    ], AssetInfoTrayModule);
    return AssetInfoTrayModule;
}());
export { AssetInfoTrayModule };
//# sourceMappingURL=asset-info-tray.module.js.map