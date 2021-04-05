import Link from "next/link";
import LazyLoad from "react-lazyload";
import { FC, memo, useState } from "react";
import { motion } from "framer-motion";
import Card from "@material-ui/core/Card";
import Avatar from "@material-ui/core/Avatar";
import Skeleton from "@material-ui/lab/Skeleton";
import CardMedia from "@material-ui/core/CardMedia";
import LikedIcon from "@material-ui/icons/Favorite";
import CardActionArea from "@material-ui/core/CardActionArea";
import RestaurantRoundedIcon from "@material-ui/icons/RestaurantRounded";
import AccessTimeRoundedIcon from "@material-ui/icons/AccessTimeRounded";
import { useRecipeCardStyle } from "./RecipeCard.style";
import { Image, Maybe, Scalars, User } from "generated/graphql";
import RecipeCardLoading from "./RecipeCard.loading";

type RecipeCardProps = {
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

const RecipeCard: FC<RecipeCardProps> = ({
  as,
  name,
  href,
  slug,
  images,
  onLike,
  isLiked,
  skeleton,
  servings,
  totalTime,
  createdBy: { avatar, username } = {
    avatar: "",
    username: "",
  } as User,
}: RecipeCardProps) => {
  const classes = useRecipeCardStyle({ isLiked });
  const [hovering, setHovering] = useState(false);

  if (skeleton) return <RecipeCardLoading />;

  return (
    <Card elevation={0} className={`${classes.container}`}>
      <Link
        shallow
        passHref
        scroll={false}
        as={as || `/r/${slug}`}
        href={href || `/?recipeSlug=${slug}`}
      >
        <CardActionArea disableRipple className={classes.imageBtn}>
          <LazyLoad
            debounce
            placeholder={
              <Skeleton
                width="100%"
                variant="rect"
                style={{ height: 0, paddingBottom: "75%" }}
              />
            }
          >
            <CardMedia
              title={name}
              component="div"
              image={images?.[0].url}
              className={classes.image}
            />
          </LazyLoad>
          <motion.div
            className={classes.overlay}
            variants={overlayAnimations}
            onHoverEnd={() => setHovering(false)}
            onHoverStart={() => setHovering(true)}
            animate={hovering ? "hovering" : "initial"}
          >
            <div className={classes.overlayWrapper}>
              <span className={classes.name}>{name}</span>

              <motion.div
                className={classes.actionButton}
                transition={{
                  duration: 0.02,
                }}
                variants={{
                  initial: { scale: 0 },
                  hovering: { scale: 1 },
                }}
                onClick={async (e) => {
                  if (!!!onLike) return;
                  e.preventDefault();
                  try {
                    await onLike();
                  } catch (e: any) {}
                }}
              >
                <LikedIcon className={classes.actionIcon} />
              </motion.div>
            </div>
          </motion.div>
        </CardActionArea>
      </Link>

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

const overlayAnimations = {
  initial: {
    opacity: 0,
  },
  hovering: {
    opacity: 1,
  },
};

export default memo(RecipeCard);
