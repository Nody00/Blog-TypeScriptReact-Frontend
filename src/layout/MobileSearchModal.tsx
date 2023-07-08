import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  useToast,
} from "@chakra-ui/react";
import SearchList from "../components/SearchList";
import { useState } from "react";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

interface responseData {
  result: IPostData[];
  error: boolean;
  errorObject: {
    message: string;
    statusCode: number;
  };
}

interface IPostData {
  _id: string;
  likes: number;
  dislikes: number;
  title: string;
  content: string;
  images: string[];
  authorEmail: string;
  author: string;
}

const MobileSearchModal = (props: IProps) => {
  const toast = useToast();
  const [responseDataState, setResponseDataState] = useState<IPostData[]>([]);

  async function searchHandler(e: { target: HTMLInputElement }) {
    try {
      const response = await fetch("http://localhost:8080/post/search", {
        method: "POST",
        body: JSON.stringify({
          filter: e.target.value,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const responseData: responseData = await response.json();

      if (responseData.error) {
        throw new Error(responseData.errorObject.message);
      }

      // responseData.results will be the posts

      setResponseDataState([...responseData.result]);
    } catch (error: any) {
      toast({
        duration: 5000,
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
        <ModalBody pb={6}>
          <Input
            type="text"
            size={"md"}
            mt={2}
            mb={2}
            placeholder="Search posts"
            onChange={searchHandler}
          />
          <SearchList onClose={props.onClose} posts={responseDataState} />
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default MobileSearchModal;
