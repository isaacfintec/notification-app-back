import { TCategories, TNotifications } from '../../../../core/interfaces';

export interface SearchQuery {
  type: TNotifications;
  category: TCategories;
}

export type PartialSearchQuery = Partial<SearchQuery>;
