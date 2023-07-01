import { Box, Button } from "@chakra-ui/react";
import SearchList from "../components/SearchList";
interface IProps {
  onClose: () => void;
}

const SearchDropDown = (props: IProps) => {
  return (
    <Box
      position={"absolute"}
      bgColor={"#fff"}
      w={"100%"}
      mt={"0.3rem"}
      borderRadius={"9px"}
      border={"2px solid"}
      borderColor={"blue.500"}
      zIndex={10}
      p={1}
    >
      <Box p={5}>
        <SearchList />
      </Box>

      {/* close button */}
      <Box textAlign={"right"}>
        <Button colorScheme="blue" onClick={props.onClose}>
          Close
        </Button>
      </Box>
    </Box>
  );
};

export default SearchDropDown;
