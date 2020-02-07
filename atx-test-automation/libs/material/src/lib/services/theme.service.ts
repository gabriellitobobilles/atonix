import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class ThemeService {
  private lightTheme: Subject<boolean> = new Subject<boolean>();
  useLightTheme = this.lightTheme.asObservable();

  setDarkTheme(useLightTheme: boolean) {
    this.lightTheme.next(useLightTheme);
  }
}
