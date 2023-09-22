import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faClose } from "@fortawesome/free-solid-svg-icons";
import { Title } from "@mantine/core";
import Container from "./container";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";

export default function Header({
  drawerOpened,
  toggleDrawer,
}: {
  drawerOpened: boolean;
  toggleDrawer: () => void;
}): JSX.Element {
  const { t } = useTranslation("common");
  const router = useRouter();
  const isNewPost = router.pathname.includes("new");

  return (
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
        <Link
          href="/post/new"
          onClick={drawerOpened && toggleDrawer}
          className={`${
            isNewPost ? "generate-btn-disabled" : "generate-btn"
          }  w-[32px] h-[32px] text-3xl flex justify-center items-center`}
        >
          +
        </Link>
      </nav>
    </Container>
  );
}
