import { useEffect, useState } from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { AppLayout } from "../../components/AppLayout";
import { useRouter } from "next/router";
import { getAppProps } from "../../utils/getAppProps";
import { Box, Button, Flex, NumberInput, Textarea } from "@mantine/core";
import Loading from "../../components/shared/loading";
import useTranslation from "next-translate/useTranslation";

export default function NewPost() {
  const [topic, setTopic] = useState("");
  const [keywords, setKeywords] = useState("");
  const [generating, setGenerating] = useState(false);
  const [wordsNumber, setWordsNumber] = useState<number | "">(500);
  const [charsNumber, setCharsNumber] = useState<number | "">(500);
  const [longFormat, setLongFormat] = useState(true);
  const { t } = useTranslation("common");
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
        body: JSON.stringify({ topic, keywords, charsNumber }),
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
    <div className="h-full overflow-hidden">
      {generating && <Loading />}
      {!generating && (
        <div className="w-full mt-3 md:mt-60 flex flex-col overflow-auto">
          <Flex
            justify="center"
            align="center"
            wrap="nowrap"
            gap={10}
            className="mx-auto w-full max-w-screen-sm py-2"
          >
            <Box w={500}>
              <Button
                fullWidth
                onClick={() => setLongFormat(true)}
                color="gray"
                variant="outline"
                className={
                  longFormat &&
                  "btn bg-blue-500 uppercase hover:bg-blue-600 py-1"
                }
              >
                {t("longContent")}
              </Button>
            </Box>

            <Box w={500}>
              <Button
                fullWidth
                color="gray"
                variant="outline"
                onClick={() => setLongFormat(false)}
                className={
                  !longFormat &&
                  "btn bg-blue-500 uppercase hover:bg-blue-600 py-1"
                }
              >
                {t("shortContent")}
              </Button>
            </Box>
          </Flex>
          {longFormat && (
            <form
              onSubmit={handleLongFormSubmit}
              className="mx-auto w-full max-w-screen-sm bg-slate-100 px-4 pb-4 rounded-md shadow-xlborder border-slate-200 shadow-slate-200"
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
          )}
          {!longFormat && (
            <form
              onSubmit={handleShortFormSubmit}
              className="mx-auto w-full max-w-screen-sm bg-slate-100 px-4 pb-4 rounded-md shadow-xlborder border-slate-200 shadow-slate-200"
            >
              <Textarea
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                label={t("shortContentLabel")}
                placeholder={t("shortContentTopicPlaceholder")}
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
          )}
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
