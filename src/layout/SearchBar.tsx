import { Input, Box, Portal } from "@chakra-ui/react";
import SearchDropDown from "./SearchDropDown";
import { useState } from "react";
const SearchBar = () => {
  const [dropDown, setDropDown] = useState(false);

  function showDropDownHandler() {
    setDropDown(true);
  }
  function hideDropDownHandler() {
    setDropDown(false);
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
      />
      {dropDown && <SearchDropDown onClose={hideDropDownHandler} />}
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
