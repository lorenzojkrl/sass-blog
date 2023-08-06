import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { AppLayout } from "../components/AppLayout";
import { getAppProps } from "../utils/getAppProps";
import useTranslation from "next-translate/useTranslation";

export default function TokenTopup() {
  const { t } = useTranslation("common");

  const handleClick = async () => {
    const result = await fetch(`/api/addTokens`, {
      method: "POST",
    });

    const json = await result.json();
    window.location.href = json.session.url;
  };

  return (
    <div className="h-full overflow-hidden flex justify-center">
      <div className="flex h-full w-full max-w-sm flex-col justify-center items-center">
        <h1>{t("purchaseCopies")}</h1>
        <button className="btn" onClick={handleClick}>
          {t("G_purchase")}
        </button>
      </div>
    </div>
  );
}

TokenTopup.getLayout = function getLayout(page, pageProps) {
  return <AppLayout {...pageProps}>{page}</AppLayout>;
};

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    const props = await getAppProps(ctx);
    return {
      props,
    };
  },
});
