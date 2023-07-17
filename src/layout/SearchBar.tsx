import { Input, Box, Portal, useToast } from "@chakra-ui/react";
import SearchDropDown from "./SearchDropDown";
import { useState } from "react";

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

const SearchBar = () => {
  const toast = useToast();
  const [dropDown, setDropDown] = useState(false);
  const [responseDataState, setResponseDataState] = useState<IPostData[]>([]);

  function showDropDownHandler() {
    setDropDown(true);
  }
  function hideDropDownHandler() {
    setDropDown(false);
  }

  async function searchHandler(e: { target: HTMLInputElement }) {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL || "http://localhost:8080"
        }/post/search`,
        {
          method: "POST",
          body: JSON.stringify({
            filter: e.target.value,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

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
    <Box w={"50%"} position={"relative"}>
      <Input
        placeholder="Search posts"
        size={"sm"}
        hideBelow={"md"}
        w={"100%"}
        variant={"filled"}
        borderRadius={"9px"}
        bg={"#fff"}
        focusBorderColor="#1971c2"
        _focus={{ bg: "#fff" }}
        _hover={{ bg: "#e9ecef" }}
        onFocus={showDropDownHandler}
        onChange={searchHandler}
      />
      {dropDown && (
        <SearchDropDown
          posts={responseDataState}
          onClose={hideDropDownHandler}
        />
      )}
      {dropDown && (
        <Portal>
          <Box
            w={"100%"}
            h={"100vh"}
            bgColor={"#000"}
            opacity={0.5}
            onClick={hideDropDownHandler}
          />
        </Portal>
      )}
    </Box>
  );
};

export default SearchBar;
