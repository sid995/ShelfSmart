export interface Item {
  id: string;
  name: string;
  quantity: number;
  expiryDate: Date;
  boughtDate: Date;
}

export type Items = Item[]