import apiRequest from "./apiRequest";
import { defer } from "react-router-dom";

export const singlePageLoader = async ({ request, params }) => {
  const res = await apiRequest("/posts/" + params.id);
  return res.data;
};

export const listPageLoader = async ({ request, params }) => {
  const query = request.url.split("?")[1];

  const postPromise = apiRequest("/posts?" + query);
  return defer({
    postResponse: postPromise,
  });
};


export const updatePostLoader = async ({ params }) => {
  try {
    const res = await apiRequest.get(`/posts/${params.id}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching post data:", error);
    throw new Response("Post not found", { status: 404 });
  }
};

export const profilePageLoader = async () => {
  const postPromise = apiRequest("/users/profilePosts");
  const chatPromise = apiRequest("/chats");
  return defer({
    postResponse: postPromise,
    chatResponse: chatPromise,
  });
};


