import { IAsset } from '../assets/asset';

export interface IAdHocNode {
  NodeId: string;
  TreeId: string;
  NodeAbbrev: string;
  NodeDesc: string;
  ParentNodeId?: string;
  NodeTypeId: number;
  DisplayOrder: number;
  CreatedBy: string;
  ChangedBy: string;
  CreateDate?: Date;
  ChangeDate?: Date;
  AssetId?: number;
  AssetNodeBehaviorId?: number;
  CriteriaObjectId?: number;

  CriteriaObjectIncludeAncestors: boolean;

  RetrievedFromCriteriaObjectWithIncludedAncestors?: boolean;
  Asset: IAsset;
  Criteria: any;
  ContainerChildrenCount: number;

  ParentUniqueKey: string;
  UniqueKey: string;

  // Next 3 properties are new
  // and will not be anywhere in the database
  // Will only be in play for NodeTypeId == 4 (backend only)
  AssetGuid: string;
  ReferencedBy: any;
  HasChildren: boolean;

  // Derived property, from IsDefaultTree field of foreign keyed AdHocTree
  CameFromDefaultTree?: boolean;
}
