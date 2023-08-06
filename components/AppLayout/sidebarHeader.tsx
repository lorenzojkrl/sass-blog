import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import useTranslation from "next-translate/useTranslation";

const SidebarHeader = ({
  availableTokens,
  closeDrawer,
}: {
  availableTokens: number;
  closeDrawer: () => void;
}): JSX.Element => {
  const { t } = useTranslation("common");

  return (
    <>
      <Link
        href="/post/new"
        className="btn w-[80%] mx-auto"
        onClick={closeDrawer}
      >
        {t("newCopy")}
      </Link>
      <Link
        href="/token-topup"
        className="block mt-2 text-center"
        onClick={closeDrawer}
      >
        <FontAwesomeIcon
          icon={faCoins}
          className="text-yellow-500"
        ></FontAwesomeIcon>
        <span className="pl-1">{t("newCopy", { availableTokens })}</span>
      </Link>
    </>
  );
};

export default SidebarHeader;
