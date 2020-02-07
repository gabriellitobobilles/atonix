export interface IAppContextTab {
  AppContextTabID: number;
  AppContextID: number;
  DisplayName: string;
  DisplayOrder: number;
}

export interface IAppContext {
  AppContextID: number;
  Name: string;
  Icon: string;
  DisplayName: string;
  DisplayOrder: number;
  SecurityResourceID: number;
  Path: string;
  OpenInNew: boolean;
  StopAtLevel: number;
  ShowFuture: boolean;
  Tabs: IAppContextTab[];
  TimeRange: string;
  TimeSelection: string;
  Locale: string;
  StartAsset: number;
  Refresh: number;
}
