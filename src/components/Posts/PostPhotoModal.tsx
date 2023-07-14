import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Image,
  Box,
  Flex,
} from "@chakra-ui/react";
import { useState } from "react";

const PostPhotoModal = (props: {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
}) => {
  const [imageCount, setImageCount] = useState(0);

  function prevHandler() {
    if (imageCount === 0) {
      return;
    }

    setImageCount((prevState) => prevState - 1);
  }

  function nextHandler() {
    if (
      imageCount === 2 ||
      props.images.length === 1 ||
      !props.images[imageCount + 1]
    ) {
      return;
    }

    setImageCount((prevState) => prevState + 1);
  }

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} size={"4xl"}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalHeader></ModalHeader>
        <ModalBody>
          <Box mb={5}>
            <Image src={props.images[imageCount]} borderRadius="9px" />
          </Box>

          <Flex alignItems={"center"} justifyContent={"space-between"}>
            <Button
              variant={"solid"}
              colorScheme="gray"
              onClick={prevHandler}
              visibility={imageCount !== 0 ? "visible" : "hidden"}
            >
              Prev
            </Button>

            <Button
              variant={"solid"}
              colorScheme="gray"
              onClick={nextHandler}
              visibility={imageCount !== 2 ? "visible" : "hidden"}
            >
              Next
            </Button>
          </Flex>
        </ModalBody>

        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PostPhotoModal;
