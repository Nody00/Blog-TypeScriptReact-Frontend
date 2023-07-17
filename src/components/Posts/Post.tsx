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
  HiOutlineBookmark,
} from "react-icons/hi";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { RiDislikeLine } from "react-icons/ri";
import PostGridOne from "./PostGridOne";
import PostGridTwo from "./PostGridTwo";
import PostGridThreePlus from "./PostGridThreePlus";
import EditPostForm from "./EditPostForm";
import { useAppSelector } from "../../hooks";
import { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import PostDeleteModal from "./PostDeleteModal";
import PostPhotoModal from "./PostPhotoModal";
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
  likedBy: {
    [userId: string]: string;
  };
  dislikedBy: {
    [userId: string]: string;
  };
}

interface ISocketData {
  action: string;
  id: string;
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
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const userId = useAppSelector((state) => state.auth.userId);
  const token = useAppSelector((state) => state.auth.token);
  const toast = useToast();
  const [likedState, setLikedState] = useState(false);
  const [dislikedState, setDislikedState] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const [photoModal, setPhotoModal] = useState(false);
  const socket = io(
    import.meta.env.VITE_BACKEND_URL || "http://localhost:8080"
  );

  socket.on("posts", (data: ISocketData) => {
    if (data.action === "liked" && data.id === props._id) {
      if (likedState) {
        setLikedState(false);
        return;
      }
      setLikedState(true);
      setDislikedState(false);
    }

    if (data.action === "disliked" && data.id === props._id) {
      if (dislikedState) {
        setDislikedState(false);
        return;
      }
      setDislikedState(true);
      setLikedState(false);
    }
  });

  useEffect(() => {
    setLikedState(props.likedBy[userId] === "" ? true : false);
    setDislikedState(props.dislikedBy[userId] === "" ? true : false);
  }, [userId]);

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
        `${
          import.meta.env.VITE_BACKEND_URL || "http://localhost:8080"
        }/post/like/` + props._id,
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

      // toast({
      //   duration: 10000,
      //   description: "Post liked",
      //   isClosable: true,
      //   status: "success",
      // });
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
        `${
          import.meta.env.VITE_BACKEND_URL || "http://localhost:8080"
        }/post/dislike/` + props._id,
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

      // toast({
      //   duration: 10000,
      //   description: "Post disliked",
      //   isClosable: true,
      //   status: "success",
      // });
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
    <Card minW={{ base: "100%", md: "lg" }}>
      <CardHeader>
        <Flex gap="3" alignItems={"center"} justifyContent={"space-between"}>
          <Flex gap="4" alignItems="center">
            <Avatar
              name={props.authorEmail}
             
            />

            <Box>
              <Heading size="sm">
                {props.authorEmail || "example@email.com"}
              </Heading>
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
          // overflow={"hidden"}
          // whiteSpace={"nowrap"}
        >
          {props.content}
        </Text>

        <Box
          onClick={() => {
            setPhotoModal(true);
          }}
        >
          {props.images && props.images.length === 1 && (
            <PostGridOne image={props.images[0]} />
          )}
          {props.images && props.images.length === 2 && (
            <PostGridTwo images={props.images} />
          )}
          {props.images && props.images.length >= 3 && (
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
            fill={likedState ? "red" : "#fff"}
            color={likedState ? "red" : "#000"}
          />
          <Icon
            as={RiDislikeLine}
            w={7}
            h={7}
            cursor={"pointer"}
            onClick={postDislikeHandler}
            color={dislikedState ? "blue" : "#000"}
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
          {/* <Icon as={HiOutlineShare} w={7} h={7} cursor={"pointer"} /> */}
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

      {/* modals,portaled */}

      <PostDeleteModal
        isOpen={deleteMode}
        onClose={() => {
          setDeleteMode(false);
        }}
        postId={props._id}
      />

      <PostPhotoModal
        isOpen={photoModal}
        onClose={() => {
          setPhotoModal(false);
        }}
        images={props.images}
      />
    </Card>
  );
};

export default Post;
