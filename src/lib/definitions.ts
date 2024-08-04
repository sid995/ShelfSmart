export interface Timestamp {
  seconds: number;
}

export interface InventoryItem {
  name: string;
  quantity: number;
  expiryDate: Timestamp | null;
  imageSrc: string | null;
}

export interface InventoryItemWithId extends InventoryItem {
  id?: string;
}

export interface NewCreatedInventory extends InventoryItemWithId {
  creationDate: Timestamp | null;
  userId: string;
  lowerCaseName: string;
}

export type InventoryItemWithOptionalId = Partial<Pick<InventoryItemWithId, 'id'>> & InventoryItem;

export interface AddItemResult {
  success: boolean;
  error?: Error;
}

export type CurrentSessionType = {
  user: {
    id: string;
    email?: string;
    name: any;
  };
} | null;

export interface AnalyticsContentProps {
  totalItems: number;
  totalRecipes: number;
  soonExpiring: number;
  expiryData: Array<{ name: string; value: number }>;
  stockLevels: Array<{ name: string; quantity: number }>;
  recentlyAdded: string[];
  itemsWithImages: Array<{ name: string; value: number }>;
}
