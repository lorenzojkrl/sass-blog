import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFeather } from "@fortawesome/free-solid-svg-icons";
import {
  createStyles,
  Header,
  HoverCard,
  Group,
  Button,
  UnstyledButton,
  Text,
  SimpleGrid,
  ThemeIcon,
  Anchor,
  Divider,
  Center,
  Box,
  Burger,
  Drawer,
  Collapse,
  ScrollArea,
  rem,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconNotification,
  IconCode,
  IconBook,
  IconHelp,
  IconChartPie3,
  IconFingerprint,
  IconCoin,
  IconChevronDown,
} from "@tabler/icons";

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

  hiddenMobile: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },
}));

const pricingData = [
  {
    icon: IconBook,
    title: "10 free drafts",
    description: "Sign up and get 10 free drafts",
  },
  {
    icon: IconCoin,
    title: "10$ = 100 drafts",
    description: `Get 100 drafts for 10$ | No expiration date | No subscription`,
  },
  {
    icon: IconHelp,
    title: "Help us = 100 drafts",
    description: `Help us building a better tool. Email: contact@aiseowriter.co`,
  },
];

export function Navbar() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const { classes, theme } = useStyles();

  const pricingLinks = pricingData.map((item) => (
    <UnstyledButton className={classes.subLink} key={item.title}>
      <Group noWrap align="flex-start">
        <ThemeIcon size={34} variant="default" radius="md">
          <item.icon size={rem(22)} color={theme.fn.primaryColor()} />
        </ThemeIcon>
        <div>
          <Text size="sm" fw={500}>
            {item.title}
          </Text>
          <Text size="xs" color="dimmed">
            {item.description}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  ));

  return (
    <div className="w-full">
      <nav className="container relative  flex flex-wrap items-center justify-between p-8 mx-auto lg:justify-between xl:px-0">
        <Box className="lg:pb-20" style={{ width: "100%" }}>
          <Header height={60} px="md ">
            <Group position="apart" className="w-full" sx={{ height: "100%" }}>
              <Group>
                <Title order={2} className="text-slate-900/90">
                  AI SEO Writer
                </Title>

                <FontAwesomeIcon
                  icon={faFeather}
                  size="lg"
                  className=" text-slate-900/90"
                ></FontAwesomeIcon>
              </Group>
              <Group
                sx={{ height: "100%" }}
                spacing={0}
                className={classes.hiddenMobile}
              >
                <a href="#" className={classes.link}>
                  Home
                </a>
                {/* <HoverCard
                  width={600}
                  position="bottom"
                  radius="md"
                  shadow="md"
                  withinPortal
                >
                  <HoverCard.Target>
                    <a href="#" className={classes.link}>
                      <Center inline>
                        <Box component="span" mr={5}>
                          Features
                        </Box>
                        <IconChevronDown
                          size={16}
                          color={theme.fn.primaryColor()}
                        />
                      </Center>
                    </a>
                  </HoverCard.Target>

                  <HoverCard.Dropdown sx={{ overflow: "hidden" }}>
                    <Group position="apart" px="md">
                      <Text fw={500}>Features</Text>
                      <Anchor href="#" fz="xs">
                        View all
                      </Anchor>
                    </Group>

                    <Divider
                      my="sm"
                      mx="-md"
                      color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
                    />

                    <SimpleGrid cols={2} spacing={0}>
                      {links}
                    </SimpleGrid>

                    <div className={classes.dropdownFooter}>
                      <Group position="apart">
                        <div>
                          <Text fw={500} fz="sm">
                            Get started
                          </Text>
                          <Text size="xs" color="dimmed">
                            Their food sources have decreased, and their numbers
                          </Text>
                        </div>
                        <Button variant="default">Get started</Button>
                      </Group>
                    </div>
                  </HoverCard.Dropdown>
                </HoverCard> */}
                <a href="#" className={classes.link}>
                  Features (To Come)
                </a>
                <Link href="/post/new" className={classes.link}>
                  Try 10 free drafts
                </Link>
                <HoverCard
                  width={600}
                  position="bottom"
                  radius="md"
                  shadow="md"
                  withinPortal
                >
                  <HoverCard.Target>
                    <a href="#" className={classes.link}>
                      <Center inline>
                        <Box component="span" mr={5}>
                          Pricing
                        </Box>
                        <IconChevronDown
                          size={16}
                          color={theme.fn.primaryColor()}
                        />
                      </Center>
                    </a>
                  </HoverCard.Target>

                  <HoverCard.Dropdown sx={{ overflow: "hidden" }}>
                    <Group position="apart" px="md">
                      <Text fw={500}>Starter pricing</Text>
                    </Group>

                    <Divider
                      my="sm"
                      mx="-md"
                      color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
                    />

                    <SimpleGrid cols={2} spacing={0}>
                      {pricingLinks}
                    </SimpleGrid>

                    <div className={classes.dropdownFooter}>
                      <Group position="apart">
                        <div>
                          <Text fw={500} fz="sm">
                            Get 10 free drafts
                          </Text>
                          <Text size="xs" color="dimmed">
                            Get 10 free drafts on signup
                          </Text>
                        </div>
                        <Button variant="default">
                          <Link href="/post/new">Get started</Link>
                        </Button>
                      </Group>
                    </div>
                  </HoverCard.Dropdown>
                </HoverCard>
              </Group>
              <Group className={classes.hiddenMobile}>
                <Link
                  href="/post/new"
                  className="px-8 py-2 text-lg font-medium text-center text-white bg-indigo-700 rounded-md "
                >
                  Log in
                </Link>
                <Link
                  href="/post/new"
                  className="px-8 py-2 text-lg font-medium text-center text-white bg-indigo-700 rounded-md "
                >
                  Sign up
                </Link>
              </Group>
              <Burger
                opened={drawerOpened}
                onClick={toggleDrawer}
                className={classes.hiddenDesktop}
              />
            </Group>
          </Header>

          <Drawer
            opened={drawerOpened}
            onClose={closeDrawer}
            size="100%"
            padding="md"
            title="Navigation"
            className={classes.hiddenDesktop}
            zIndex={1000000}
          >
            <ScrollArea h={`calc(100vh - ${rem(60)})`} mx="-md">
              <Divider
                my="sm"
                color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
              />

              <a href="#" className={classes.link}>
                Home
              </a>
              {/* <UnstyledButton className={classes.link} onClick={toggleLinks}>
                <Center inline>
                  <Box component="span" mr={5}>
                    Features (To Come)
                  </Box>
                  <IconChevronDown size={16} color={theme.fn.primaryColor()} />
                </Center>
              </UnstyledButton>
              <Collapse in={linksOpened}>{links}</Collapse> */}
              <a href="#" className={classes.link}>
                Features (To Come)
              </a>
              <Link href="/post/new" className={classes.link}>
                Try 10 free drafts
              </Link>

              <Divider
                my="sm"
                color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
              />

              <Group position="center" grow pb="xl" px="md">
                {/* <Button variant="default">Log in</Button> */}
                <Link href="/post/new">Sign up</Link>
                <Link href="/post/new">Log in</Link>
              </Group>
            </ScrollArea>
          </Drawer>
        </Box>
      </nav>
    </div>
  );
}
