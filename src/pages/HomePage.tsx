import HomePageHero from "../components/HomePageHero";
import { Flex, Button, ScaleFade } from "@chakra-ui/react";

// import LoadingSkeleton from "../components/Posts/LoadingSkeleton";
import PostForm from "../components/Posts/PostForm";
import { useLoaderData } from "react-router-dom";
import PostList from "../components/Posts/PostList";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";

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

interface ISocketData {
  action: string;
  newPost: IPost;
  deletedId: string;
  editedPost: IPost;
}

const HomePage = () => {
  const [addPostMode, setAddPostMode] = useState(false);
  const postData = useLoaderData() as ILoaderData;
  const [postDataState, setPostDataState] = useState([...postData.posts]);
  const socket = io("http://localhost:8080");

  socket.on("posts", (data: ISocketData) => {
    if (data.action === "new") {
      // add post to state
      const updatedState = [...postDataState];
      updatedState.unshift(data.newPost);
      setPostDataState([...updatedState]);
      setAddPostMode(false);
      return;
    }

    if (data.action === "delete") {
      // post deleted remove from state
      const updatedState = [...postDataState];
      const itemToDeleteIndex = updatedState.findIndex(
        (e) => e._id === data.deletedId
      );

      if (itemToDeleteIndex === -1) {
        throw new Error(
          "No such item found,server and client out of sync,please reload!"
        );
      }
      updatedState.splice(itemToDeleteIndex, 1);
      setPostDataState([...updatedState]);
      return;
    }

    if (data.action === "edit") {
      // if post edited update state
      const updatedState = [...postDataState];
      const itemToDeleteIndex = updatedState.findIndex(
        (e) => e._id === data.editedPost._id
      );

      if (itemToDeleteIndex === -1) {
        throw new Error(
          "No such item found,server and client out of sync,please reload!"
        );
      }

      updatedState[itemToDeleteIndex] = data.editedPost;

      setPostDataState([...updatedState]);
      return;
    }

    // if post disliked update state
  });

  function toggleAddPostMode() {
    setAddPostMode((prevState) => !prevState);
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

      {/* <LoadingSkeleton /> */}
      <PostList posts={postDataState} />
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
