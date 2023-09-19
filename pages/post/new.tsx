import { useState, ReactNode, FC } from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { AppLayout } from "../../components/AppLayout";
import { getAppProps } from "../../utils/getAppProps";
import { Tabs, Text, Title } from "@mantine/core";
import Loading from "../../components/shared/loading";
import useTranslation from "next-translate/useTranslation";
import Form from "../../components/form";

// function component type that matches the signature of NewPost
type GetLayoutFunction = (page: FC, pageProps: any) => ReactNode;

export default function NewPost<FC>() {
  const [generating, setGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState<string | null>("first");
  const [longFormat, setLongFormat] = useState(true);
  const { t } = useTranslation("common");

  return (
    <div className="h-full overflow-hidden bg-gray-0 px-4">
      {generating && <Loading />}
      {!generating && (
        <div className="w-full  md:mt-40 flex flex-col items-center overflow-auto">
          <Title
            size="1.75rem"
            color="gray.9"
            weight={700}
            className="mx-auto w-full max-w-screen-sm py-4"
          >
            {t("createToday")}
          </Title>
          <Tabs
            defaultValue="first"
            value={activeTab}
            onTabChange={setActiveTab}
            className=" mx-auto w-full max-w-screen-sm py-4"
          >
            <Tabs.List grow>
              <Tabs.Tab
                value="first"
                color="cyan.9"
                className="text-xl font-semibold border-b border-b-4"
              >
                <Text color={activeTab === "first" ? "gray.9" : "gray.6"}>
                  {t("longContent")}
                </Text>
              </Tabs.Tab>
              <Tabs.Tab
                value="second"
                color="cyan.9"
                className="text-xl font-semibold border-b border-b-4"
              >
                <Text color={activeTab !== "first" ? "gray.9" : "gray.6"}>
                  {t("shortContent")}
                </Text>
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="first">
              <Text color="gray.6" className="py-2 leading-6">
                {t("topicLabel")}
              </Text>
              <Form format={longFormat} setGenerating={setGenerating}></Form>
            </Tabs.Panel>
            <Tabs.Panel value="second">
              <Text color="gray.6" className="py-2 leading-6">
                {t("shortContentLabel")}
              </Text>
              <Form format={!longFormat} setGenerating={setGenerating}></Form>
            </Tabs.Panel>
          </Tabs>
        </div>
      )}
    </div>
  );
}

NewPost.getLayout = function getLayout(
  page: GetLayoutFunction,
  pageProps: any
) {
  return <AppLayout {...pageProps}>{page}</AppLayout>;
};

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    const props = await getAppProps(ctx);

    if (!props.availableTokens) {
      return {
        redirect: {
          destination: "/token-topup",
          permanent: false,
        },
      };
    }

    return {
      props,
    };
  },
});
