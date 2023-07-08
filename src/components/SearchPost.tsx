import { Flex, Text, Button, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

interface IPostData {
  _id: string;
  likes: number;
  dislikes: number;
  title: string;
  content: string;
  images: string[];
  authorEmail: string;
  author: string;
}

const SearchPost = (props: { postData: IPostData; onClose: () => void }) => {
  return (
    <Flex
      direction={"column"}
      mb={5}
      p={2}
      borderRadius={"9px"}
      bgColor={"gray.100"}
    >
      <Text
        fontSize={"2rem"}
        w={"100%"}
        overflow={"hidden"}
        whiteSpace={"nowrap"}
        textOverflow={"ellipsis"}
      >
        {props.postData.title}
      </Text>
      <Text
        color={"gray.500"}
        w={"100%"}
        overflow={"hidden"}
        whiteSpace={"nowrap"}
        textOverflow={"ellipsis"}
      >
        {props.postData.content}
      </Text>
      <Flex alignItems={"center"} justifyContent={"flex-start"} gap={2}>
        <Text>Likes:</Text>
        <Text> {props.postData.likes}</Text>
      </Flex>
      <Flex alignItems={"center"} justifyContent={"flex-start"} gap={2} mb={2}>
        <Text>Dislikes:</Text>
        <Text> {props.postData.dislikes}</Text>
      </Flex>
      <Link
        as={RouterLink}
        to={`/post/` + props.postData._id}
        w={"100%"}
        textDecor={"none"}
        _hover={{ textDecor: "none" }}
      >
        <Button
          colorScheme="twitter"
          size={"sm"}
          w={"100%"}
          onClick={props.onClose}
        >
          View post
        </Button>
      </Link>
    </Flex>
  );
};

export default SearchPost;
