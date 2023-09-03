import Link from "next/link";
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
    <div className="mt-8">
      <Link
        href="/post/new"
        className="generate-btn mx-auto w-[240px]"
        onClick={closeDrawer}
      >
        {t("newCopy")}
      </Link>
      <Link
        href="/token-topup"
        className="block my-4 text-center"
        onClick={closeDrawer}
      >

        <span className="pl-1">{t("postsLeft", { availableTokens })}</span>
      </Link>
    </div>
  );
};

export default SidebarHeader;
