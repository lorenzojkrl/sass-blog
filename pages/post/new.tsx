import { useState } from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { AppLayout } from "../../components/AppLayout";
import { useRouter } from "next/router";
import { getAppProps } from "../../utils/getAppProps";
import { NumberInput, Textarea, Tabs } from "@mantine/core";
import Loading from "../../components/shared/loading";
import useTranslation from "next-translate/useTranslation";

export default function NewPost() {
  const [topic, setTopic] = useState("");
  const [keywords, setKeywords] = useState("");
  const [generating, setGenerating] = useState(false);
  const [wordsNumber, setWordsNumber] = useState<number | "">(500);
  const [charsNumber, setCharsNumber] = useState<number | "">(500);
  const { t, lang } = useTranslation("common");
  const router = useRouter();

  const handleLongFormSubmit = async (e) => {
    e.preventDefault();
    setGenerating(true);

    try {
      const response = await fetch("/api/generatePost", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ topic, keywords, wordsNumber }),
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
        body: JSON.stringify({ topic, keywords, charsNumber, locale: lang }),
      });
      const json = await response.json();

      if (json?.postId) {
        router.push(`/post/${json.postId}`);
      }
    } catch (e) {
      setGenerating(false);
    }
  };

  return (
    <div className="h-full overflow-hidden bg-slate-100 ">
      {generating && <Loading />}
      {!generating && (
        <div className="w-full mt-3 md:mt-60 flex flex-col items-center overflow-auto">
          <div className="text-2xl mx-auto w-full max-w-screen-sm py-4 font-semibold">
            {t("createToday")}

          </div>
          <Tabs defaultValue="first" className=" mx-auto w-full max-w-screen-sm py-4">
            <Tabs.List grow >
              <Tabs.Tab value="first" className="text-xl">{t("longContent")}</Tabs.Tab>
              <Tabs.Tab value="second" className="text-xl">{t("shortContent")}</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="first">
              <div className="text-[#868E96] py-2">
                {t("topicLabel")}
              </div>
              <form
                onSubmit={handleLongFormSubmit}
                className="mx-auto w-full max-w-screen-sm pb-4 rounded-md shadow-xlborder border-slate-200 shadow-slate-200"
              >
                <Textarea
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder={t("topicPlaceholder")}
                  label={t("G_Topic")}
                  maxLength={150}
                  minRows={3}
                  maxRows={5}
                  autosize
                  className="mt-4"
                />

                <Textarea
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  label={t("keywordsLabel")}
                  placeholder={t("keywordsPlaceholder")}
                  maxLength={80}
                  minRows={2}
                  maxRows={2}
                  className="mt-4"
                />

                <details className="my-4">
                  <summary className="hover:cursor-pointer">
                    {t("advancedOptions")}
                  </summary>
                  <NumberInput
                    defaultValue={500}
                    label={t("wordsNumberLabel")}
                    withAsterisk
                    hideControls
                    max={2000}
                    min={200}
                    value={wordsNumber}
                    onChange={setWordsNumber}
                    className="mt-4"
                  />
                </details>

                <button
                  type="submit"
                  className="btn"
                  disabled={!topic.trim() || !keywords.trim()}
                >
                  {t("G_write")}
                </button>
              </form>
            </Tabs.Panel>
            <Tabs.Panel value="second">
              <div className="text-[#868E96] py-2">
                {t("shortContentLabel")}
              </div>
              <form
                onSubmit={handleShortFormSubmit}
                className="mx-auto w-full max-w-screen-sm pb-4 rounded-md shadow-xlborder border-slate-200 shadow-slate-200"
              >
                <Textarea
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder={t("shortContentTopicPlaceholder")}
                  label={t("G_Topic")}
                  maxLength={150}
                  minRows={3}
                  maxRows={5}
                  autosize
                  className="mt-4"
                />

                <Textarea
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  label={t("keywordsLabel")}
                  placeholder={t("shortContentKWPlaceholder")}
                  maxLength={80}
                  minRows={2}
                  maxRows={2}
                  className="mt-4"
                />

                <details className="my-4">
                  <summary className="hover:cursor-pointer">
                    {t("advancedOptions")}
                  </summary>
                  <NumberInput
                    defaultValue={500}
                    label={t("wordsCharsLabel")}
                    withAsterisk
                    hideControls
                    max={2000}
                    value={charsNumber}
                    onChange={setCharsNumber}
                    className="mt-4"
                  />
                </details>

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
