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
  Divider,
  Center,
  Box,
  Burger,
  Drawer,
  ScrollArea,
  rem,
  Title,
  Collapse,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconBook,
  IconCoin,
  IconChevronDown,
  IconLanguage,
} from "@tabler/icons";
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

const freeCopies = 10;
const copiesForTenUSD = 80;
const copiesForHundredUSD = 1000;

const supportedLanguages = [
  { name: "English", locale: "en" },
  { name: "Español", locale: "es" },
  { name: "Italiano", locale: "it" },
];

export function Navbar() {
  const { t } = useTranslation("common");

  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const { classes, theme } = useStyles();

  const pricingData = [
    {
      icon: IconBook,
      title: "pricingTitle_One",
      description: "pricingDescription_One",
      copies: freeCopies,
    },
    {
      icon: IconCoin,
      title: "pricingTitle_Two",
      description: "pricingDescription_Two",
      copies: copiesForTenUSD,
    },
    {
      icon: IconCoin,
      title: "pricingTitle_Three",
      description: "pricingDescription_Three",
      copies: copiesForHundredUSD,
    },
  ];

  const pricingLinks = pricingData.map((item) => (
    <UnstyledButton className={classes.subLink} key={item.title}>
      <Group noWrap>
        <ThemeIcon size={34} variant="default" radius="md">
          <item.icon size={rem(22)} color={theme.fn.primaryColor()} />
        </ThemeIcon>
        <div>
          <Text size="sm" fw={500}>
            {t(item.title, { copies: item.copies })}
          </Text>
          <Text size="xs" color="dimmed">
            {t(item.description, { copies: item.copies })}
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
                  {t("aiseowriter")}
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
                  {t("home")}
                </a>

                <a href="#" className={classes.link}>
                  {t("features")}
                </a>
                <Link href="/post/new" className={classes.link}>
                  {t("startFree")}
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
                          {t("pricing")}
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
                      <Text fw={500}>{t("starterPricing")}</Text>
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
                            {t("startFree")}
                          </Text>
                        </div>
                        <Button variant="default">
                          <Link href="/post/new">{t("G_getStarted")}</Link>
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
                  {t("G_logIn")}
                </Link>
                <Link
                  href="/post/new"
                  className="px-8 py-2 text-lg font-medium text-center text-white bg-indigo-700 rounded-md "
                >
                  {t("G_signUp")}
                </Link>
                <HoverCard
                  width={150}
                  position="bottom"
                  radius="md"
                  shadow="md"
                  withinPortal
                >
                  <HoverCard.Target>
                    <a href="#" className={classes.link}>
                      <Center inline>
                        <IconLanguage size={28} color="rgb(67 56 202)" />
                      </Center>
                    </a>
                  </HoverCard.Target>

                  <HoverCard.Dropdown sx={{ overflow: "hidden" }}>
                    <SimpleGrid cols={1}>
                      {supportedLanguages.map((language) => (
                        <Link
                          href="/"
                          locale={language.locale}
                          key={language.locale}
                          className="text-right"
                        >
                          {language.name}
                        </Link>
                      ))}
                    </SimpleGrid>
                  </HoverCard.Dropdown>
                </HoverCard>
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
                {t("home")}
              </a>

              <a href="#" className={classes.link}>
                {t("features")}
              </a>
              <Link href="/post/new" className={classes.link}>
                {t("startFree")}
              </Link>

              <UnstyledButton className={classes.link} onClick={toggleLinks}>
                <Center inline>
                  <a href="#">
                    <IconLanguage size={22} color="#000" />
                  </a>
                </Center>
              </UnstyledButton>
              <Collapse in={linksOpened}>
                <SimpleGrid cols={1}>
                  {supportedLanguages.map((language) => (
                    <Link
                      href="/"
                      locale={language.locale}
                      key={language.locale}
                      className={classes.link}
                      onClick={toggleLinks}
                    >
                      {language.name}
                    </Link>
                  ))}
                </SimpleGrid>
              </Collapse>

              <Divider
                my="sm"
                color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
              />

              <Group position="center" grow pb="xl" px="md">
                <Link href="/post/new">{t("G_signUp")}</Link>
                <Link href="/post/new">{t("G_logIn")}</Link>
              </Group>
            </ScrollArea>
          </Drawer>
        </Box>
      </nav>
    </div>
  );
}
