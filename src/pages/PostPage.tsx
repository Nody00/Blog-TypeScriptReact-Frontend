import { useLoaderData } from "react-router-dom";
import Post from "../components/Posts/Post";
import CommentList from "../components/Posts/CommentList";
import { Flex } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import * as lodash from "lodash";

interface IComment {
  author: string;
  post: string;
  content: string;
  likes: number;
  dislikes: number;
  _id: string;
}

interface responseData {
  result: object;
  error: boolean;
  errorObject: {
    message: string;
    statusCode: number;
  };
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
  postWithNewComment: IPost;
  commentIdDelete: string;
  commentLiked: IComment;
}

const PostPage = () => {
  const data: any = useLoaderData();

  useEffect(() => {
    const newData = lodash.cloneDeep(data.post);
    setPostData(newData);
  }, [data]);

  const [postData, setPostData] = useState(data.post);

  const socket = io("http://localhost:8080");

  socket.on("posts", (data: ISocketData) => {
    if (data.action === "edit") {
      const newPost = data.editedPost;
      setPostData(newPost);
      return;
    }

    if (data.action === "newComment") {
      const newPost = data.postWithNewComment;
      setPostData(newPost);
      return;
    }

    if (data.action === "deleteComment") {
      const commentId = data.commentIdDelete;

      const existingCommentIndex = postData.comments.findIndex(
        (e: any) => e._id === commentId
      );

      if (existingCommentIndex === -1) {
        throw new Error(
          "No such comment exists,server and client out of sync please reload!"
        );
      }

      const newPost = lodash.cloneDeep(postData);

      newPost.comments.splice(existingCommentIndex, 1);
      setPostData(newPost);
      return;
    }

    if (data.action === "likeComment") {
      const likedComment = data.commentLiked;

      const existingCommentIndex = postData.comments.findIndex(
        (e: any) => e._id === likedComment._id
      );

      if (existingCommentIndex === -1) {
        throw new Error(
          "No such comment exists,server and client out of sync please reload!"
        );
      }

      const newPost = lodash.cloneDeep(postData);

      newPost.comments[existingCommentIndex] = likedComment;
      setPostData(newPost);
    }
  });

  return (
    <Flex
      alignItems={"center"}
      justifyContent={"flex-start"}
      direction={"column"}
      gap={5}
      h={"100vh"}
    >
      <Post
        authorEmail={postData.authorEmail}
        _id={postData._id}
        comments={postData.comments}
        title={postData.title}
        content={postData.content}
        likes={postData.likes}
        dislikes={postData.dislikes}
        favourites={postData.favourites}
        author={postData.author}
        images={postData.images}
        likedBy={postData.likedBy}
        dislikedBy={postData.dislikedBy}
      />
      {/* comments component */}

      <CommentList postId={postData._id} comments={postData.comments} />
    </Flex>
  );
};

export default PostPage;

export async function loader({ params }: { params: any }) {
  const id: string = params.postId;
  try {
    const response = await fetch("http://localhost:8080/post/" + id);

    const responseData: responseData = await response.json();

    if (responseData.error) {
      const error = new Error(responseData.errorObject.message);
      throw error;
    }

    return responseData;
  } catch (error) {
    console.log(error);
  }
}
