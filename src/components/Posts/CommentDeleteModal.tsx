import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Button,
  useToast,
} from "@chakra-ui/react";
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

const CommentDeleteModal = (props: {
  isOpen: boolean;
  onClose: () => void;
  commentId: string;
}) => {
  const toast = useToast();
  const email = useAppSelector((state) => state.auth.email);
  const token = useAppSelector((state) => state.auth.token);
  // const navigate = useNavigate();

  async function deleteCommentHandler() {
    try {
      const response = await fetch(
        "http://localhost:8080/post/comment/delete/" + props.commentId,
        {
          method: "POST",
          body: JSON.stringify({
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
        description: "Comment deleted",
        isClosable: true,
        status: "success",
      });
      props.onClose();
      // navigate(0);
    } catch (error: any) {
      toast({
        duration: 2000,
        description: error.message,
        isClosable: true,
        status: "error",
      });
    }
  }

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Are you sure?</Text>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={deleteCommentHandler}>
            Delete
          </Button>
          <Button colorScheme="gray" mr={3} onClick={props.onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CommentDeleteModal;
