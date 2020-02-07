import { NavigationExtras } from '@angular/router';

export interface RouterParameters {
  path: any[];
  query?: object;
  extras?: NavigationExtras;
}
