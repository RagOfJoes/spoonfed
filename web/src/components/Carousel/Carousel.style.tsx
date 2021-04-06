import { Theme, lighten, createStyles, makeStyles } from "@material-ui/core";

const carouselStyles = ({ shape, spacing, palette }: Theme) => {
  return createStyles({
    // Containers
    embla: {
      marginLeft: "auto",
      marginRight: "auto",
      position: "relative",
      borderRadius: shape.borderRadius,
    },
    viewport: {
      width: "100%",
      overflow: "hidden",

      "&.is-draggable": {
        cursor: "grab",
      },

      "&.is-dragging": {
        cursor: "grabbing",
      },
    },
    container: {
      display: "flex",
      marginLeft: -10,
      userSelect: "none",
    },
    // Slides
    slide: {
      paddingLeft: 10,
      minWidth: "80%",
      position: "relative",
    },
    slideInner: {
      height: 0,
      overflow: "hidden",
      position: "relative",
      paddingBottom: "75%",
      borderRadius: shape.borderRadius,
    },
    slideParallax: {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      position: "absolute",
    },
    slideImg: {
      top: "50%",
      left: "50%",
      width: "auto",
      display: "block",
      maxWidth: "none",
      minWidth: "100%",
      minHeight: "100%",
      position: "absolute",
      transform: "translate(-50%,-50%)",
    },
    // Pagination
    dots: {
      display: "flex",
      listStyle: "none",
      paddingTop: spacing(1),
      justifyContent: "center",
    },
    dot: {
      width: 20,
      border: 0,
      outline: 0,
      padding: 0,
      height: 20,
      display: "flex",
      cursor: "pointer",
      position: "relative",
      alignItems: "center",
      marginLeft: spacing(0.5),
      marginRight: spacing(0.5),
      backgroundColor: "transparent",

      "&:after": {
        height: 6,
        content: '""',
        width: "100%",
        borderRadius: shape.borderRadius,
        backgroundColor: lighten(palette.primary.main, 0.6),
      },

      "&.is-selected:after": {
        opacity: 1,
        backgroundColor: palette.primary.main,
      },
    },
  });
};

const useCarouselStyle = makeStyles(carouselStyles, { name: "Carousel" });

export { carouselStyles, useCarouselStyle };
