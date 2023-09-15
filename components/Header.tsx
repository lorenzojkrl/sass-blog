import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faClose, faFeather } from "@fortawesome/free-solid-svg-icons";
import { Title } from "@mantine/core";
import Container from "./container";
import useTranslation from "next-translate/useTranslation";

// Logged in Header
export default function Header({
  drawerOpened,
  toggleDrawer,
  style,
}: {
  drawerOpened: boolean;
  toggleDrawer: () => void;
  style?: any;
}): JSX.Element {
  const { t } = useTranslation("common");

  return (
    <>
      <Container className="p-4 hide-on-large-screens">
        <nav className="text-white flex justify-between w-[100%] mx-auto ">
          <div className="flex items-center">
            <FontAwesomeIcon
              icon={drawerOpened ? faClose : faBars}
              size="lg"
              className="w-[32px] pr-2"
              onClick={toggleDrawer}
            />
            <Title order={4}>{t("aiseowriter")}</Title>
          </div>
          <button className="generate-btn w-[32px] h-[32px] text-3xl flex justify-center items-center">
            +
          </button>
        </nav>
      </Container>
      <div className="hide-on-small-screens">
        <div className="flex justify-center items-center mt-8 mb-4 min-w-full">
          <FontAwesomeIcon
            icon={faFeather}
            className="text-2xl px-2"
          ></FontAwesomeIcon>
          <Title order={3}>{t("aiseowriter")}</Title>
        </div>
      </div>
    </>
  );
}
