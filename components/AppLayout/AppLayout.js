import { useUser } from "@auth0/nextjs-auth0/client";
import { Logo } from "../logo";
import { useContext, useEffect } from "react";
import PostsContext from "../../context/postsContext";
import {
  createStyles,
  Divider,
  Box,
  Drawer,
  ScrollArea,
  rem,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import SidebarFooter from "./sidebarFooter";
import SidebarLoadMore from "./sidebarLoadMore";
import SidebarHeader from "./sidebarHeader";
import MobileHeader from "../mobileHeader";
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

  hiddenDesktop: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
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
  const { classes, theme } = useStyles();

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

  return (
    <>
      <div className="block md:hidden">
        <div className="w-full">
          <nav className="container relative  flex flex-wrap items-center justify-between p-8 mx-auto lg:justify-between xl:px-0">
            <Box className="lg:pb-20" style={{ width: "100%" }}>
              <MobileHeader
                drawerOpened={drawerOpened}
                toggleDrawer={toggleDrawer}
                style={classes.hiddenDesktop}
              />

              <Drawer
                opened={drawerOpened}
                onClose={closeDrawer}
                size="100%"
                padding="md"
                title={t("aiseowriter")}
                className={classes.hiddenDesktop}
                zIndex={1000000}
              >
                <ScrollArea style={{ overflowX: "hidden" }}>
                  <Divider my="sm" color="gray.1" />
                  <SidebarHeader
                    availableTokens={availableTokens}
                    closeDrawer={closeDrawer}
                  ></SidebarHeader>
                  <Divider my="sm" color="gray.1" />
                  <SidebarLoadMore
                    noMorePosts={noMorePosts}
                    getPosts={getPosts}
                    posts={posts}
                    postId={postId}
                    closeDrawer={closeDrawer}
                  ></SidebarLoadMore>
                  <Divider my="sm" color="gray.1" />
                  <SidebarFooter user={user}></SidebarFooter>
                </ScrollArea>
              </Drawer>
            </Box>
          </nav>
        </div>
        {children}
      </div>
      <div className="hidden md:block">
        <div className="grid grid-cols-[300px_1fr] h-screen max-h-screen">
          <div className="flex flex-col text-white overflow-hidden">
            <div className="bg-slate-800 px-2 ">
              <Logo />
              <Divider my="sm" color="rgb(30 41 59)" />
              <SidebarHeader
                availableTokens={availableTokens}
                closeDrawer={closeDrawer}
              ></SidebarHeader>
              <Divider my="sm" color="rgb(30 41 59)" />
            </div>
            <div className="flex-1 bg-gradient-to-b from-slate-800 to-cyan-800">
              <SidebarLoadMore
                noMorePosts={noMorePosts}
                getPosts={getPosts}
                posts={posts}
                postId={postId}
                closeDrawer={closeDrawer}
              ></SidebarLoadMore>
            </div>
            <div className="pt-2 bg-cyan-800 flex items-center gap-2 border-t border-t-black/50 h-20 px-2">
              <SidebarFooter user={user}></SidebarFooter>
            </div>
          </div>
          {children}
        </div>
      </div>
    </>
  );
};
