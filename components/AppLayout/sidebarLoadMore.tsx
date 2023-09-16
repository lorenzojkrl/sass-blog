import Link from "next/link";
import { Post } from "../../misc/types";
import useTranslation from "next-translate/useTranslation";

const SidebarLoadMore = ({
  noMorePosts,
  getPosts,
  posts,
  postId,
  toggleDrawer,
}: {
  noMorePosts: boolean;
  getPosts: (arg: { lastPostDate: string }) => void;
  posts: Post[];
  postId: any;
  toggleDrawer: () => void;
}): JSX.Element => {
  const { t } = useTranslation("common");

  return (
    <div className="w-[100%] max-w-[300px] mx-auto flex-1">
      {posts.map((post) => (
        <Link
          onClick={toggleDrawer}
          key={post._id}
          href={`/post/${post._id}`}
          className={`py-1 border border-transparent block text-ellipsis overflow-hidden whitespace-nowrap my-1 px-2 bg-white/10 cursor-pointer rounded-sm ${
            postId === post._id ? "bg-white/20 border-white" : ""
          }`}
        >
          {post.topic}
        </Link>
      ))}
      {!noMorePosts && (
        <div
          onClick={() => {
            getPosts({
              lastPostDate: posts[posts.length - 1].created,
            });
          }}
          className={
            "hover:underline text-sm text-slate-400 text-center cursor-pointer mt-4 "
          }
        >
          {t("loadMore")}
        </div>
      )}
    </div>
  );
};

export default SidebarLoadMore;
