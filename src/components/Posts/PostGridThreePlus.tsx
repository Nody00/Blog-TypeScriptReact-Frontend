import { Grid, Box, Text } from "@chakra-ui/react";

interface IProps {
  images: string[];
}

const PostGridThreePlus = (props: IProps) => {
  return (
    <Grid
      width={"100%"}
      gridTemplateColumns={"1fr 1fr"}
      cursor={"pointer"}
      _hover={{ filter: "grayscale(80%)", transition: "all 0.4s" }}
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
      <Grid gridTemplateRows={"1fr 1fr"}>
        <Box
          bgImage={props.images[1]}
          w={"100%"}
          h={"100%"}
          bgSize={"cover"}
          bgPosition={"center"}
        />
        <Box position={"relative"}>
          <Box
            bgImage={props.images[2]}
            w={"100%"}
            h={"100%"}
            bgSize={"cover"}
            bgPosition={"center"}
          />
          {/* <Text
            position={"absolute"}
            top={"50%"}
            left={"50%"}
            transform={"translate(-50%,-50%)"}
            fontSize={"4rem"}
            fontWeight={"700"}
            color={"#fff"}
          >
            +2
          </Text> */}
        </Box>
      </Grid>
    </Grid>
  );
};

export default PostGridThreePlus;
