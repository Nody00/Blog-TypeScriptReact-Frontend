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
} from "@chakra-ui/react";
import {
  HiOutlineHeart,
  HiDotsVertical,
  HiOutlineChat,
  HiOutlineShare,
  HiOutlineBookmark,
} from "react-icons/hi";
import PostGridOne from "./PostGridOne";
import PostGridTwo from "./PostGridTwo";
import PostGridThreePlus from "./PostGridThreePlus";

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

const Post = (props: IPost) => {
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
          <Icon as={HiOutlineHeart} w={8} h={8} cursor={"pointer"} />
          <Icon as={HiOutlineChat} w={8} h={8} cursor={"pointer"} />
          <Icon as={HiOutlineShare} w={7} h={7} cursor={"pointer"} />
        </Flex>

        <Flex alignItems={"center"} justifyContent={"flex-end"}>
          <Icon as={HiOutlineBookmark} w={8} h={8} cursor={"pointer"} />
        </Flex>
      </CardFooter>
    </Card>
  );
};

export default Post;
