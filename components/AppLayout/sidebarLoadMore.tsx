import { Post } from "../../misc/types";

const SidebarLoadMore = ({
  noMorePosts,
  getPosts,
  posts,
}: {
  noMorePosts: boolean;
  getPosts: (arg: { lastPostDate: string }) => void;
  posts: Post[];
}): JSX.Element => {
  return (
    <>
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
          Load more drafts
        </div>
      )}
    </>
  );
};

export default SidebarLoadMore;
