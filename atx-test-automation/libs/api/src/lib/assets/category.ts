export interface ICategory {
  CategoryID: number;
  Name: string;
  CreateDate: Date;
  ChangeDate: Date;
  selected?: boolean;
  ClientId?: number;
}
