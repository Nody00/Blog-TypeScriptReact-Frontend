import {
  Card,
  CardHeader,
  Flex,
  Heading,
  CardBody,
  CardFooter,
  Button,
  FormControl,
  Input,
  FormLabel,
  Textarea,
  FormErrorMessage,
  Text,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { useAppSelector } from "../../hooks";
// import { useNavigate } from "react-router-dom";

interface responseData {
  result: object;
  error: boolean;
  errorObject: {
    message: string;
    statusCode: number;
  };
}

const PostForm = () => {
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const token = useAppSelector((state) => state.auth.token);
  const userId = useAppSelector((state) => state.auth.userId);
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  // const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
      image1: "",
      image2: "",
      image3: "",
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .max(20, "Max 20 chars")
        .min(1, "Minimum 1 char")
        .required("Required"),
      content: Yup.string()
        .max(400, "Max 400 chars")
        .min(1, "Minimum 1 char")
        .required("Required"),
      image1: Yup.string().max(500, "Max 500 chars"),
      image2: Yup.string().max(500, "Max 500 chars"),
      image3: Yup.string().max(500, "Max 500 chars"),
    }),
    onSubmit: async (values) => {
      if (!isAuth) {
        return;
      }
      const images = [];

      if (values.image1 !== "") {
        images.push(values.image1);
      }
      if (values.image2 !== "") {
        images.push(values.image2);
      }
      if (values.image3 !== "") {
        images.push(values.image3);
      }

      try {
        setIsLoading(true);
        const response = await fetch(
          `${
            import.meta.env.VITE_BACKEND_URL || "http://localhost:8080"
          }/post/new`,
          {
            method: "POST",
            body: JSON.stringify({
              title: values.title,
              content: values.content,
              images: images,
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
        setIsLoading(false);
        toast({
          duration: 2000,
          description: "Post submitted successfully",
          isClosable: true,
          status: "success",
        });
        // navigate("/");
      } catch (err: any) {
        setIsLoading(false);

        toast({
          duration: 10000,
          description: err.message,
          isClosable: true,
          status: "error",
        });
      }
    },
  });

  return (
    <Card maxWidth={"lg"} minW={{ base: "auto", md: "md" }} mb={5}>
      <form onSubmit={formik.handleSubmit}>
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
            <FormControl isInvalid={formik.errors.title ? true : false}>
              <FormLabel>Post title</FormLabel>
              <Input
                type="text"
                maxLength={20}
                placeholder="title"
                {...formik.getFieldProps("title")}
              />

              <FormErrorMessage>{formik.errors.title}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={formik.errors.content ? true : false}>
              <FormLabel>Post content</FormLabel>
              <Textarea
                maxLength={400}
                placeholder="Enter your thoughts"
                {...formik.getFieldProps("content")}
              />
              <FormErrorMessage>{formik.errors.content}</FormErrorMessage>
            </FormControl>

            <FormControl>
              <FormLabel>Post images (max 3)</FormLabel>
              <Flex
                direction={"column"}
                alignItems={"center"}
                justifyContent={"center"}
                width={"100%"}
                gap={2}
              >
                <Input
                  type="text"
                  size={"lg"}
                  placeholder="url"
                  {...formik.getFieldProps("image1")}
                />
                <Input
                  type="text"
                  size={"lg"}
                  placeholder="url"
                  {...formik.getFieldProps("image2")}
                />
                <Input
                  type="text"
                  size={"lg"}
                  placeholder="url"
                  {...formik.getFieldProps("image3")}
                />
              </Flex>
            </FormControl>
          </Flex>
        </CardBody>

        <CardFooter
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          {!isLoading && (
            <Button
              isDisabled={!isAuth}
              colorScheme="green"
              variant={"solid"}
              type="submit"
            >
              Submit
            </Button>
          )}
          {isLoading && (
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="green"
              size="lg"
              mr={3}
            />
          )}
          {!isAuth && <Text color={"red"}>Must be logged in to post</Text>}
        </CardFooter>
      </form>
    </Card>
  );
};

export default PostForm;
