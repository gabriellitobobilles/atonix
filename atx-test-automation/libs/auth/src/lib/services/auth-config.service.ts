import { InjectionToken } from '@angular/core';
import { AuthConfig } from '../models/auth-config';

/**
 *  InjectionToken allows us to import a config object, provided from an App
 */
export const AuthConfigService = new InjectionToken<AuthConfig>('AuthConfig');
