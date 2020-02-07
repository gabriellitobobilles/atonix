// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrl: '',
  cognitoUserPoolID: 'us-east-1_i0y2rjM74',
  cognitoClientId: '2vrt5dl64fgasovb8qak47kqul',
  angularJSSite: 'https://siidev.asset360.com/'
};

/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// tslint:disable-next-line:no-submodule-imports
import 'zone.js/dist/zone-error'; // Included with Angular CLI.
