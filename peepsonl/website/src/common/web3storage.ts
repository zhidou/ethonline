import React from "react";
import { Web3Storage } from "web3.storage";

// Construct with token and endpoint
export const client = new Web3Storage({
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGMzYkFlY2RkNzYzYUVCRTdiMzBBQjk0Qzc0RDNkZDQwNTE2MDRDNTkiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjQwOTAwMzYxOTIsIm5hbWUiOiJwZWVwc29ubCJ9.hJiSD68q1P8ZWRJuhVV1XlHi06zxSm7UFBs289omZSc",
});

interface Post {
  // cid: string;
  // authorAddress: string;
  createdAt: Date;
  content: string;
  like: Record<string, Date>;
}

const SERVER_ENDPOINT = "http://localhost:3000";

export function usePosts(authorAddress: string | null) {
  const [posts, setPosts] = React.useState<Post[] | undefined>();
  const dataRef = React.useRef();

  const refetch = React.useCallback(() => {
    fetch(`${SERVER_ENDPOINT}/user/${authorAddress}`, { method: "GET" })
      .then((res) => res.json())
      .then((result: any) => {
        if (!result || !result.posts) {
          setPosts([]);
          return;
        }
        dataRef.current = result;
        setPosts(
          result.posts.map((post: any) => {
            post.createdAt = new Date(post.createdAt);
            Object.keys(post.like).forEach((k) => {
              post.like[k] = new Date(post.like[k]);
            });
            return post;
          })
        );
      });
  }, [authorAddress]);

  const like = React.useCallback(
    (idx: number, walletAddress: string) => {
      if (!authorAddress) return;
      if ((dataRef.current as any).posts[idx].like[walletAddress]) {
        delete (dataRef.current as any).posts[idx].like[walletAddress];
      } else {
        (dataRef.current as any).posts[idx].like[walletAddress] = new Date();
        setTimeout(() => {
          fetch(`${SERVER_ENDPOINT}/notify/${authorAddress}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title: "GM!",
              body: "Someline liked your post",
            }),
          });
        }, 1000);
      }
      console.log(dataRef.current);
      return fetch(`${SERVER_ENDPOINT}/user/${authorAddress}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataRef.current),
      });
    },
    [authorAddress]
  );

  const send = React.useCallback(
    (content: string) => {
      if (!authorAddress) return;
      (dataRef.current as any).posts = [
        {
          content: content,
          createdAt: new Date(),
          like: {},
        },
        ...(dataRef.current as any).posts,
      ];
      console.log(dataRef.current);
      return fetch(`${SERVER_ENDPOINT}/user/${authorAddress}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataRef.current),
      });
    },
    [authorAddress]
  );

  React.useEffect(() => {
    if (!authorAddress) return;
    refetch();
  }, [refetch, authorAddress]);

  return { posts, refetch, like, send };
}
