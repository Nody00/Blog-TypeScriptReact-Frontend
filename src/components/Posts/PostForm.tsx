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
  Button,
  FormControl,
  Input,
  FormLabel,
  Textarea,
} from "@chakra-ui/react";

const PostForm = () => {
  return (
    <Card maxW="md" mb={5}>
      <CardHeader>
        <Flex gap="3">
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <Heading size={"md"}>Add post</Heading>
          </Flex>
        </Flex>
      </CardHeader>

      <CardBody pb={0} pt={0}>
        <Flex
          direction={"column"}
          alignItems={"center"}
          justifyContent={"flex-start"}
          gap={3}
        >
          <FormControl>
            <FormLabel>Post title</FormLabel>
            <Input type="text" maxLength={20} />
          </FormControl>

          <FormControl>
            <FormLabel>Post content</FormLabel>
            <Textarea maxLength={400} />
          </FormControl>

          <FormControl>
            <FormLabel>Post images (max 5)</FormLabel>
            <Input
              type="file"
              accept="image/png,image/jpg,image/jpeg"
              p={2}
              size={"lg"}
              multiple
              //   you get a array of file on the target
            />
          </FormControl>
        </Flex>
      </CardBody>

      <CardFooter
        justify="space-between"
        flexWrap="wrap"
        sx={{
          "& > button": {
            minW: "136px",
          },
        }}
      >
        <Button colorScheme="green" variant={"solid"}>
          Submit
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PostForm;
