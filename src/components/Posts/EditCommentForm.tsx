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
  Box,
  useToast,
} from "@chakra-ui/react";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useAppSelector } from "../../hooks";
// import { useNavigate } from "react-router-dom";

interface commentData {
  author: string;
  post: string;
  content: string;
  likes: number;
  dislikes: number;
  _id: string;
}

interface responseData {
  result: object;
  error: boolean;
  errorObject: {
    message: string;
    statusCode: number;
  };
}

const EditCommentForm = (props: {
  commentData: commentData;
  toggleEditMode: () => void;
}) => {
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const token = useAppSelector((state) => state.auth.token);
  const email = useAppSelector((state) => state.auth.email);
  const toast = useToast();
  // const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      content: props.commentData.content,
    },
    validationSchema: Yup.object({
      content: Yup.string()
        .max(500, "Max 500 chars")
        .min(1, "Minimum 1 char")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      if (!isAuth) {
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:8080/post/comment/edit/" + props.commentData._id,
          {
            method: "POST",
            body: JSON.stringify({
              content: values.content,
              email: email,
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
          description: "Comment edited successfully",
          isClosable: true,
          status: "success",
        });
        props.toggleEditMode();
        // navigate(0);
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
              <Box>
                <Heading size="sm">
                  {props.commentData.author || "example@email.com"}
                </Heading>
              </Box>
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
              <Input
                maxLength={400}
                placeholder="Enter your thoughts"
                {...formik.getFieldProps("content")}
              />
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

export default EditCommentForm;
