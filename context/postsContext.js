import React, { useCallback, useState } from "react";

const PostsContext = React.createContext({});

export default PostsContext;

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [noMorePosts, setNoMorePosts] = useState(false);

  // useCallback to memoize the function so it doesn't reload
  const setPostsFromSSR = useCallback((postsFromSSR = []) => {
    console.log("Posts from SSR:", postsFromSSR);
    // setPosts(postsFromSSR);
    setPosts((value) => {
      const newPosts = [...value];
      postsFromSSR.forEach((post) => {
        const exists = newPosts.find((p) => p._id === post._id);
        if (!exists) {
          newPosts.push(post);
        }
      });
      return newPosts;
    });
  }, []);

  const getPosts = useCallback(
    async ({ lastPostDate, getNewerPosts = false }) => {
      const result = await fetch("/api/getPosts", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ lastPostDate, getNewerPosts }),
      });
      const json = await result.json();
      const postsResult = json.posts || [];
      if (postsResult.length < 5) {
        setNoMorePosts(true);
      }

      console.log(" post results", postsResult);
      setPosts((value) => {
        const newPosts = [...value];
        postsResult.forEach((post) => {
          const exists = newPosts.find((p) => p._id === post._id);
          if (!exists) {
            newPosts.push(post);
          }
        });
        return newPosts;
      });
    },
    []
  );

  return (
    <PostsContext.Provider
      value={{ posts, setPostsFromSSR, getPosts, noMorePosts }}
    >
      {children}
    </PostsContext.Provider>
  );
};
