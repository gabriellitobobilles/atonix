import { IAdHocTreeToAppContextMap } from './iad-hoc-tree-to-app-context-map';
import { IAdHocTreeToClientMap } from './iad-hoc-tree-to-client-map';
import { ICategory } from '../assets/category';
import { IAdHocTreeToCategoryMap } from './iad-hoc-tree-to-category-map';

export interface IAdHocTree {
  TreeId?: string;
  TreeName: string;
  Global: boolean;
  AllApp: boolean;
  IsPrivate: boolean;
  CreatedBy: string;
  ChangedBy: string;
  CreateDate: Date;
  ChangeDate: Date;
  AdHocTreeToAppContextMaps: IAdHocTreeToAppContextMap[];
  IsEditable: boolean;
  AdHocTreeToClientMaps: IAdHocTreeToClientMap[];
  IsSearchable: boolean;
  IsDefaultTree: boolean;
  Categories: ICategory[];
  AdHocTreeToCategoryMaps: IAdHocTreeToCategoryMap[];
}
