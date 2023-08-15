import Link from "next/link";
import useTranslation from "next-translate/useTranslation";

const SidebarCTA = (): JSX.Element => {
    const { t } = useTranslation("common");

    return (
            <Link
                href="/token-topup"
                className="btn w-[80%] mx-auto "
            >
                <span className="pl-1">{t("unlockPosts")}</span>
            </Link>
    );
};

export default SidebarCTA;


