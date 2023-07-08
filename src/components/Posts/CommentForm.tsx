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
  FormErrorMessage,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
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

const CommentForm = (props: { postId: string; toggleForm: () => void }) => {
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const token = useAppSelector((state) => state.auth.token);
  const userId = useAppSelector((state) => state.auth.userId);
  const email = useAppSelector((state) => state.auth.email);
  const toast = useToast();
  // const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      content: "",
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
          "http://localhost:8080/post/comment/" + props.postId,
          {
            method: "POST",
            body: JSON.stringify({
              content: values.content,
              userId: userId,
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
          description: "Comment submitted successfully",
          isClosable: true,
          status: "success",
        });
        props.toggleForm();
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
              <Heading size={"md"}>Add comment</Heading>
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
            <FormControl isInvalid={formik.errors.content ? true : false}>
              <Input
                type="text"
                maxLength={20}
                placeholder="Share your thoughts"
                {...formik.getFieldProps("content")}
              />

              <FormErrorMessage>{formik.errors.content}</FormErrorMessage>
            </FormControl>
          </Flex>
        </CardBody>

        <CardFooter
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Button
            isDisabled={!isAuth}
            colorScheme="green"
            variant={"solid"}
            type="submit"
          >
            Submit
          </Button>
          {!isAuth && <Text color={"red"}>Must be logged in to comment</Text>}
        </CardFooter>
      </form>
    </Card>
  );
};

export default CommentForm;
