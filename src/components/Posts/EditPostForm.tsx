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
  Avatar,
  Box,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { HiDotsVertical } from "react-icons/hi";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAppSelector } from "../../hooks";
// import { useNavigate } from "react-router-dom";

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

interface responseData {
  result: object;
  error: boolean;
  errorObject: {
    message: string;
    statusCode: number;
  };
}

const EditPostForm = (props: {
  postData: IPost;
  toggleEditMode: () => void;
}) => {
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const token = useAppSelector((state) => state.auth.token);
  const userId = useAppSelector((state) => state.auth.userId);
  const toast = useToast();
  // const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      title: props.postData.title,
      content: props.postData.content,
      image1: props.postData.images[0] || "",
      image2: props.postData.images[1] || "",
      image3: props.postData.images[2] || "",
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
        const response = await fetch(
          "http://localhost:8080/post/edit/" + props.postData._id,
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
        toast({
          duration: 2000,
          description: "Post edited successfully",
          isClosable: true,
          status: "success",
        });
        props.toggleEditMode();
      } catch (err: any) {
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
              <Avatar
                name="email@example.com"
                src="https://bit.ly/sage-adebayo"
              />

              <Box>
                <Heading size="sm">
                  {props.postData.authorEmail || "example@email.com"}
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

            <FormControl>
              <FormLabel>Post content</FormLabel>
              <Textarea
                maxLength={400}
                placeholder="Enter your thoughts"
                {...formik.getFieldProps("content")}
              />
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
          <Button colorScheme="green" variant={"solid"} type="submit">
            Confirm edit
          </Button>

          <Button
            colorScheme="red"
            variant={"solid"}
            onClick={props.toggleEditMode}
          >
            Cancel
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default EditPostForm;
