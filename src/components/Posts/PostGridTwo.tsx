import { Grid, Box } from "@chakra-ui/react";

interface IProps {
  images: string[];
}

const PostGridTwo = (props: IProps) => {
  return (
    <Grid
      width={"100%"}
      gridTemplateColumns={"1fr 1fr"}
      cursor={"pointer"}
      _hover={{ filter: "grayscale(80%)", transition: "all 0.2s" }}
      overflow={"hidden"}
      borderRadius={"9px"}
      h={"15rem"}
    >
      <Box
        bgImage={props.images[0]}
        w={"100%"}
        h={"100%"}
        bgSize={"cover"}
        bgPosition={"center"}
      />
      <Box
        bgImage={props.images[1]}
        w={"100%"}
        h={"100%"}
        bgSize={"cover"}
        bgPosition={"center"}
      />
    </Grid>
  );
};

export default PostGridTwo;
