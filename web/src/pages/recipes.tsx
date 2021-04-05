import Recipes from "containers/Recipes";
import RecipesProvider from "context/recipes";
import PageLayout from "components/PageLayout";

const RecipesPage = () => {
  return (
    <>
      <RecipesProvider>
        <PageLayout>
          <Recipes />
        </PageLayout>
      </RecipesProvider>
    </>
  );
};

export default RecipesPage;
