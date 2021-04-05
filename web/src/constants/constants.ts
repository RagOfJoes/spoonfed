import { QueryGetRecipesArgs, SortOrder } from 'generated/graphql';

export const DEFAULT_RECIPES_VARIABLE: QueryGetRecipesArgs = {
  limit: 12,
  filters: [],
  sort: { key: "CreatedAt", order: SortOrder.Desc },
};
