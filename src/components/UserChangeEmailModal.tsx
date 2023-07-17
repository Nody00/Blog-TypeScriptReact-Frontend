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

const UserChangeEmailModal = (props: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [userPassword, setUserPassword] = useState("");
  const [userPasswordError, setUserPasswordError] = useState({
    error: false,
    errorMessage: "",
  });
  const [userEmail, setUserEmail] = useState("");
  const [userEmailError, setUserEmailError] = useState({
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
  function emailChangeHandler(e: { target: HTMLInputElement }) {
    setUserEmail(e.target.value);
  }

  async function changeEmailHandler() {
    setUserPasswordError({
      error: false,
      errorMessage: "",
    });
    setUserEmailError({
      error: false,
      errorMessage: "",
    });

    // const password = userPassword;
    const email = userEmail;

    if (userPassword.trim().length < 7) {
      setUserPasswordError({
        error: true,
        errorMessage: "Password too short,min of 7 chars required",
      });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      console.log("aaa emai lerro");
      setUserEmailError({
        error: true,
        errorMessage: "Invalid email format. Example: example@gmail.com",
      });
    }

    if (userPasswordError.error) {
      return;
    }

    if (userEmailError.error) {
      return;
    }

    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL || "http://localhost:8080"
        }/auth/changeEmail/` + userId,
        {
          method: "POST",
          body: JSON.stringify({ email: email, password: userPassword }),
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
        description: "Email changed",
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
          <Text mb={3}>Change your email.</Text>

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

          <FormControl isInvalid={userEmailError.error} mb={3}>
            <FormLabel>Enter new email:</FormLabel>
            <Input
              type={"email"}
              onChange={emailChangeHandler}
              isRequired={true}
            />
            <FormErrorMessage>{userEmailError.errorMessage}</FormErrorMessage>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="green" mr={3} onClick={changeEmailHandler}>
            Change email
          </Button>
          <Button colorScheme="gray" mr={3} onClick={props.onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UserChangeEmailModal;
