import Link from "next/link";
import Button from "@material-ui/core/Button";
// import { useUser } from "lib/user";
import { useDrawerStyle } from "./Drawer.style";
// import { useMe } from "lib/Providers/MeProvider";
import Section from "./Section";
import Logo from "components/Logo";

const DefaultContent = () => {
  const classes = useDrawerStyle();
  const sections = [
    {
      title: "Discover",
      links: [
        { title: "Home", link: "/" },
        { title: "Recipes", link: "/recipes" },
      ],
    },
  ];
  return (
    <div>
      <Link shallow href={{ pathname: "/", query: {} }}>
        <div className={classes.logo}>
          <Logo width={25} height={25} />
          <span className={classes.title}>Spoonfed</span>
        </div>
      </Link>
      {sections.map((section) => {
        const { title, links } = section;
        return <Section key={title} title={title} links={links} />;
      })}
    </div>
  );
};

const DrawerContent = () => {
  // const { me } = useMe();
  // const { user, loading } = useUser();
  const classes = useDrawerStyle();
  let Other = (
    <>
      <Section loading title="Your Stuff" />
      <Section loading title="Recipe Collection" />
    </>
  );

  // if (!loading) {
  // if (me && user) {
  // } else {
  Other = (
    <div className={classes.cta}>
      <div className={classes.ctaDescription}>
        <span>
          Cooking doesn't have to be a chore. Join now and make cooking fun!
        </span>
      </div>

      <Button
        color="secondary"
        variant="contained"
        href="/api/signup/"
        className={classes.ctaButton}
      >
        Sign me up!
      </Button>
    </div>
  );
  // }
  // }
  return (
    <>
      <DefaultContent />
      {Other}
    </>
  );
};

export default DrawerContent;
