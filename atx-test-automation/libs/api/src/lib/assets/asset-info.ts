import { Asset } from './asset';

export interface IAssetInfo {
  Asset: Asset;
  System: Asset;
  Unit: Asset;
  Station: Asset;
  StationGroup: Asset;
  Client: Asset;
  Longitude: number;
  Latitude: number;
}
