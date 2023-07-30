import { useState } from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { AppLayout } from "../../components/AppLayout";
import { useRouter } from "next/router";
import { getAppProps } from "../../utils/getAppProps";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFeather } from "@fortawesome/free-solid-svg-icons";
import { NumberInput, Textarea } from "@mantine/core";

export default function NewPost(props) {
  const [topic, setTopic] = useState("");
  const [keywords, setKeywords] = useState("");
  const [generating, setGenerating] = useState(false);
  const [wordsNumber, setWordsNumber] = useState<number | "">(500);
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

  return (
    <div className="h-full overflow-hidden">
      {generating && (
        <div className="text-slate flex h-full animate-pulse w-full flex-col justify-center items-center">
          <FontAwesomeIcon
            icon={faFeather}
            size="4x"
            className="px-2 text-slate-900/60 h-5"
          ></FontAwesomeIcon>
          <h6>Generating...</h6>
        </div>
      )}
      {!generating && (
        <div className="w-full h-[50%] flex flex-col overflow-auto">
          <form
            onSubmit={handleSubmit}
            className="m-auto w-full max-w-screen-sm bg-slate-100 p-4 rounded-md shadow-xlborder border-slate-200 shadow-slate-200"
          >
            <Textarea
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="The benefits of pet therapy"
              label="Generate a new draft about:"
              maxLength={150}
              minRows={3}
              maxRows={5}
              autosize
            />

            <Textarea
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="Dogs, Pet therapy, Cats"
              label="Targeting the following comma-separated keywords:"
              maxLength={80}
              minRows={2}
              maxRows={2}
              className="mt-5"
            />

            <details className="my-4">
              <summary className="hover:cursor-pointer">
                Advanced options
              </summary>
              <NumberInput
                defaultValue={500}
                label="Approximate number of words (200 - 2000)"
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
              Draft
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
