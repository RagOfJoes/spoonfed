import { GetServerSideProps } from "next";
import PageLayout from "components/PageLayout";
import RecipeDetail from "containers/RecipeDetail";
import { GetRecipeDetailDocument } from "generated/graphql";
import {
  initializeApollo,
  addPropToApolloState,
} from "utils/apollo/apolloClient";

const RecipeDetailPage = () => {
  return (
    <>
      <PageLayout>
        <RecipeDetail />
      </PageLayout>
    </>
  );
};

export default RecipeDetailPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: GetRecipeDetailDocument,
    variables: {
      slug: params?.recipeSlug,
    },
  });
  return addPropToApolloState(apolloClient, {
    props: {},
  });
};
