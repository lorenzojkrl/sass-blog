import { useUser } from "@auth0/nextjs-auth0/client";
import { useContext, useEffect } from "react";
import PostsContext from "../../context/postsContext";
import { createStyles, Divider, rem } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import SidebarHeader from "./sidebarHeader";
import SidebarLoadMore from "./sidebarLoadMore";
import SidebarCTA from "./sidebarCTA";
import SidebarFooter from "./sidebarFooter";
import Header from "../Header";
import useTranslation from "next-translate/useTranslation";

const useStyles = createStyles((theme) => ({
  link: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: "none",
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,

    [theme.fn.smallerThan("sm")]: {
      height: rem(42),
      display: "flex",
      alignItems: "center",
      width: "100%",
    },

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    }),
  },

  subLink: {
    width: "100%",
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    borderRadius: theme.radius.md,

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
    }),

    "&:active": theme.activeStyles,
  },

  dropdownFooter: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.colors.gray[0],
    margin: `calc(${theme.spacing.md} * -1)`,
    marginTop: theme.spacing.sm,
    padding: `${theme.spacing.md} calc(${theme.spacing.md} * 2)`,
    paddingBottom: theme.spacing.xl,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1]
    }`,
  },
}));

export const AppLayout = ({
  children,
  availableTokens,
  posts: postsFromSSR, //alias to avoid conflicts
  postId,
  postCreated,
}) => {
  const { t } = useTranslation("common");
  const { user } = useUser();
  const { setPostsFromSSR, posts, getPosts, noMorePosts } =
    useContext(PostsContext);
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const { classes } = useStyles();

  useEffect(() => {
    setPostsFromSSR(postsFromSSR);
    // Check if user selected post exists, otherwise load all newer posts
    if (postId) {
      const exists = postsFromSSR.find((p) => p._id === postId);
      if (!exists) {
        getPosts({ getNewerPosts: true, lastPostDate: postCreated });
      }
    }
  }, [setPostsFromSSR, postsFromSSR, postId, getPosts, postCreated]);
  // setpostsFromSSR won't ever change because memoized

  // Refactor to remove duplications
  return (
    <>
      <div className="block hide-on-large-screens w-full bg-gray-10">
        <Header drawerOpened={drawerOpened} toggleDrawer={toggleDrawer} />
        {drawerOpened ? (
          <div className="grid lg:grid-cols-[300px_1fr] h-screen max-h-screen">
            <div className="flex flex-col text-white overflow-hidden bg-gray-8 px-4">
              <Divider color="gray.7" />
              <SidebarHeader
                drawerOpened={drawerOpened}
                availableTokens={availableTokens}
                toggleDrawer={toggleDrawer}
              />
              <SidebarLoadMore
                noMorePosts={noMorePosts}
                getPosts={getPosts}
                posts={posts}
                postId={postId}
                toggleDrawer={toggleDrawer}
              />
              <SidebarCTA toggleDrawer={toggleDrawer} />
              <Divider color="gray.7" />
              <SidebarFooter user={user} toggleDrawer={toggleDrawer} />
            </div>
          </div>
        ) : (
          children
        )}
      </div>

      <div className="hide-on-small-screens">
        <div className="grid lg:grid-cols-[300px_1fr] h-screen max-h-screen">
          <div className="flex flex-col text-white overflow-hidden bg-gray-8 px-4">
            <Header />
            <Divider color="gray.7" />
            <SidebarHeader availableTokens={availableTokens}></SidebarHeader>
            <SidebarLoadMore
              noMorePosts={noMorePosts}
              getPosts={getPosts}
              posts={posts}
              postId={postId}
            ></SidebarLoadMore>
            <SidebarCTA />
            <Divider color="gray.7" />
            <SidebarFooter user={user}></SidebarFooter>
          </div>
          {children}
        </div>
      </div>
    </>
  );
};
