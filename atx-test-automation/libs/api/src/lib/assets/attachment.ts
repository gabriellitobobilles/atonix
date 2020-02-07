import { ICategory } from './category';
import { ITaggingKeyword } from './tagging-keyword';

export type AttachmentSortBy = 'custom' | 'caption' | 'filename' | 'date' | 'date_reverse';

export interface IAssetAttachment {
  AttachmentID: string;
  AssetID: number;
  CreateDate: Date;
  ChangeDate: Date;
  CreatedBy: string;
  ChangedBy: string;
  ContentID: string;
  DisplayInstructions: string;
  AttachmentType: number;
  Title: string;
  Caption: string;
  DisplayOrder: number;
  Favorite: boolean;
  Head: string;
  complete?: boolean;
  progressPercentage?: number;
  path?: string;
  uploadError?: string;
  $$treeLevel?: number;
  hasKids?: boolean;
  Keywords?: ITaggingKeyword[];
  IsTheOwner: boolean;
  CreatedByUserID?: number;
  ChangedByUserID?: number;
  PreSignedURL: string;
  Categories: ICategory[];
  CategoriesLabel: string;
}
