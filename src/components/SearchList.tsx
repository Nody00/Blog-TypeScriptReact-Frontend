import { List, ListItem, Text } from "@chakra-ui/react";
import SearchPost from "./SearchPost";
interface IProps {
  posts: IPostData[];
  onClose: () => void;
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

const SearchList = (props: IProps) => {
  return (
    <List overflowY={"scroll"} h={"20rem"}>
      {props.posts.map((post) => (
        <ListItem key={post._id}>
          <SearchPost postData={post} onClose={props.onClose} />
        </ListItem>
      ))}

      {props.posts.length === 0 && <Text>No posts...</Text>}
    </List>
  );
};

export default SearchList;
