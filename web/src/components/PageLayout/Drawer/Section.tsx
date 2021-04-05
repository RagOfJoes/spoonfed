import Link from "next/link";
import { memo } from "react";
import { useRouter } from "next/router";
import { useDrawerStyle } from "./Drawer.style";
import Skeleton from "@material-ui/lab/Skeleton";

type SectionLink = {
  link: string;
  title: string;
};

type Props = {
  title: string;
  loading?: boolean;
  links?: SectionLink[];
};

const Section = (props: Props) => {
  const { title, links, loading } = props;
  const router = useRouter();
  const classes = useDrawerStyle();

  if (loading) {
    return (
      <div className={classes.sectionContainer}>
        {title ? (
          <span className={classes.sectionTItle}>{title}</span>
        ) : (
          <Skeleton height={21} variant="rect">
            <span className={classes.sectionTItle}>_______</span>
          </Skeleton>
        )}

        {Array.from({ length: 3 }).map((_, i) => {
          return (
            <Skeleton key={`drawer-section-skeleton-${i}`}>
              <div className={classes.sectionButton}>
                <span>___________</span>
              </div>
            </Skeleton>
          );
        })}
      </div>
    );
  }

  return (
    <div className={classes.sectionContainer}>
      <span className={classes.sectionTItle}>{title}</span>

      {links?.map((item) => {
        const { title, link } = item;
        const className =
          link === router.route
            ? `${classes.sectionButton} sectionActive`
            : classes.sectionButton;
        return (
          <Link shallow key={link} href={{ pathname: link, query: {} }}>
            <div className={className}>
              <span>{title}</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default memo(Section);
