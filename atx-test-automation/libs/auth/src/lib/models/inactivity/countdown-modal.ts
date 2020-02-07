import { EventEmitter } from '@angular/core';

export interface CountdownModal {
  countdown: EventEmitter<number>;
}
