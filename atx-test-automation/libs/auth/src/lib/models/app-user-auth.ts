export class AppUserClaim {
  claimType = '';
  claimValue = '';
}

export interface AppUserAuth {
  loggedIn: boolean;
  tokenRequired: boolean;
  passwordResetRequired: boolean;
  totpRequired: boolean;
  challengeName: any;
  challengeParameters: any;
  userName: string;
  access_token: string;
  expires_in: Date;
  token_type: string;
  claims?: AppUserClaim[];
}
