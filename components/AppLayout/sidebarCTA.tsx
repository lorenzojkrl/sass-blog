import Link from "next/link";
import useTranslation from "next-translate/useTranslation";

const SidebarCTA = ({
  toggleDrawer,
}: {
  toggleDrawer: () => void;
}): JSX.Element => {
  const { t } = useTranslation("common");

  return (
    <div className="pt-2 h-20">
      <Link
        href="/token-topup"
        className="generate-btn w-[280px] lg:w-[240px] mx-auto"
        onClick={toggleDrawer}
      >
        <span className="pl-1">{t("unlockPosts")}</span>
      </Link>
    </div>
  );
};

export default SidebarCTA;
