import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFeather } from "@fortawesome/free-solid-svg-icons";
import {
  HoverCard,
  Group,
  Text,
  SimpleGrid,
  Center,
  Box,
} from "@mantine/core";
import {
  IconChevronDown,
} from "@tabler/icons";
import useTranslation from "next-translate/useTranslation";
import { setCookie } from "../utils/cookieUtils";

const supportedLanguages = [
  { name: "English", locale: "en" },
  { name: "Español", locale: "es" },
  { name: "Italiano", locale: "it" },
];

export function Navbar() {
  const { t, lang } = useTranslation("common");
  const handleLanguageChange = (locale: string) => {
    setCookie("language", locale, 365);
  };

  return (
    <div className="bg-gray-10">
      <nav className="lg:w-[1170px] flex justify-between px-4 py-8 lg:py-16 mx-auto">
        <Group position="apart" className="w-[100%] text-white bg-gray-10" sx={{ height: "100%" }}>
          <Group>
            <FontAwesomeIcon
              icon={faFeather}
              className="toggle-header-font-size"
            ></FontAwesomeIcon>
            <Text className="toggle-header-font-size" fw={700}>
              {t("aiseowriter")}
            </Text>
          </Group>
          <Group >
            <HoverCard
              width={150}
              position="bottom"
              radius="md"
              shadow="md"
              withinPortal
            >
              <HoverCard.Target>
                <Center className="auth-btn bg-gray-9 flex w-[100px] uppercase">
                  <Text className="text-[12px] lg:text-[16px]" mr={10}>{lang}</Text>
                  <IconChevronDown
                    size={16}
                  />
                </Center>
              </HoverCard.Target>

              <HoverCard.Dropdown sx={{ overflow: "hidden" }} className="bg-gray-9 border-none text-white">
                <SimpleGrid cols={1}>
                  {supportedLanguages.map((language) => (
                    <Link
                      href="/"
                      locale={language.locale}
                      key={language.locale}
                      className="text-right"
                      onClick={() => handleLanguageChange(language.locale)}
                    >
                      {language.name}
                    </Link>
                  ))}
                </SimpleGrid>
              </HoverCard.Dropdown>
            </HoverCard>
            <Link
              href="/post/new"
              className="auth-btn bg-gray-9 hide-on-small-screens"
            >
              {t("G_logIn")}
            </Link>
            <Link
              href="/post/new"
              className="auth-btn hide-on-small-screens"
            >
              {t("G_signUp")}
            </Link>
          </Group>
        </Group>
      </nav>
    </div >
  );
}
