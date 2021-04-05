import { FC, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import Carousel from "components/Carousel";
import CollapsibleList from "components/CollapsibleList";
import RecipeDetailLoading from "./RecipeDetail.loading";
import Header, { RecipeDetailHeaderProps } from "./Header";
import { useRecipeDetailStyle } from "./RecipeDetail.style";
import { Image, RecipeTime, User } from "generated/graphql";

type RecipeDetailProps = {
  // Recipe props
  id?: string;
  name?: string;
  images?: Image[];
  createdBy?: User;
  time?: RecipeTime;
  isLiked?: boolean;
  servings?: string;
  importUrl?: string;
  ingredients?: string[];
  instructions?: string[];
  // Component Props
  error?: boolean;
  loading?: boolean;
};

const RecipeDetail: FC<RecipeDetailProps> = (props: RecipeDetailProps) => {
  const { error, loading } = props;

  const classes = useRecipeDetailStyle();
  const [selected, setSelected] = useState<number[]>([]);
  // Prioritize error
  if (error) {
    return (
      <Container>
        <h1>Invalid Recipe Provided</h1>
      </Container>
    );
  }

  // Handle loading state
  if (loading) {
    return (
      <Container>
        <RecipeDetailLoading />
      </Container>
    );
  }

  return (
    <Container>
      <Header {...(props as RecipeDetailHeaderProps)} />

      <Grid item xs={12} container spacing={1} className={classes.body}>
        <Grid item sm={8} xs={12} container wrap="nowrap" direction="column">
          <Grid item className={classes.carousel}>
            {/* <Carousel images={images} /> */}
            <Carousel />
            {/* <div
              style={{ width: "100%", height: 400, background: "#fff" }}
            ></div> */}
          </Grid>

          <Hidden xsDown implementation="css">
            <Grid item className={classes.instructions}>
              <CollapsibleList
                disableCollapse
                title="Instructions"
                selectVariant="follow"
                selected={selected}
                setSelected={setSelected}
                items={
                  props?.instructions
                    ?.filter(
                      (instruction) =>
                        typeof instruction === "string" &&
                        instruction.trim().length > 0
                    )
                    .map((instruction) => ({
                      label: instruction,
                    })) || []
                }
              />
            </Grid>
          </Hidden>
        </Grid>

        <Grid
          item
          sm={4}
          xs={12}
          container
          direction="column"
          className={classes.meta}
        >
          <Grid item className={classes.times}>
            <CollapsibleList
              title="Times"
              disableSelectable
              defaultCollapsed={false}
              items={Object.keys(props?.time || {})
                .map((key) => ({
                  title: key[0].toUpperCase() + key.slice(1),
                  label: props?.time?.[key as keyof RecipeTime] || "",
                }))
                .filter(
                  (item) =>
                    item.title !== "__typename" &&
                    typeof item.label === "string" &&
                    item.label.length > 0
                )}
            />
          </Grid>

          <Grid item className={classes.ingredients}>
            <CollapsibleList
              title="Ingredients"
              defaultCollapsed={false}
              items={
                props?.ingredients
                  ?.map((ingredient) => ({
                    label: ingredient,
                  }))
                  .filter(
                    (item) =>
                      typeof item.label === "string" && item.label.length > 0
                  ) || []
              }
            />
          </Grid>

          <Hidden smUp implementation="css">
            <Grid item className={classes.instructions}>
              <CollapsibleList
                disableCollapse
                title="Instructions"
                selectVariant="follow"
                selected={selected}
                setSelected={setSelected}
                items={
                  props?.instructions
                    ?.filter(
                      (instruction) =>
                        typeof instruction === "string" &&
                        instruction.trim().length > 0
                    )
                    .map((instruction) => ({
                      label: instruction,
                    })) || []
                }
              />
            </Grid>
          </Hidden>
        </Grid>
      </Grid>
    </Container>
  );
};

const Container: FC = (props) => {
  const classes = useRecipeDetailStyle();
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      className={classes.container}
    >
      <Grid item container className={classes.content}>
        {props?.children}
      </Grid>
    </Grid>
  );
};

export default RecipeDetail;
