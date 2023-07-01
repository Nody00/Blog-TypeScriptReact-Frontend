import { List, ListItem } from "@chakra-ui/react";
import SearchPost from "./SearchPost";
const SearchList = () => {
  return (
    <List overflowY={"scroll"} h={"20rem"}>
      <ListItem>
        <SearchPost />
      </ListItem>
      <ListItem>
        <SearchPost />
      </ListItem>
      <ListItem>
        <SearchPost />
      </ListItem>
      <ListItem>
        <SearchPost />
      </ListItem>
      <ListItem>
        <SearchPost />
      </ListItem>
      <ListItem>
        <SearchPost />
      </ListItem>
    </List>
  );
};

export default SearchList;
