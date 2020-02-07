import { IIssuesAndAlerts } from '@AtonixWebSites/api';

export interface SummaryChartsParameters {
  selectedAssetGuid: string;
  issuesAndAlerts: IIssuesAndAlerts[];
}
