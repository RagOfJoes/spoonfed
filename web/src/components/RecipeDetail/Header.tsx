import { FC } from "react";
import Link from "next/link";
import { memo } from "react";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import LinkIcon from "@material-ui/icons/Link";
import LikedIcon from "@material-ui/icons/Favorite";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import TimelapseIcon from "@material-ui/icons/Timelapse";
import makeStyles from "@material-ui/core/styles/makeStyles";
import UnLikedIcon from "@material-ui/icons/FavoriteBorderRounded";
import RestaurantIcon from "@material-ui/icons/RestaurantRounded";
import Tag from "components/Tag";
import { prettifyURL } from "utils/url";
import { RecipeTime, User } from "generated/graphql";

export type RecipeDetailHeaderProps = {
  id: string;
  name: string;
  time: RecipeTime;
  isLiked: boolean;
  servings: string;
  importUrl?: string;
  createdBy: User;
  // Callback
  onLike?: (id: string) => Promise<void>;
};

const useStyles = makeStyles(
  ({ spacing, palette }) => ({
    header: {
      padding: spacing(2, 3),
      backgroundColor: palette.background.paper,
    },
    title: {
      display: "flex",
      alignItems: "center",
    },
    metaContainer: {
      marginTop: spacing(0.25),
    },
  }),
  { name: "RecipeDetailHeader" }
);

const RecipeDetailHeader: FC<RecipeDetailHeaderProps> = (
  props: RecipeDetailHeaderProps
) => {
  const {
    id,
    name,
    time,
    onLike,
    isLiked,
    servings,
    importUrl,
    createdBy,
  } = props;

  const classes = useStyles();

  return (
    <Grid
      item
      xs={12}
      container
      wrap="nowrap"
      direction="column"
      justify="space-between"
      className={classes.header}
    >
      <Grid item className={classes.title}>
        <Typography variant="h6">{name}</Typography>
        <IconButton
          onClick={async () => {
            if (!!onLike && !!id) {
              try {
                await onLike(id);
              } catch (e) {}
            }
          }}
        >
          {isLiked ? (
            <LikedIcon fontSize="small" color="error" />
          ) : (
            <UnLikedIcon fontSize="small" />
          )}
        </IconButton>{" "}
      </Grid>

      <Grid item container spacing={1} className={classes.metaContainer}>
        <Grid item>
          <Tag label={servings || ""} icon={<RestaurantIcon />} />
        </Grid>

        {time?.total && (
          <Grid item>
            <Tag label={time.total || ""} icon={<TimelapseIcon />} />
          </Grid>
        )}

        <Grid item>
          <Link
            shallow
            as={
              (!!createdBy?.username && `/u/${createdBy.username}/t/recipes`) ||
              undefined
            }
            href={{
              query: { username: createdBy?.username },
              pathname: "/u/[username]/t/[tab]",
            }}
          >
            <Tag
              label={createdBy?.username || ""}
              avatar={<Avatar src={createdBy?.avatar || ""} />}
            />
          </Link>
        </Grid>

        {importUrl && (
          <Grid item>
            <Tag
              clickable
              // component="a"
              color="primary"
              // target="_blank"
              // href={importUrl}
              icon={<LinkIcon />}
              label={prettifyURL(importUrl)}
            />
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default memo(RecipeDetailHeader);
