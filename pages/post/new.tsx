import { useState } from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { AppLayout } from "../../components/AppLayout";
import { useRouter } from "next/router";
import { getAppProps } from "../../utils/getAppProps";
import { NumberInput, Textarea, Tabs, Text, Title } from "@mantine/core";
import Loading from "../../components/shared/loading";
import useTranslation from "next-translate/useTranslation";

export default function NewPost() {
  const [topic, setTopic] = useState("");
  const [keywords, setKeywords] = useState("");
  const [generating, setGenerating] = useState(false);
  const [length, setLength] = useState<number | "">(500);
  const [activeTab, setActiveTab] = useState<string | null>('first');
  const { t, lang } = useTranslation("common");
  const router = useRouter();

  const handleLongFormSubmit = async (e) => {
    e.preventDefault();
    // validate length here and in backend
    setGenerating(true);

    try {
      const response = await fetch("/api/generatePost", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ topic, keywords, wordsNumber: length }),
      });
      const json = await response.json();

      if (json?.postId) {
        router.push(`/post/${json.postId}`);
      }
    } catch (e) {
      setGenerating(false);
    }
  };

  const handleShortFormSubmit = async (e) => {
    e.preventDefault();
    setGenerating(true);

    try {
      const response = await fetch("/api/generateNewsletter", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ topic, keywords, charsNumber: length, locale: lang }),
      });
      const json = await response.json();

      if (json?.postId) {
        router.push(`/post/${json.postId}`);
      }
    } catch (e) {
      setGenerating(false);
    }
  };


  const textareaStyles = {
    input: {
      borderColor: 'gray.4',
      '&:focus': {
        borderColor: '#0B7285', //cyan.9
      },
    },
  };


  return (
    <div className="h-full overflow-hidden bg-[#F8F9FA]">
      {generating && <Loading />}
      {!generating && (
        <div className="w-full mt-3 md:mt-60 flex flex-col items-center overflow-auto">
          <Title size="1.75rem" color="gray.9" weight={700} className="mx-auto w-full max-w-screen-sm py-4">{t("createToday")}</Title>
          <Tabs defaultValue="first" value={activeTab} onTabChange={setActiveTab} className=" mx-auto w-full max-w-screen-sm py-4">
            <Tabs.List grow >
              <Tabs.Tab value="first" color="cyan.9" className="text-xl font-semibold border-b border-b-4" ><Text color={activeTab === 'first' ? "gray.9" : "gray.6"}>{t("longContent")}</Text></Tabs.Tab>
              <Tabs.Tab value="second" color="cyan.9" className="text-xl font-semibold border-b border-b-4"><Text color={activeTab !== 'first' ? "gray.9" : "gray.6"}>{t("shortContent")}</Text></Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="first">
              <Text color="gray.6" className="py-2 leading-6">
                {t("topicLabel")}
              </Text>
              <form
                onSubmit={handleLongFormSubmit}
                className="mx-auto w-full max-w-screen-sm pb-4 rounded-md shadow-xlborder border-slate-200 shadow-slate-200"
              >
                <Textarea
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder={t("topicPlaceholder")}
                  label={t("G_Topic")}
                  labelProps={{ size: 'md' }}
                  styles={textareaStyles}
                  maxLength={150}
                  minRows={3}
                  maxRows={5}
                  autosize
                  className="mt-8"
                />

                <Textarea
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  label={t("keywordsLabel")}
                  labelProps={{ size: 'md' }}
                  styles={textareaStyles}
                  placeholder={t("keywordsPlaceholder")}
                  maxLength={80}
                  minRows={2}
                  maxRows={2}
                  className="mt-8"
                />

                <NumberInput
                  defaultValue={500}
                  label={t("wordsNumberLabel")}
                  labelProps={{ size: 'md' }}
                  styles={textareaStyles}
                  withAsterisk
                  hideControls
                  max={2000}
                  min={200}
                  value={length}
                  onChange={setLength}
                  className="my-8"
                />


                <button
                  type="submit"
                  className="generate-btn"
                  disabled={!topic.trim() || !keywords.trim()}
                >
                  {t("G_write")}
                </button>
              </form>
            </Tabs.Panel>
            <Tabs.Panel value="second">
              <Text color="gray.6" className="py-2 leading-6">
                {t("shortContentLabel")}
              </Text>
              <form
                onSubmit={handleShortFormSubmit}
                className="mx-auto w-full max-w-screen-sm pb-4 rounded-md shadow-xlborder border-slate-200 shadow-slate-200"
              >
                <Textarea
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder={t("shortContentTopicPlaceholder")}
                  label={t("G_Topic")}
                  labelProps={{ size: 'md' }}
                  styles={textareaStyles}
                  maxLength={150}
                  minRows={3}
                  maxRows={5}
                  autosize
                  className="mt-8"
                />

                <Textarea
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  label={t("keywordsLabel")}
                  labelProps={{ size: 'md' }}
                  styles={textareaStyles}
                  placeholder={t("shortContentKWPlaceholder")}
                  maxLength={80}
                  minRows={2}
                  maxRows={2}
                  className="mt-8"
                />


                <NumberInput
                  defaultValue={500}
                  label={t("wordsCharsLabel")}
                  labelProps={{ size: 'md' }}
                  styles={textareaStyles}
                  withAsterisk
                  hideControls
                  max={2000}
                  value={length}
                  onChange={setLength}
                  className="my-8"
                />


                <button
                  type="submit"
                  className="btn"
                  disabled={!topic.trim() || !keywords.trim()}
                >
                  {t("G_write")}
                </button>
              </form>
            </Tabs.Panel>
          </Tabs>


        </div>
      )}
    </div>
  );
}

NewPost.getLayout = function getLayout(page, pageProps) {
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
