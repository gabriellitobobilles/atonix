export interface ITaggingKeyword {
  ClientId: number;
  KeywordId: number;
  Text: string;
  BackDated: boolean;
  DateTime?: Date;
  BackDate?: Date;
  CreatedByUserID?: number;
  ChangedByUserID?: number;
  IsTheOwner: boolean;
}
