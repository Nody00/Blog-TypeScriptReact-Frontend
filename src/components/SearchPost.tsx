import { Flex, Text, Button } from "@chakra-ui/react";

// interface IProps {
//   url: string;
//   numLikes: number;
//   numFavourites: number;
//   title: string;
//   content: string;
// }

const SearchPost = () => {
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
        Typescript post
      </Text>
      <Text
        color={"gray.500"}
        w={"100%"}
        overflow={"hidden"}
        whiteSpace={"nowrap"}
        textOverflow={"ellipsis"}
      >
        The typescript compiler is crazy good...
      </Text>
      <Flex alignItems={"center"} justifyContent={"flex-start"} gap={2}>
        <Text>Icon</Text>
        <Text>3</Text>
      </Flex>
      <Flex alignItems={"center"} justifyContent={"flex-start"} gap={2} mb={2}>
        <Text>Icon</Text>
        <Text>3</Text>
      </Flex>
      <Button colorScheme="twitter" size={"sm"}>
        View post
      </Button>
    </Flex>
  );
};

export default SearchPost;
