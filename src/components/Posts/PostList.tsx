import { List, ListItem, Center } from "@chakra-ui/react";
import Post from "./Post";
interface IProps {
  posts: IPost[];
}

interface IPost {
  title: string;
  content: string;
  likes: number;
  dislikes: number;
  favourites: number;
  author: string;
  images: string[];
  _id: string;
  comments: string[];
  authorEmail: string;
}

const PostList = (props: IProps) => {
  return (
    <Center>
      <List spacing={"4"}>
        {props.posts.map((post: IPost) => {
          return (
            <ListItem key={post._id}>
              <Post
                authorEmail={post.authorEmail}
                _id={post._id}
                comments={post.comments}
                title={post.title}
                content={post.content}
                likes={post.likes}
                dislikes={post.dislikes}
                favourites={post.favourites}
                author={post.author}
                images={post.images}
              />
            </ListItem>
          );
        })}
      </List>
    </Center>
  );
};

export default PostList;
