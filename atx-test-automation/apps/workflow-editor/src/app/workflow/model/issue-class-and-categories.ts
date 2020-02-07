export interface IssueClassesCategoriesAndAssetClassTypes {
  IssueClassAndCategories: IssueClassAndCategory[] | null;
  AssetClassTypes: AssetClassType[] | null;
}

export interface Category {
  AssetIssueCategoryTypeID: number;
  CategoryAbbrev: string;
  CategoryDesc: string;
  IssueClassTypeID: number;
  MappedAssetClassTypeIDs: number[] | null;
}

export interface IssueClassAndCategory {
  ClientName: string;
  IssueClassTypeID: number;
  IssueClassAbbrev: string;
  IssueClassDesc: string;
  Categories: Category[] | null;
}

export interface AssetClassType {
  AssetClassTypeID: number;
  AssetClassTypeDesc: string;
  DisplayOrder: number;
}
