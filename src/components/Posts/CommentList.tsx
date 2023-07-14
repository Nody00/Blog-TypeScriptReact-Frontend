import { Button, List, ListItem, Text, ScaleFade } from "@chakra-ui/react";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import { useState } from "react";
const CommentList = (props: {
  comments: object[];
  postId: string;
  adminMode?: boolean;
}) => {
  const [commentForm, setCommentForm] = useState(false);

  function toggleCommentForm() {
    setCommentForm((prevState) => !prevState);
  }
  return (
    <List
      display={"flex"}
      alignItems={"center"}
      justifyContent={"flex-start"}
      flexDirection={"column"}
      minW={{ base: "auto", md: "md" }}
      gap={2}
    >
      {props.comments.length === 0 && (
        <Text fontSize={"lg"} color={"#fff"}>
          No comments found.
        </Text>
      )}

      {!commentForm && !props.adminMode && (
        <Button
          variant={"solid"}
          colorScheme="green"
          onClick={toggleCommentForm}
        >
          Add comment
        </Button>
      )}

      <ScaleFade in={commentForm} initialScale={0.9} unmountOnExit={true}>
        <CommentForm postId={props.postId} toggleForm={toggleCommentForm} />
      </ScaleFade>

      {props.comments.map((comment: any) => (
        <ListItem minW={{ base: "auto", md: "md" }} key={comment._id}>
          <Comment commentData={comment} />
        </ListItem>
      ))}
    </List>
  );
};

export default CommentList;
