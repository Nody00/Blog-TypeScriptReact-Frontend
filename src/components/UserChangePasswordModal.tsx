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

const UserChangePasswordModal = (props: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [userPassword, setUserPassword] = useState("");
  const [userPasswordError, setUserPasswordError] = useState({
    error: false,
    errorMessage: "",
  });
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordError, setNewPasswordError] = useState({
    error: false,
    errorMessage: "",
  });
  const toast = useToast();
  const userId = useAppSelector((state) => state.auth.userId);
  const token = useAppSelector((state) => state.auth.token);

  function passwordChangeHandler(e: { target: HTMLInputElement }) {
    setUserPassword(e.target.value);
  }
  function newPasswordChangeHandler(e: { target: HTMLInputElement }) {
    setNewPassword(e.target.value);
  }

  async function changeNewPasswordHandler() {
    setUserPasswordError({
      error: false,
      errorMessage: "",
    });
    setNewPasswordError({
      error: false,
      errorMessage: "",
    });

    if (userPassword.trim().length < 7) {
      setUserPasswordError({
        error: true,
        errorMessage: "Password too short,min of 7 chars required",
      });
    }

    if (newPassword.trim().length < 7) {
      setNewPasswordError({
        error: true,
        errorMessage: "Password too short,min of 7 chars required",
      });
    }

    if (userPasswordError.error) {
      return;
    }

    if (newPasswordError.error) {
      return;
    }

    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL || "http://localhost:8080"
        }/auth/changePassword/` + userId,
        {
          method: "POST",
          body: JSON.stringify({
            password: userPassword,
            newPassword: newPassword,
          }),
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
        description: "Password changed",
        isClosable: true,
        status: "success",
      });

      props.onClose();
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
        <ModalHeader></ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text mb={3}>Change your password.</Text>

          <FormControl isInvalid={userPasswordError.error} mb={3}>
            <FormLabel>Confirm password:</FormLabel>
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

          <FormControl isInvalid={newPasswordError.error} mb={3}>
            <FormLabel>Enter new password:</FormLabel>
            <Input
              type={"email"}
              onChange={newPasswordChangeHandler}
              isRequired={true}
            />
            <FormErrorMessage>{newPasswordError.errorMessage}</FormErrorMessage>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="green" mr={3} onClick={changeNewPasswordHandler}>
            Change password
          </Button>
          <Button colorScheme="gray" mr={3} onClick={props.onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UserChangePasswordModal;
