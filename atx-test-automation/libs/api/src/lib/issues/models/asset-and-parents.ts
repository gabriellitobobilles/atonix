import { Asset } from '@AtonixWebSites/api';

export interface IAssetAndParents {
  Asset: Asset;
  System: Asset;
  Unit: Asset;
  Station: Asset;
  StationGroup: Asset;
  Client: Asset;
}
