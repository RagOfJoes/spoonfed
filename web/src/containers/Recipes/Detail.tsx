import { useState } from "react";
import { useRouter } from "next/router";
import Dialog from "@material-ui/core/Dialog";
import makeStyles from "@material-ui/core/styles/makeStyles";
import RecipeDetail from "components/RecipeDetail";
import { User, RecipeTime, useGetRecipeDetailQuery } from "generated/graphql";

const useStyles = makeStyles(
  (theme) => ({
    container: {
      width: "100%",
      overflow: "hidden",
      [theme.breakpoints.down("xs")]: {
        margin: theme.spacing(2),
        maxWidth: `calc(100% - ${theme.spacing(4)}px) !important`,
      },
    },
  }),
  { name: "RecipePageDetailModal" }
);

const Detail = () => {
  const router = useRouter();
  const classes = useStyles();
  const [hasError, toggleError] = useState(false);
  const { data, error, loading } = useGetRecipeDetailQuery({
    ssr: false,
    skip: !router.query?.recipeSlug,
    variables: { slug: router.query?.recipeSlug?.toString() },
  });

  let Content;
  if (error || loading || !data?.getRecipeDetail) {
    // if (true) {
    Content = <RecipeDetail loading />;
  } else {
    const {
      name,
      time,
      servings,
      createdBy,
      importUrl,
      ingredients,
      instructions,
    } = data.getRecipeDetail;
    Content = (
      <RecipeDetail
        name={name}
        servings={servings}
        time={time as RecipeTime}
        ingredients={ingredients}
        instructions={instructions}
        createdBy={createdBy as User}
        importUrl={importUrl || undefined}
      />
    );
  }

  return (
    <Dialog
      maxWidth="md"
      scroll="body"
      disableBackdropClick={hasError}
      disableEscapeKeyDown={hasError}
      open={!!router.query?.recipeSlug}
      onClose={() =>
        !hasError &&
        router.push("/recipes", "/recipes", { scroll: false, shallow: true })
      }
      onBackdropClick={() =>
        !hasError &&
        router.push("/recipes", "/recipes", { scroll: false, shallow: true })
      }
      PaperProps={{
        elevation: 0,
        className: classes.container,
      }}
    >
      {Content}
    </Dialog>
  );
};

export default Detail;
