import { IAsset } from '../../assets/asset';
import { IAssetClassType } from '../../assets/asset-class-type';
import { ITaggedAsset } from './tagged-asset';

export interface IStateForLayer {
  Name: string;
  ID: number;
}

export interface IStatesForLayer {
  AssetClassType: IAssetClassType;
  Assets: IAsset[];
  CashFlowField: string;
  States: IStateForLayer[];
  TaggedAssets?: ITaggedAsset[];
}
