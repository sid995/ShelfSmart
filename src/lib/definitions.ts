export interface InventoryItem {
  name: string;
  quantity: number;
  expiryDate: Date | null;
}

export interface InventoryItemWithId extends InventoryItem {
  id?: string;
}

export interface NewCreatedInventory extends InventoryItemWithId {
  creationDate: Date | null;
  userId: string;
}

export type InventoryItemWithOptionalId = Partial<Pick<InventoryItemWithId, 'id'>> & InventoryItem;

export interface AddItemResult {
  success: boolean;
  error?: Error;
}
