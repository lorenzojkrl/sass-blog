import { useState } from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { AppLayout } from "../../components/AppLayout";
import { useRouter } from "next/router";
import { getAppProps } from "../../utils/getAppProps";
import { NumberInput, Textarea } from "@mantine/core";
import Loading from "../../components/shared/loading";
import useTranslation from "next-translate/useTranslation";

export default function NewPost() {
  const [topic, setTopic] = useState("");
  const [keywords, setKeywords] = useState("");
  const [generating, setGenerating] = useState(false);
  const [wordsNumber, setWordsNumber] = useState<number | "">(500);
  const { t } = useTranslation("common");

  const router = useRouter();

  const handleSubmit = async (e) => {
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

  // generating &&
  return (
    <div className="h-full overflow-hidden">
      {<Loading />}
      {!generating && (
        <div className="w-full h-[50%] flex flex-col overflow-auto">
          <form
            onSubmit={handleSubmit}
            className="m-auto w-full max-w-screen-sm bg-slate-100 p-4 rounded-md shadow-xlborder border-slate-200 shadow-slate-200"
          >
            <Textarea
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              label={t("topicLabel")}
              placeholder={t("topicPlaceholder")}
              maxLength={150}
              minRows={3}
              maxRows={5}
              autosize
            />

            <Textarea
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              label={t("keywordsLabel")}
              placeholder={t("keywordsPlaceholder")}
              maxLength={80}
              minRows={2}
              maxRows={2}
              className="mt-5"
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
                className="mt-5"
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
