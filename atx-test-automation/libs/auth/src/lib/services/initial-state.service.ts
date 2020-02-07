import { Injectable, Inject } from '@angular/core';
import { AuthConfigService } from './auth-config.service';
import { AuthConfig } from '../models/auth-config';

@Injectable()
export class InitialStateService {
  constructor(@Inject(AuthConfigService) private config) {}

  public getAppContext(): AuthConfig {
    return this.config;
  }
}
