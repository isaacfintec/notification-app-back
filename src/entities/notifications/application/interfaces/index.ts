import { TNotifications } from '../../../../core/interfaces';

export interface SearchQuery {
  type: TNotifications;
  username: string;
}

export type PartialSearchQuery = Partial<SearchQuery>;
