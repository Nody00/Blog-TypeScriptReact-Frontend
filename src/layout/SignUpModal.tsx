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
  FormErrorMessage,
  useToast,
  Text,
  Spinner,
} from "@chakra-ui/react";
import { useState } from "react";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

interface responseData {
  user: object;
  error: boolean;
  errorObject: {
    message: string;
    statusCode: number;
  };
}

const SignUpModal = (props: IProps) => {
  const [passwordShow, setPasswordShow] = useState(false);
  const [emailValue, setEmailValue] = useState("");
  const [usernameValue, setUsernameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [passwordEqualValue, setPasswordEqualValue] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordEqualError, setPasswordEqualError] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [errorState, setErrorState] = useState({
    error: false,
    errorMessage: "",
  });

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

  function validateUsername(e: { target: HTMLInputElement }) {
    const username = e.target.value;
    setUsernameError(false);
    setErrorState({
      error: false,
      errorMessage: "",
    });

    if (username.length > 10) {
      setUsernameError(true);
      return;
    }

    setUsernameValue(username);
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

  function validatePasswordEqual(e: { target: HTMLInputElement }) {
    const passwordConfirm = e.target.value;
    setPasswordEqualError(false);
    setErrorState({
      error: false,
      errorMessage: "",
    });

    if (passwordConfirm !== passwordValue) {
      setPasswordEqualError(true);
      return;
    }

    setPasswordEqualValue(passwordEqualValue);
  }

  async function submitHandler() {
    setIsLoading(true);
    if (emailError || passwordError || passwordEqualError || usernameError) {
      return;
    }

    setErrorState({
      error: false,
      errorMessage: "",
    });

    try {
      const result = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL || "http://localhost:8080"
        }/auth/signup`,
        {
          method: "POST",
          body: JSON.stringify({
            email: emailValue,
            password: passwordValue,
            username: usernameValue,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data: responseData = await result.json();

      if (data.error) {
        setErrorState({
          error: true,
          errorMessage: data.errorObject.message,
        });

        throw new Error(data.errorObject.message);
      }

      console.log(data);

      // sucess toast
      toast({
        title: "User created",
        variant: "left-accent",
        status: "success",
        isClosable: true,
      });
      setIsLoading(false);
      props.onClose();
    } catch (error: any) {
      // do error handling with toast maybe
      setIsLoading(false);
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
          <ModalHeader>Create Account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isInvalid={emailError}>
              <FormLabel>Email</FormLabel>
              <Input
                placeholder="example@gmail.com"
                isRequired
                onChange={validateEmail}
                errorBorderColor="red.500"
                bgColor={emailError ? "red.100" : "#fff"}
              />
              <FormErrorMessage>
                Valid format example@gmail.com
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={usernameError} mt={4} mb={4}>
              <FormLabel>Username</FormLabel>
              <Input
                placeholder="myusername"
                isRequired
                onChange={validateUsername}
                errorBorderColor="red.500"
                bgColor={usernameError ? "red.100" : "#fff"}
              />
              <FormErrorMessage>Max 10 characters</FormErrorMessage>
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
                  errorBorderColor="red.500"
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

            <FormControl mt={4} mb={4} isInvalid={passwordEqualError}>
              <FormLabel>Confirm Password</FormLabel>
              <InputGroup size="md">
                <Input
                  pr="4.5rem"
                  type={passwordShow ? "text" : "password"}
                  placeholder="Enter password"
                  isRequired
                  onChange={validatePasswordEqual}
                  errorBorderColor="red.500"
                  bgColor={passwordEqualError ? "red.100" : "#fff"}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={togglePasswordHandler}>
                    {passwordShow ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>Passwords do not match!</FormErrorMessage>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            {errorState.error && (
              <Text color="red.500" mr={2}>
                {errorState.errorMessage}
              </Text>
            )}
            {!isLoading && (
              <Button colorScheme="green" mr={3} onClick={submitHandler}>
                Create account
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
            <Button onClick={props.onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SignUpModal;
