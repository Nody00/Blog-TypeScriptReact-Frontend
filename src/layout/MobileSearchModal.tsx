import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
} from "@chakra-ui/react";
import SearchList from "../components/SearchList";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileSearchModal = (props: IProps) => {
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader></ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Input
            type="text"
            size={"md"}
            mt={2}
            mb={2}
            placeholder="Search posts"
          />
          <SearchList />
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default MobileSearchModal;
