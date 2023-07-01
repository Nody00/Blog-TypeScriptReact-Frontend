import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
  Button,
  useToast,
  ModalBody,
  Text,
} from "@chakra-ui/react";
import { useAppDispatch } from "../hooks";
import { signOut } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";
interface LProps {
  isOpen: boolean;
  onClose: () => void;
}

const LogoutModal = (props: LProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  function logoutHandler() {
    dispatch(signOut());

    toast({
      title: "Session ended",
      variant: "left-accent",
      status: "success",
      isClosable: true,
    });
    props.onClose();
    navigate("/");
  }
  return (
    <>
      <Modal isOpen={props.isOpen} onClose={props.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Logout</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Text>Are you sure you want to logout?</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={logoutHandler}>
              Logout
            </Button>
            <Button onClick={props.onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default LogoutModal;
