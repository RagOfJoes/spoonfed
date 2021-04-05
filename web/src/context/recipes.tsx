import { forceCheck } from "react-lazyload";
import { ApolloError } from "@apollo/client";
import {
  useMemo,
  Dispatch,
  useState,
  useEffect,
  ReactNode,
  useContext,
  createContext,
  SetStateAction,
} from "react";
import { DEFAULT_RECIPES_VARIABLE } from "constants/constants";
import {
  useGetRecipesQuery,
  QueryGetRecipesArgs,
  GetRecipesQueryHookResult,
} from "generated/graphql";

type RecipesContext = GetRecipesQueryHookResult & {
  defaultVariables: QueryGetRecipesArgs;

  isFetching: boolean;
  toggleFetching: Dispatch<SetStateAction<boolean>>;

  isSorting: boolean;
  toggleSorting: Dispatch<SetStateAction<boolean>>;
};

export const RecipesContext = createContext<RecipesContext>({} as RecipesContext);

const RecipesProvider = (props: { children: NonNullable<ReactNode> }) => {
  const { children } = props;
  const [isSorting, toggleSorting] = useState(false);
  const [isFetching, toggleFetching] = useState(true);

  const defaultVariables = DEFAULT_RECIPES_VARIABLE;
  const res = useGetRecipesQuery({
    ssr: false,
    variables: defaultVariables,
    onCompleted: () => toggleFetching(false),
    onError: async (e: ApolloError) => {
      console.log(e);
    },
  });

  // When sorting force
  // react-lazyload to check
  // if newly mounted components
  // are in viewport
  useEffect(() => {
    forceCheck();
  }, [isSorting]);

  const value: RecipesContext = useMemo(
    () => ({
      ...res,
      defaultVariables,

      isFetching,
      toggleFetching,

      isSorting,
      toggleSorting,
    }),
    [res.data, res.loading, isSorting, isFetching]
  );

  return (
    <RecipesContext.Provider value={value}>{children}</RecipesContext.Provider>
  );
};

export default RecipesProvider;

export const useRecipes = () => useContext(RecipesContext);
