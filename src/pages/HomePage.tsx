import HomePageHero from "../components/HomePageHero";
import { Flex, Button, ScaleFade } from "@chakra-ui/react";

import LoadingSkeleton from "../components/Posts/LoadingSkeleton";
import PostForm from "../components/Posts/PostForm";
import { useLoaderData, defer, Await } from "react-router-dom";
import PostList from "../components/Posts/PostList";
import { useState, Suspense } from "react";

interface IPost {
  title: string;
  content: string;
  likes: number;
  dislikes: number;
  favourites: number;
  author: string;
  images: string[];
  _id: string;
  comments: string[];
  authorEmail: string;
  likedBy: {
    [userId: string]: string;
  };
  dislikedBy: {
    [userId: string]: string;
  };
}

interface ILoaderData {
  message: string;
  posts: IPost[];
}

const HomePage = () => {
  const [addPostMode, setAddPostMode] = useState(false);
  const postData = useLoaderData() as ILoaderData;

  function toggleAddPostMode() {
    setAddPostMode((prevState) => !prevState);
  }

  function hidePostForm() {
    setAddPostMode(false);
  }

  return (
    <Flex
      alignItems={"center"}
      justifyContent={"flex-start"}
      w={"100%"}
      // h={"100vh"}
      direction={"column"}
      pr={2}
      pl={2}
      pb={"100rem"}
    >
      <HomePageHero />

      {!addPostMode && (
        <Button
          colorScheme="green"
          variant={"solid"}
          onClick={toggleAddPostMode}
          mb={5}
        >
          Add post
        </Button>
      )}

      <ScaleFade initialScale={0.9} in={addPostMode} unmountOnExit={true}>
        <PostForm />
      </ScaleFade>

      <Suspense fallback={<LoadingSkeleton />}>
        <Await resolve={postData.posts}>
          {(loadedPosts) => {
            return <PostList posts={loadedPosts} hidePostForm={hidePostForm} />;
          }}
        </Await>
      </Suspense>
    </Flex>
  );
};

export default HomePage;

async function loadPosts() {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL || "http://localhost:8080"}/post/all`
    );

    if (!response.ok) {
      throw new Error("Could not load posts ");
    }

    const responseData = await response.json();
    return responseData.posts;
  } catch (err) {
    throw err;
  }
}

export async function loader() {
  return defer({
    posts: loadPosts(),
  });
}
