import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Any: any;
  Date: any;
  Email: any;
};





export type EditRecipeInput = {
  ID: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  servings?: Maybe<Scalars['String']>;
  images?: Maybe<Array<ImageInput>>;
  time?: Maybe<RecipeTimeInput>;
  ingredients?: Maybe<Array<Scalars['String']>>;
  instructions?: Maybe<Array<Scalars['String']>>;
};


export enum FilterCondition {
  Equals = 'EQUALS',
  NotEquals = 'NOT_EQUALS',
  LessThan = 'LESS_THAN',
  GreaterThan = 'GREATER_THAN',
  LessThanEqual = 'LESS_THAN_EQUAL',
  GreaterThanEqual = 'GREATER_THAN_EQUAL',
  Between = 'BETWEEN',
  Is = 'IS',
  IsNull = 'IS_NULL',
  IsNotNull = 'IS_NOT_NULL',
  In = 'IN',
  NotIn = 'NOT_IN',
  Like = 'LIKE',
  Ilike = 'ILIKE',
  NotLike = 'NOT_LIKE'
}

export type FilterInput = {
  key: Scalars['String'];
  condition: FilterCondition;
  value?: Maybe<Scalars['Any']>;
  values?: Maybe<Array<Scalars['Any']>>;
};

export type Image = {
  __typename?: 'Image';
  url: Scalars['String'];
  name: Scalars['String'];
  caption?: Maybe<Scalars['String']>;
};

export type ImageInput = {
  url: Scalars['String'];
  name: Scalars['String'];
  caption: Scalars['String'];
};

export type MetaDate = {
  __typename?: 'MetaDate';
  creation: Scalars['Date'];
  lastUpdate?: Maybe<Scalars['Date']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  rootMutation?: Maybe<Scalars['String']>;
  toggleRecipeLike: Recipe;
  editRecipe: Recipe;
  createRecipe: Recipe;
};


export type MutationToggleRecipeLikeArgs = {
  recipeID: Scalars['ID'];
};


export type MutationEditRecipeArgs = {
  recipe: EditRecipeInput;
};


export type MutationCreateRecipeArgs = {
  recipe: NewRecipeInput;
};

export type NewRecipeInput = {
  name: Scalars['String'];
  servings: Scalars['String'];
  importUrl?: Maybe<Scalars['String']>;
  time?: Maybe<RecipeTimeInput>;
  images: Array<ImageInput>;
  ingredients: Array<Scalars['String']>;
  instructions: Array<Scalars['String']>;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  cursor: Scalars['ID'];
  hasNextPage: Scalars['Boolean'];
};

export type Query = {
  __typename?: 'Query';
  rootQuery?: Maybe<Scalars['String']>;
  getRecipeDetail?: Maybe<Recipe>;
  getRecipes: RecipeConnection;
  me?: Maybe<User>;
};


export type QueryGetRecipeDetailArgs = {
  slug: Scalars['String'];
};


export type QueryGetRecipesArgs = {
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['ID']>;
  sort: SortInput;
  filters?: Maybe<Array<FilterInput>>;
};

export type Recipe = {
  __typename?: 'Recipe';
  id: Scalars['ID'];
  name: Scalars['String'];
  time?: Maybe<RecipeTime>;
  images: Array<Image>;
  servings: Scalars['String'];
  ingredients: Array<Scalars['String']>;
  instructions: Array<Scalars['String']>;
  slug: Scalars['String'];
  numOfLikes?: Maybe<Scalars['Int']>;
  date: MetaDate;
  createdBy: User;
  isLiked?: Maybe<Scalars['Boolean']>;
  importUrl?: Maybe<Scalars['String']>;
};

export type RecipeConnection = {
  __typename?: 'RecipeConnection';
  edges?: Maybe<Array<RecipeEdge>>;
  pageInfo: PageInfo;
};

export type RecipeEdge = {
  __typename?: 'RecipeEdge';
  cursor: Scalars['ID'];
  node?: Maybe<Recipe>;
};

export type RecipeTime = {
  __typename?: 'RecipeTime';
  prep?: Maybe<Scalars['String']>;
  cook?: Maybe<Scalars['String']>;
  ready?: Maybe<Scalars['String']>;
  active?: Maybe<Scalars['String']>;
  inactive?: Maybe<Scalars['String']>;
  total: Scalars['String'];
};

export type RecipeTimeInput = {
  prep?: Maybe<Scalars['String']>;
  cook?: Maybe<Scalars['String']>;
  ready?: Maybe<Scalars['String']>;
  total: Scalars['String'];
  active?: Maybe<Scalars['String']>;
  inactive?: Maybe<Scalars['String']>;
};

export type SortInput = {
  key: Scalars['String'];
  order: SortOrder;
};

export enum SortOrder {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type Subscription = {
  __typename?: 'Subscription';
  rootSubscription?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  username?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  avatar?: Maybe<Scalars['String']>;
  email: Scalars['Email'];
  name?: Maybe<UserName>;
  date: MetaDate;
};

export type UserName = {
  __typename?: 'UserName';
  first?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['String']>;
  full?: Maybe<Scalars['String']>;
};

export type RecipeDetailFragment = (
  { __typename?: 'Recipe' }
  & Pick<Recipe, 'id' | 'name' | 'slug' | 'isLiked' | 'servings' | 'importUrl' | 'numOfLikes' | 'ingredients' | 'instructions'>
  & { date: (
    { __typename?: 'MetaDate' }
    & Pick<MetaDate, 'creation' | 'lastUpdate'>
  ), images: Array<(
    { __typename?: 'Image' }
    & Pick<Image, 'name' | 'url'>
  )>, createdBy: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'avatar' | 'username'>
    & { name?: Maybe<(
      { __typename?: 'UserName' }
      & Pick<UserName, 'full'>
    )> }
  ), time?: Maybe<(
    { __typename?: 'RecipeTime' }
    & Pick<RecipeTime, 'prep' | 'cook' | 'ready' | 'total' | 'active' | 'inactive'>
  )> }
);

export type RecipeOverviewFragment = (
  { __typename?: 'Recipe' }
  & Pick<Recipe, 'id' | 'name' | 'slug' | 'isLiked' | 'servings'>
  & { time?: Maybe<(
    { __typename?: 'RecipeTime' }
    & Pick<RecipeTime, 'total'>
  )>, date: (
    { __typename?: 'MetaDate' }
    & Pick<MetaDate, 'creation'>
  ), images: Array<(
    { __typename?: 'Image' }
    & Pick<Image, 'name' | 'url'>
  )>, createdBy: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'avatar' | 'username'>
    & { name?: Maybe<(
      { __typename?: 'UserName' }
      & Pick<UserName, 'full'>
    )> }
  ) }
);

export type ToggleRecipeLikeMutationVariables = Exact<{
  recipeID: Scalars['ID'];
}>;


export type ToggleRecipeLikeMutation = (
  { __typename?: 'Mutation' }
  & { toggleRecipeLike: (
    { __typename?: 'Recipe' }
    & Pick<Recipe, 'id' | 'isLiked'>
  ) }
);

export type GetRecipeDetailQueryVariables = Exact<{
  slug: Scalars['String'];
}>;


export type GetRecipeDetailQuery = (
  { __typename?: 'Query' }
  & { getRecipeDetail?: Maybe<(
    { __typename?: 'Recipe' }
    & RecipeDetailFragment
  )> }
);

export type GetRecipesQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['ID']>;
  sort: SortInput;
  filters?: Maybe<Array<FilterInput> | FilterInput>;
}>;


export type GetRecipesQuery = (
  { __typename?: 'Query' }
  & { getRecipes: (
    { __typename?: 'RecipeConnection' }
    & { edges?: Maybe<Array<(
      { __typename?: 'RecipeEdge' }
      & Pick<RecipeEdge, 'cursor'>
      & { node?: Maybe<(
        { __typename?: 'Recipe' }
        & RecipeOverviewFragment
      )> }
    )>>, pageInfo: (
      { __typename?: 'PageInfo' }
      & Pick<PageInfo, 'cursor' | 'hasNextPage'>
    ) }
  ) }
);

export const RecipeDetailFragmentDoc = gql`
    fragment RecipeDetail on Recipe {
  id
  name
  slug
  isLiked
  servings
  importUrl
  numOfLikes
  ingredients
  instructions
  date {
    creation
    lastUpdate
  }
  images {
    name
    url
  }
  createdBy {
    id
    avatar
    username
    name {
      full
    }
  }
  time {
    prep
    cook
    ready
    total
    active
    inactive
  }
}
    `;
export const RecipeOverviewFragmentDoc = gql`
    fragment RecipeOverview on Recipe {
  id
  name
  slug
  isLiked
  servings
  time {
    total
  }
  date {
    creation
  }
  images {
    name
    url
  }
  createdBy {
    id
    avatar
    username
    name {
      full
    }
  }
}
    `;
export const ToggleRecipeLikeDocument = gql`
    mutation ToggleRecipeLike($recipeID: ID!) {
  toggleRecipeLike(recipeID: $recipeID) {
    id
    isLiked
  }
}
    `;
export type ToggleRecipeLikeMutationFn = Apollo.MutationFunction<ToggleRecipeLikeMutation, ToggleRecipeLikeMutationVariables>;

/**
 * __useToggleRecipeLikeMutation__
 *
 * To run a mutation, you first call `useToggleRecipeLikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useToggleRecipeLikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toggleRecipeLikeMutation, { data, loading, error }] = useToggleRecipeLikeMutation({
 *   variables: {
 *      recipeID: // value for 'recipeID'
 *   },
 * });
 */
export function useToggleRecipeLikeMutation(baseOptions?: Apollo.MutationHookOptions<ToggleRecipeLikeMutation, ToggleRecipeLikeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ToggleRecipeLikeMutation, ToggleRecipeLikeMutationVariables>(ToggleRecipeLikeDocument, options);
      }
export type ToggleRecipeLikeMutationHookResult = ReturnType<typeof useToggleRecipeLikeMutation>;
export type ToggleRecipeLikeMutationResult = Apollo.MutationResult<ToggleRecipeLikeMutation>;
export type ToggleRecipeLikeMutationOptions = Apollo.BaseMutationOptions<ToggleRecipeLikeMutation, ToggleRecipeLikeMutationVariables>;
export const GetRecipeDetailDocument = gql`
    query GetRecipeDetail($slug: String!) {
  getRecipeDetail(slug: $slug) {
    ...RecipeDetail
  }
}
    ${RecipeDetailFragmentDoc}`;

/**
 * __useGetRecipeDetailQuery__
 *
 * To run a query within a React component, call `useGetRecipeDetailQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRecipeDetailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRecipeDetailQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useGetRecipeDetailQuery(baseOptions: Apollo.QueryHookOptions<GetRecipeDetailQuery, GetRecipeDetailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRecipeDetailQuery, GetRecipeDetailQueryVariables>(GetRecipeDetailDocument, options);
      }
export function useGetRecipeDetailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRecipeDetailQuery, GetRecipeDetailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRecipeDetailQuery, GetRecipeDetailQueryVariables>(GetRecipeDetailDocument, options);
        }
export type GetRecipeDetailQueryHookResult = ReturnType<typeof useGetRecipeDetailQuery>;
export type GetRecipeDetailLazyQueryHookResult = ReturnType<typeof useGetRecipeDetailLazyQuery>;
export type GetRecipeDetailQueryResult = Apollo.QueryResult<GetRecipeDetailQuery, GetRecipeDetailQueryVariables>;
export const GetRecipesDocument = gql`
    query GetRecipes($limit: Int!, $cursor: ID, $sort: SortInput!, $filters: [FilterInput!]) {
  getRecipes(limit: $limit, cursor: $cursor, sort: $sort, filters: $filters) {
    edges {
      cursor
      node {
        ...RecipeOverview
      }
    }
    pageInfo {
      cursor
      hasNextPage
    }
  }
}
    ${RecipeOverviewFragmentDoc}`;

/**
 * __useGetRecipesQuery__
 *
 * To run a query within a React component, call `useGetRecipesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRecipesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRecipesQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *      sort: // value for 'sort'
 *      filters: // value for 'filters'
 *   },
 * });
 */
export function useGetRecipesQuery(baseOptions: Apollo.QueryHookOptions<GetRecipesQuery, GetRecipesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRecipesQuery, GetRecipesQueryVariables>(GetRecipesDocument, options);
      }
export function useGetRecipesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRecipesQuery, GetRecipesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRecipesQuery, GetRecipesQueryVariables>(GetRecipesDocument, options);
        }
export type GetRecipesQueryHookResult = ReturnType<typeof useGetRecipesQuery>;
export type GetRecipesLazyQueryHookResult = ReturnType<typeof useGetRecipesLazyQuery>;
export type GetRecipesQueryResult = Apollo.QueryResult<GetRecipesQuery, GetRecipesQueryVariables>;