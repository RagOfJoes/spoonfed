import clsx from "clsx";
import { useCarouselStyle } from "./Carousel.style";

const PaginationButton = ({
  selected,
  onClick,
}: {
  selected: boolean;
  onClick: () => void;
}) => {
  const classes = useCarouselStyle();
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(selected && "is-selected", classes.dot)}
    />
  );
};

export default PaginationButton;
