import Link from "next/link";
import useTranslation from "next-translate/useTranslation";
import { faFeather } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Title } from "@mantine/core";
import { useRouter } from "next/router";

const SidebarHeader = ({
  availableTokens,
  drawerOpened,
  toggleDrawer,
}: {
  availableTokens: number;
  drawerOpened: boolean;
  toggleDrawer: () => void;
}): JSX.Element => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const isNewPost = router.pathname.includes("new");

  return (
    <>
      <div className="hide-on-small-screens">
        <div className="flex justify-center items-center mt-8 mb-4 min-w-full">
          <FontAwesomeIcon
            icon={faFeather}
            className="text-2xl px-2"
          ></FontAwesomeIcon>
          <Title order={3}>{t("aiseowriter")}</Title>
        </div>
      </div>
      <div className="mt-8">
        {drawerOpened ? (
          ""
        ) : (
          <Link
            href="/post/new"
            className={`${
              isNewPost ? "generate-btn-disabled" : "generate-btn"
            } mx-auto w-[240px]`}
          >
            {t("newCopy")}
          </Link>
        )}
        <Link
          href="/token-topup"
          className="block my-4 text-center"
          onClick={toggleDrawer}
        >
          <span className="pl-1">{t("postsLeft", { availableTokens })}</span>
        </Link>
      </div>
    </>
  );
};

export default SidebarHeader;
