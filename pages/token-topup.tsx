import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { AppLayout } from "../components/AppLayout";
import { getAppProps } from "../utils/getAppProps";
import useTranslation from "next-translate/useTranslation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { Text } from "@mantine/core";
import { Tier } from "../misc/types";

export default function TokenTopup() {
  const { t } = useTranslation("common");

  const tiers: Tier[] = [
    {
      id: 0,
      name: t("G_Personal"),
      desc: t("forBloggers"),
      benefits: [
        { name: t("seoOptimization") },
        { name: t("customStyles") },
        { name: t("upToNPosts", { posts: 100 }) },
      ],
      price: 10,
      quantity: 100,
    },
    {
      id: 1,
      name: t("G_Professional"),
      desc: t("forCopywriters"),
      benefits: [
        { name: t("seoOptimization") },
        { name: t("customStyles") },
        { name: t("upToNPosts", { posts: 2000 }) },
      ],
      price: 100,
      quantity: 2000,
      recommended: true,
    },
    {
      id: 2,
      name: t("G_Enterprise"),
      desc: t("forBusiness"),
      benefits: [
        { name: t("seoOptimization") },
        { name: t("customStyles") },
        { name: t("accessNewFeatures") },
      ],
      price: 0,
      quantity: 0,
    },
  ];

  const handleClick = async (tier: Tier) => {
    const result = await fetch(`/api/addTokens`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ tier }),
    });

    const json = await result.json();
    window.location.href = json.session.url;
  };

  return (
    <div className="flex justify-center bg-gray-0">
      <div className="flex flex-col justify-center items-center p-4">
        <h1>{t("purchaseCopies")}</h1>
        <div className="flex flex-col lg:flex-row lg:justify-between">
          {tiers.map((tier) => {
            return (
              <div
                key={tier.id}
                className="border rounded-lg border-gray-4 hover:border-gray-5 border-[2px] w-[300px] bg-white hover:bg-gray-0 m-4"
              >
                <div className="flex flex-col items-center bg-gray-8 p-4">
                  <div className="text-white toggle-header-font-size font-bold">
                    {tier.name}
                  </div>
                  <div className="text-gray-4 toggle-p-font-size font-bold">
                    {tier.desc}
                  </div>
                </div>
                {tier.recommended && (
                  <div className="bg-cyan-0 text-cyan-7 text-center toggle-p-font-size leading-6 py-2">
                    {t("G_recommended")}
                  </div>
                )}
                <div className="px-4 py-8">
                  {tier.benefits.map((benefit, i) => {
                    return (
                      <div key={i} className="pb-2 toggle-p-font-size ">
                        <FontAwesomeIcon
                          icon={faCircleCheck}
                          size="lg"
                          className="w-[32px] pr-2"
                        />{" "}
                        <span className="toggle-p-font-size text-gray-6 ">
                          {benefit.name}
                        </span>
                      </div>
                    );
                  })}

                  <div
                    className={`text-center leading-6 h-[19px] h-[100%] py-2 toggle-header-font-size font-bold
                      ${tier.recommended ? "text-gray-9" : "text-gray-5"}
                    `}
                  >
                    {tier.id === 2 ? (
                      <>{t("onDemand")}</>
                    ) : (
                      <>
                        {t("pricingPerPost", {
                          price: tier.price,
                          currency: "USD",
                          quantity: tier.quantity,
                        })}
                      </>
                    )}
                  </div>
                  {tier.id === 2 ? (
                    <>
                      <Text
                        color="gray.6"
                        className="text-[14px] rounded-sm leading-6 btn bg-gray-3 text-gray-9 hover:bg-gray-8 hover:text-white"
                      >
                        <a href="mailto:contact@aiseowriter.co">
                          contact@aiseowriter.co
                        </a>
                      </Text>
                    </>
                  ) : (
                    <button
                      className={`rounded-sm leading-6  hover:text-white ${
                        tier.recommended
                          ? "generate-btn text-white"
                          : "btn bg-gray-3 text-gray-9 hover:bg-gray-8"
                      }`}
                      onClick={() => handleClick(tier)}
                    >
                      {t("G_purchase")}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
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
