import HomePageHero from "../components/HomePageHero";
import { Flex } from "@chakra-ui/react";

import LoadingSkeleton from "../components/Posts/LoadingSkeleton";
import PostForm from "../components/Posts/PostForm";
import { useLoaderData } from "react-router-dom";
import PostList from "../components/Posts/PostList";

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
}

interface ILoaderData {
  message: string;
  posts: IPost[];
}

const HomePage = () => {
  const postData = useLoaderData() as ILoaderData;
  console.log(postData);

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
      {/* big add post form */}
      <PostForm />

      {/*other posts posts */}
      {/* <LoadingSkeleton /> */}
      <PostList posts={postData.posts} />
    </Flex>
  );
};

export default HomePage;

export async function loader() {
  try {
    const response = await fetch("http://localhost:8080/post/all");

    const posts = await response.json();

    return posts;
  } catch (err) {}
}
