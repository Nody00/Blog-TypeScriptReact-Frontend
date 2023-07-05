import { Box, Image } from "@chakra-ui/react";

interface IProps {
  image: string;
}

const PostGridOne = (props: IProps) => {
  return (
    <Box objectFit={"cover"} overflow={"hidden"} borderRadius={"9px"}>
      <Image objectFit="cover" src={props.image} alt="Chakra UI" />
    </Box>
  );
};

export default PostGridOne;
