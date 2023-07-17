import { List, ListItem, Center, Text, Flex } from "@chakra-ui/react";
import { useState } from "react";
import { io } from "socket.io-client";
import Post from "./Post";
interface IProps {
  posts: IPost[];
  hidePostForm: () => void;
}

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
interface ISocketData {
  action: string;
  newPost: IPost;
  deletedId: string;
  editedPost: IPost;
}

const PostList = (props: IProps | any) => {
  const [postDataState, setPostDataState] = useState([...props.posts]);

  const socket = io(
    import.meta.env.VITE_BACKEND_URL || "http://localhost:8080"
  );

  socket.on("posts", (data: ISocketData) => {
    if (data.action === "new") {
      // add post to state
      const updatedState = [...postDataState];
      updatedState.unshift(data.newPost);
      setPostDataState([...updatedState]);
      props.hidePostForm();
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
  return (
    <Flex
      direction={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      w={"100%"}
    >
      {postDataState.length === 0 && (
        <Text fontSize={"lg"} color={"#fff"}>
          No posts found.
        </Text>
      )}
      <List
        spacing={"4"}
        w={"100%"}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        {postDataState.map((post: IPost) => {
          return (
            <ListItem
              key={post._id}
              w={"100%"}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Post
                authorEmail={post.authorEmail}
                _id={post._id}
                comments={post.comments}
                title={post.title}
                content={post.content}
                likes={post.likes}
                dislikes={post.dislikes}
                favourites={post.favourites}
                author={post.author}
                images={post.images}
                likedBy={post.likedBy}
                dislikedBy={post.dislikedBy}
              />
            </ListItem>
          );
        })}
      </List>
    </Flex>
  );
};

export default PostList;
