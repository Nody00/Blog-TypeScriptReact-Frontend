import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
  InputGroup,
  InputRightElement,
  Link,
  FormErrorMessage,
  useToast,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useAppDispatch } from "../hooks";
import { signIn, signOut } from "../slices/authSlice";
interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

interface responseData {
  token: string;
  userId: string;
  error: boolean;

  email: string;
  errorObject: {
    message: string;
    statusCode: number;
  };
}

const LoginModal = (props: IProps) => {
  const [passwordShow, setPasswordShow] = useState(false);
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [errorState, setErrorState] = useState({
    error: false,
    errorMessage: "",
  });
  const dispatch = useAppDispatch();
  const toast = useToast();

  function togglePasswordHandler() {
    setPasswordShow((prevState) => !prevState);
  }

  function validateEmail(e: { target: HTMLInputElement }) {
    const email = e.target.value;
    setEmailError(false);
    setErrorState({
      error: false,
      errorMessage: "",
    });

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError(true);
      return;
    }

    setEmailValue(email);
  }

  function validatePassword(e: { target: HTMLInputElement }) {
    const password = e.target.value;
    setPasswordError(false);
    setErrorState({
      error: false,
      errorMessage: "",
    });

    if (password.length < 7) {
      setPasswordError(true);
      return;
    }

    setPasswordValue(password);
  }

  async function submitHandler() {
    if (emailError || passwordError) {
      return;
    }

    try {
      const result = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email: emailValue,
          password: passwordValue,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data: responseData = await result.json();

      if (data.error) {
        setErrorState({
          error: true,
          errorMessage: data.errorObject.message,
        });
        throw new Error(data.errorObject.message);
      }

      console.log(data);
      //   set the token to state and close the modal
      dispatch(signIn(data));

      // set token and token exp date to localstorage

      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId);
      localStorage.setItem("email", data.email);

      setTimeout(() => {
        dispatch(signOut());
      }, 3 * 60 * 60 * 1000);

      // sucess toast
      toast({
        title: "User authenticated",
        variant: "left-accent",
        status: "success",
        isClosable: true,
      });

      props.onClose();
    } catch (error: any) {
      // do error handling with toast maybe

      toast({
        title: error.message || "Error",
        variant: "left-accent",
        status: "error",
        isClosable: true,
      });
    }
  }

  return (
    <>
      <Modal isOpen={props.isOpen} onClose={props.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Login</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isInvalid={emailError}>
              <FormLabel>Email</FormLabel>
              <Input
                placeholder="example@gmail.com"
                isRequired
                onChange={validateEmail}
                bgColor={emailError ? "red.100" : "#fff"}
              />
              <FormErrorMessage>Invalid email</FormErrorMessage>
            </FormControl>

            <FormControl mt={4} mb={4} isInvalid={passwordError}>
              <FormLabel>Password</FormLabel>
              <InputGroup size="md">
                <Input
                  pr="4.5rem"
                  type={passwordShow ? "text" : "password"}
                  placeholder="Enter password"
                  isRequired
                  onChange={validatePassword}
                  bgColor={passwordError ? "red.100" : "#fff"}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={togglePasswordHandler}>
                    {passwordShow ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>
                Invalid password,must be at least 7 characters
              </FormErrorMessage>
            </FormControl>

            <Link as={RouterLink} to="/" fontSize={"1rem"} color={"gray.500"}>
              Forgot your password?
            </Link>
          </ModalBody>

          <ModalFooter>
            {errorState.error && (
              <Text color="red.500" mr={2}>
                {errorState.errorMessage}
              </Text>
            )}
            <Button colorScheme="blue" mr={3} onClick={submitHandler}>
              Login
            </Button>
            <Button onClick={props.onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default LoginModal;
