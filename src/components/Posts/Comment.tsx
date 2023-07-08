import { Box, Flex, Text, Icon, useToast, Button } from "@chakra-ui/react";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { useAppSelector } from "../../hooks";
import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import EditCommentForm from "./EditCommentForm";
import CommentDeleteModal from "./CommentDeleteModal";

interface commentData {
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

const Comment = (props: { commentData: commentData }) => {
  const [editMode, setEditMode] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const userId = useAppSelector((state) => state.auth.userId);
  const token = useAppSelector((state) => state.auth.token);
  const email = useAppSelector((state) => state.auth.email);
  const toast = useToast();
  // const navigate = useNavigate();

  function toggleEditMode() {
    setEditMode((prevState) => !prevState);
  }

  async function likeCommentHandler() {
    try {
      const response = await fetch(
        "http://localhost:8080/post/like/comment/" + props.commentData._id,
        {
          method: "POST",
          body: JSON.stringify({
            userId: userId,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );

      const responseData: responseData = await response.json();

      if (responseData.error) {
        const error = new Error(responseData.errorObject.message);
        throw error;
      }

      toast({
        duration: 2000,
        description: "Comment liked",
        isClosable: true,
        status: "success",
      });
      // navigate(0);
    } catch (error: any) {
      toast({
        duration: 2000,
        description: error.message,
        isClosable: true,
        status: "error",
      });
    }
  }

  async function dislikeCommentHandler() {
    try {
      const response = await fetch(
        "http://localhost:8080/post/dislike/comment/" + props.commentData._id,
        {
          method: "POST",
          body: JSON.stringify({
            userId: userId,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );

      const responseData: responseData = await response.json();

      if (responseData.error) {
        const error = new Error(responseData.errorObject.message);
        throw error;
      }

      toast({
        duration: 2000,
        description: "Comment disliked",
        isClosable: true,
        status: "success",
      });
      // navigate(0);
    } catch (error: any) {
      toast({
        duration: 2000,
        description: error.message,
        isClosable: true,
        status: "error",
      });
    }
  }

  function toggleDeleteModal() {
    setDeleteModal(true);
  }

  if (editMode) {
    return (
      <EditCommentForm
        commentData={props.commentData}
        toggleEditMode={toggleEditMode}
      />
    );
  }
  return (
    <Box
      p={"1rem 1rem"}
      bgColor={"#fff"}
      borderRadius={"9px"}
      minW={{ base: "auto", md: "md" }}
      maxW={"md"}
    >
      <Flex
        direction={"column"}
        alignItems={"flex-start"}
        justifyContent={"flex-start"}
        gap={2}
      >
        <Text fontSize={"sm"} fontWeight={700}>
          {props.commentData.author} says:
        </Text>
        <Text mb={2}>{props.commentData.content}</Text>
      </Flex>
      <Flex alignItems={"center"} justifyContent={"flex-start"} gap={5}>
        <Flex
          direction={"column"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Icon
            as={AiOutlineLike}
            w={7}
            h={7}
            cursor={"pointer"}
            onClick={likeCommentHandler}
          />
          <Text fontWeight={600}>{props.commentData.likes}</Text>
        </Flex>
        <Flex
          direction={"column"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Icon
            as={AiOutlineDislike}
            w={7}
            h={7}
            cursor={"pointer"}
            onClick={dislikeCommentHandler}
          />
          <Text fontWeight={600}>{props.commentData.dislikes}</Text>
        </Flex>
        {email === props.commentData.author && (
          <Button
            colorScheme="green"
            variant={"solid"}
            onClick={toggleEditMode}
          >
            Edit
          </Button>
        )}
        {email === props.commentData.author && (
          <Button
            colorScheme="red"
            variant={"solid"}
            onClick={toggleDeleteModal}
          >
            Delete
          </Button>
        )}
      </Flex>

      <CommentDeleteModal
        isOpen={deleteModal}
        onClose={() => {
          setDeleteModal(false);
        }}
        commentId={props.commentData._id}
      />
    </Box>
  );
};

export default Comment;
