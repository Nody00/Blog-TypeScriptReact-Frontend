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
  Input,
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/react";
import { useAppSelector } from "../hooks";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks";
import { signOut } from "../slices/authSlice";
import { useState } from "react";

interface responseData {
  result: object;
  error: boolean;
  errorObject: {
    message: string;
    statusCode: number;
  };
  message: string;
}

const UserDeleteProfileModal = (props: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [userPassword, setUserPassword] = useState("");
  const [userPasswordError, setUserPasswordError] = useState({
    error: false,
    errorMessage: "",
  });
  const toast = useToast();
  const userId = useAppSelector((state) => state.auth.userId);
  const token = useAppSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  function passwordChangeHandler(e: { target: HTMLInputElement }) {
    setUserPassword(e.target.value);
  }

  async function deleteProfileHandler() {
    setUserPasswordError({
      error: false,
      errorMessage: "",
    });

    // const password = userPassword;

    if (userPassword.trim().length < 7) {
      setUserPasswordError({
        error: true,
        errorMessage: "Password too short,min of 7 chars required",
      });
      return;
    }

    if (userPasswordError.error) {
      return;
    }

    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL || "http://localhost:8080"
        }/auth/deleteProfile/` + userId,
        {
          method: "POST",
          body: JSON.stringify({ password: userPassword }),
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      const responseData: responseData = await response.json();
      if (responseData.error) {
        const error = new Error(
          responseData.errorObject.message || responseData.message
        );
        throw error;
      }
      toast({
        duration: 2000,
        description: "Profile deleted",
        isClosable: true,
        status: "success",
      });
      dispatch(signOut());
      props.onClose();
      navigate("/");
    } catch (error: any) {
      setUserPasswordError({
        error: true,
        errorMessage: error.message,
      });
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
        <ModalHeader></ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            Are you sure? You can not recover an account once deleted!
          </Text>

          <FormControl isInvalid={userPasswordError.error}>
            <FormLabel>Enter password:</FormLabel>
            <Input
              type={"password"}
              onChange={passwordChangeHandler}
              isRequired={true}
              minLength={7}
            />
            <FormErrorMessage>
              {userPasswordError.errorMessage}
            </FormErrorMessage>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={deleteProfileHandler}>
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

export default UserDeleteProfileModal;
