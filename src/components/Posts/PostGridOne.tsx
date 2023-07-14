import { Box, Image } from "@chakra-ui/react";

interface IProps {
  image: string;
}

const PostGridOne = (props: IProps) => {
  return (
    <Box
      objectFit={"cover"}
      overflow={"hidden"}
      borderRadius={"9px"}
      cursor={"pointer"}
      _hover={{ filter: "grayscale(80%)", transition: "all 0.4s" }}
    >
      <Image objectFit="cover" src={props.image} alt="Chakra UI" />
    </Box>
  );
};

export default PostGridOne;
