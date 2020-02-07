export interface IAssetView {
  ViewID: number;
  ViewName: string;
  Path: string;
  DisplayOrder: number;
  TimeRange: string;
  ShowFuture: boolean;
  StopAtLevel: number;
  Refresh: number;
  selected?: boolean;
  DisplayText?: string;
}

export interface IAssetViews {
  Views: IAssetView[];
  SelectedView: number;
}
