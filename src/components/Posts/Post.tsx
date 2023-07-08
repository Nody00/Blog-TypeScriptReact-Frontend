import {
  Card,
  CardHeader,
  Flex,
  Avatar,
  Box,
  Heading,
  Text,
  IconButton,
  CardBody,
  CardFooter,
  Icon,
  useToast,
  Link,
} from "@chakra-ui/react";
import {
  HiOutlineHeart,
  HiDotsVertical,
  HiOutlineChat,
  HiOutlineShare,
  HiOutlineBookmark,
} from "react-icons/hi";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { RiDislikeLine } from "react-icons/ri";
import PostGridOne from "./PostGridOne";
import PostGridTwo from "./PostGridTwo";
import PostGridThreePlus from "./PostGridThreePlus";
import EditPostForm from "./EditPostForm";
import { useAppSelector } from "../../hooks";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import PostDeleteModal from "./PostDeleteModal";

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

interface responseData {
  result: object;
  error: boolean;
  errorObject: {
    message: string;
    statusCode: number;
  };
}

const Post = (props: IPost) => {
  const [editMode, setEditMode] = useState(false);
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const userId = useAppSelector((state) => state.auth.userId);
  const token = useAppSelector((state) => state.auth.token);
  const [deleteMode, setDeleteMode] = useState(false);
  const toast = useToast();

  function toggleEditModeHandler() {
    setEditMode((prevState) => !prevState);
  }

  async function postLikeHandler() {
    if (!isAuth) {
      toast({
        duration: 10000,
        description: "Must be logged in to like posts",
        isClosable: true,
        status: "error",
      });
      return;
    }
    try {
      const response = await fetch(
        "http://localhost:8080/post/like/" + props._id,
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
        duration: 10000,
        description: "Post liked",
        isClosable: true,
        status: "success",
      });
    } catch (err: any) {
      toast({
        duration: 10000,
        description: err.message,
        isClosable: true,
        status: "error",
      });
    }
  }

  async function postDislikeHandler() {
    if (!isAuth) {
      toast({
        duration: 10000,
        description: "Must be logged in to like posts",
        isClosable: true,
        status: "error",
      });
      return;
    }
    try {
      const response = await fetch(
        "http://localhost:8080/post/dislike/" + props._id,
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
        duration: 10000,
        description: "Post disliked",
        isClosable: true,
        status: "success",
      });
    } catch (err: any) {
      toast({
        duration: 10000,
        description: err.message,
        isClosable: true,
        status: "error",
      });
    }
  }

  if (editMode) {
    return (
      <EditPostForm postData={props} toggleEditMode={toggleEditModeHandler} />
    );
  }

  return (
    <Card maxWidth={"lg"} minW={{ base: "auto", md: "md" }}>
      <CardHeader>
        <Flex gap="3">
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <Avatar
              name="email@example.com"
              src="https://bit.ly/sage-adebayo"
            />

            <Box>
              <Heading size="sm">
                {props.authorEmail || "example@email.com"}
              </Heading>
              {/* <Text>Creator, Chakra UI</Text> */}
            </Box>
          </Flex>
          <IconButton
            variant="ghost"
            colorScheme="gray"
            aria-label="See menu"
            icon={<HiDotsVertical />}
          />
        </Flex>
      </CardHeader>
      <CardBody pb={0} pt={0}>
        <Heading size={"md"} mb={3}>
          {props.title}
        </Heading>
        <Text
          mb={2}
          w={"calc(100%)"}
          textOverflow={"ellipsis"}
          overflow={"hidden"}
          whiteSpace={"nowrap"}
        >
          {props.content}
        </Text>

        <Box>
          {props.images.length === 1 && <PostGridOne image={props.images[0]} />}
          {props.images.length === 2 && <PostGridTwo images={props.images} />}
          {props.images.length >= 3 && (
            <PostGridThreePlus images={props.images} />
          )}
        </Box>
      </CardBody>

      <CardFooter
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        gap={2}
      >
        <Flex alignItems={"center"} justifyContent={"flex-start"} gap={2}>
          <Icon
            as={HiOutlineHeart}
            w={8}
            h={8}
            cursor={"pointer"}
            onClick={postLikeHandler}
          />
          <Icon
            as={RiDislikeLine}
            w={7}
            h={7}
            cursor={"pointer"}
            onClick={postDislikeHandler}
          />
          <Link
            as={RouterLink}
            to={"/post/" + props._id}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Icon as={HiOutlineChat} w={8} h={8} cursor={"pointer"} />
          </Link>
          <Icon as={HiOutlineShare} w={7} h={7} cursor={"pointer"} />
          {isAuth && userId === props.author && (
            <Icon
              as={AiOutlineEdit}
              w={8}
              h={8}
              cursor={"pointer"}
              onClick={toggleEditModeHandler}
            />
          )}

          {isAuth && userId === props.author && (
            <Icon
              as={AiOutlineDelete}
              w={8}
              h={8}
              cursor={"pointer"}
              onClick={() => {
                setDeleteMode(true);
              }}
            />
          )}
        </Flex>

        <Flex alignItems={"center"} justifyContent={"flex-end"}>
          <Icon as={HiOutlineBookmark} w={8} h={8} cursor={"pointer"} />
        </Flex>
      </CardFooter>

      <PostDeleteModal
        isOpen={deleteMode}
        onClose={() => {
          setDeleteMode(false);
        }}
        postId={props._id}
      />
    </Card>
  );
};

export default Post;
