import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { AppLayout } from "../../components/AppLayout";
import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";
import { getAppProps } from "../../utils/getAppProps";
import { useContext, useState } from "react";
import { useRouter } from "next/router";
import PostsContext from "../../context/postsContext";
import useTranslation from "next-translate/useTranslation";

function removeHTMLHead(text) {
  const regex = /<head\b[^>]*>[\s\S]*?<\/head>/gi;
  return text.replace(regex, "");
}

function removeHTMLTags(text) {
  // Regular expression to match HTML tags
  const htmlTagRegex = /<[^>]+>/g;

  // Replace HTML tags with an empty string
  return text.replace(htmlTagRegex, "");
}

function removePunctuation(text) {
  // Regular expression to match punctuation characters
  const punctuationRegex = /[!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]/g;

  // Replace punctuation with an empty string
  return text.replace(punctuationRegex, "");
}

function stringToKeywordsArray(keywordsString) {
  // Split the string into an array using comma as the separator
  const keywordsArray = keywordsString.split(",");

  // Trim whitespace from each keyword (optional)
  return keywordsArray.map((keyword) => keyword.trim());
}

function countMultipleWords(text, keywords) {
  const wordsArray = text.toLowerCase().split(/\s+/);
  const keywordCounts = {};

  for (const keyword of keywords) {
    const keywordWords = keyword.toLowerCase().split(/\s+/);
    keywordCounts[keyword] = 0;

    for (let i = 0; i <= wordsArray.length - keywordWords.length; i++) {
      const currentWords = wordsArray
        .slice(i, i + keywordWords.length)
        .join(" ");

      if (currentWords === keyword.toLowerCase()) {
        keywordCounts[keyword]++;
      }
    }
  }

  return keywordCounts;
}

function calculateKeywordDensity(text, keywords) {
  if (!text || !keywords || !Array.isArray(keywords)) {
    throw new Error("Text and an array of keywords are required.");
  }

  const wordsArray = text.toLowerCase().split(/\s+/);
  const keywordCounts = {};

  for (const keyword of keywords) {
    const keywordWords = keyword.toLowerCase().split(/\s+/);

    // Create a regular expression to match the complete keyword phrase
    const regexString = keywordWords
      .map((word) => `\\b${word}\\b`)
      .join("\\s+");
    const regex = new RegExp(regexString, "g");

    // Find all occurrences of the keyword in the text
    const keywordOccurrences = text.toLowerCase().match(regex) || [];

    // Calculate the keyword density as a percentage
    const totalWords = wordsArray.length;
    const keywordDensity = (keywordOccurrences.length / totalWords) * 100;

    keywordCounts[keyword] = keywordDensity.toFixed(2); // Store density rounded to 2 decimal places
  }

  return keywordCounts;
}

export default function Post(props) {
  const router = useRouter();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const { deletePost } = useContext(PostsContext);
  const textWithoutHead = removeHTMLHead(props.postContent);
  const textWithoutTags = removeHTMLTags(textWithoutHead);
  const cleanText = removePunctuation(textWithoutTags);
  const keywordsArray = stringToKeywordsArray(props.keywords);
  const keywordCounts = countMultipleWords(cleanText, keywordsArray);
  const keywordsDensity = calculateKeywordDensity(cleanText, keywordsArray);
  const { t } = useTranslation("common");

  const handleDeleteConfirm = async () => {
    try {
      const response = await fetch("/api/deletePost", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ postId: props.id }),
      });
      const json = await response.json();
      if (json.success) {
        deletePost(props.id);
        router.replace("/post/new");
      }
    } catch (error) {}
  };
  return (
    <div className="overflow-auto h-full">
      <div className="max-w-screen-sm mx-auto">
        <div className="text-sm font-bold mt-6 p-2 bg-stone-200 rounded-sm">
          {t("seoMeta")}
        </div>
        <div className="p-4 my-2 border border-stone-200 rounded-md">
          <div className="text-blue-600 text-2xl font-bold">{props.title}</div>
          <div className="mt-2 ">{props.metaDescription}</div>
        </div>
        {/* Fix for no keywords */}
        <div className="text-sm font-bold mt-6 p-2 bg-stone-200 rounded-sm">
          {t("seoData")}
        </div>
        <div className="p-4 my-2 border border-stone-200 rounded-md">
          {!!props?.slug && (
            <div className="font-bold">
              {t("recommendedSlug")}: &nbsp;
              <span className="font-normal">{props.slug}</span>
            </div>
          )}
          <div className="font-bold">{t("keywordsOccurence")}</div>
          <ul>
            {Object.keys(keywordCounts).map((key) => (
              <li key={key}>
                {key}: {keywordCounts[key]} - {keywordsDensity[key]}%
              </li>
            ))}
          </ul>

          <div></div>
        </div>

        <div className="text-right text-sm font-bold mt-6 p-2 bg-stone-200 rounded-sm">
          <div>
            {props.postContent.split(" ").length} {t("G_words")}
          </div>
        </div>

        <div
          dangerouslySetInnerHTML={{ __html: props.postContent || "" }}
        ></div>
        <div className="my-4">
          {!showDeleteConfirm && (
            <button
              className="btn bg-red-600 hover:bg-red-700"
              onClick={() => setShowDeleteConfirm(true)}
            >
              {t("G_delete")}
            </button>
          )}
          {!!showDeleteConfirm && (
            <div>
              <p className="p-2 bg-red-300 text-center">{t("confirmDelete")}</p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  className="btn bg-stone-600 hover:bg-stone-700"
                  onClick={() => setShowDeleteConfirm(false)}
                >
                  {t("G_cancel")}
                </button>
                <button
                  className="btn bg-red-600 hover:bg-red-700"
                  onClick={handleDeleteConfirm}
                >
                  {t("G_confirmDelete")}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

Post.getLayout = function getLayout(page, pageProps) {
  return <AppLayout {...pageProps}>{page}</AppLayout>;
};

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    const props = await getAppProps(ctx);
    const userSession = await getSession(ctx.req, ctx.res);
    const client = await clientPromise;
    const db = client.db("SassBlog");
    const user = await db.collection("users").findOne({
      auth0Id: userSession.user.sub,
    });
    const post = await db.collection("posts").findOne({
      _id: new ObjectId(ctx.params.postId),
      userId: user._id,
    });

    if (!post) {
      // Next.js object structure
      return {
        redirect: {
          destination: "/post/new",
          permanent: false,
        },
      };
    }

    return {
      props: {
        id: ctx.params.postId,
        postContent: post.postContent,
        title: post.title,
        slug: post.slug || "",
        metaDescription: post.metaDescription,
        keywords: post.keywords,
        postCreated: post.created.toString(),
        ...props,
      },
    };
  },
});
