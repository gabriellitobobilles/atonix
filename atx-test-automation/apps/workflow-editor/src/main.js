import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import 'hammerjs';
import { AppModule } from './app/app.module';
import { environment } from '@env/environment';
if (environment.production) {
    enableProdMode();
}
platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch(function (err) { return console.log(err); });
//# sourceMappingURL=main.js.map