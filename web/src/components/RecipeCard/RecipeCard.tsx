import Link from "next/link";
import { FC, memo } from "react";
import Card from "@material-ui/core/Card";
import Avatar from "@material-ui/core/Avatar";
import RestaurantRoundedIcon from "@material-ui/icons/RestaurantRounded";
import AccessTimeRoundedIcon from "@material-ui/icons/AccessTimeRounded";
import Thumbnail from "./Thumbnail";
import { useRecipeCardStyle } from "./RecipeCard.style";
import { Image, Maybe, Scalars, User } from "generated/graphql";
import RecipeCardLoading from "./RecipeCard.loading";

export type RecipeCardProps = {
  // Recipe props
  name?: string;
  slug?: string;
  images?: Image[];
  createdBy?: User;
  servings?: string;
  isLiked?: Maybe<Scalars["Boolean"]>;

  // Component props
  as?: string;
  href?: string;
  skeleton?: boolean;
  totalTime?: string;
  onLike?: () => Promise<void>;
};

const RecipeCard: FC<RecipeCardProps> = (props: RecipeCardProps) => {
  const {
    isLiked,
    skeleton,
    servings,
    totalTime,
    createdBy: { avatar, username } = {
      avatar: "",
      username: "",
    } as User,
  } = props;

  const classes = useRecipeCardStyle({ isLiked });

  if (skeleton) return <RecipeCardLoading />;

  return (
    <Card elevation={0} className={`${classes.container}`}>
      <Thumbnail {...props} />

      <div className={classes.content}>
        <div className={classes.createdBy}>
          <Link
            shallow
            passHref
            as={`/u/${username}/t/recipes`}
            href={{
              pathname: "/u/[username]/t/[tab]",
              query: { username, tab: "recipes" },
            }}
          >
            <Avatar
              src={avatar || ""}
              title={username || ""}
              alt={username ?? "Avatar"}
              className={classes.avatar}
            >
              {username?.[0]}
            </Avatar>
          </Link>

          <Link
            shallow
            passHref
            as={`/u/${username}/t/recipes`}
            href={{
              pathname: "/u/[username]/t/[tab]",
              query: { username, tab: "recipes" },
            }}
          >
            <span className={classes.username}>{username}</span>
          </Link>
        </div>

        <div className={classes.metaContainer}>
          <div className={classes.meta}>
            <RestaurantRoundedIcon className={classes.metaIcon} />
            <span className={classes.metaValue}>{servings}</span>
          </div>
          <div className={classes.meta}>
            <AccessTimeRoundedIcon className={classes.metaIcon} />
            <span className={classes.metaValue}>{totalTime}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default memo(RecipeCard);
