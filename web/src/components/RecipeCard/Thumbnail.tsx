import Link from "next/link";
import LazyLoad from "react-lazyload";
import { FC, memo, useState } from "react";
import { motion } from "framer-motion";
import Skeleton from "@material-ui/lab/Skeleton";
import CardMedia from "@material-ui/core/CardMedia";
import LikedIcon from "@material-ui/icons/Favorite";
import CardActionArea from "@material-ui/core/CardActionArea";
import { RecipeCardProps } from "./RecipeCard";
import { useRecipeCardStyle } from "./RecipeCard.style";

type RecipeCardThumbnail = Pick<
  RecipeCardProps,
  "as" | "name" | "href" | "slug" | "images" | "onLike" | "isLiked"
>;

const Thumbnail: FC<RecipeCardThumbnail> = (props: RecipeCardThumbnail) => {
  const { as, name, href, slug, images, isLiked } = props;
  const classes = useRecipeCardStyle({ isLiked });

  return (
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

        <Overlay {...props} />
      </CardActionArea>
    </Link>
  );
};

const Overlay: FC<RecipeCardThumbnail> = (props: RecipeCardThumbnail) => {
  const { name, onLike, isLiked } = props;
  const classes = useRecipeCardStyle({ isLiked });
  const [hovering, setHovering] = useState(false);
  return (
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

export default memo(Thumbnail);
