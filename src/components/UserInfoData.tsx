import { Button, Flex, Text } from "@chakra-ui/react";
import { useState } from "react";
import PostList from "./Posts/PostList";
import CommentList from "./Posts/CommentList";

const UserInfoData = (props: any) => {
  const [showingData, setShowingData] = useState("none");
  return (
    <>
      <Flex
        alignItems={"center"}
        justifyContent={"center"}
        gap={3}
        mb={3}
        direction={{ base: "column", md: "row" }}
      >
        <Button
          variant={"solid"}
          colorScheme="twitter"
          onClick={() => {
            setShowingData("myPosts");
          }}
        >
          My posts
        </Button>
        <Button
          variant={"solid"}
          colorScheme="twitter"
          onClick={() => {
            setShowingData("likedPosts");
          }}
        >
          Liked posts
        </Button>
        <Button
          variant={"solid"}
          colorScheme="twitter"
          onClick={() => {
            setShowingData("dislikedPosts");
          }}
        >
          Disliked posts
        </Button>
        <Button
          variant={"solid"}
          colorScheme="twitter"
          onClick={() => {
            setShowingData("likedComments");
          }}
        >
          Liked comments
        </Button>
        <Button
          variant={"solid"}
          colorScheme="twitter"
          onClick={() => {
            setShowingData("dislikedComments");
          }}
        >
          Disliked comments
        </Button>
      </Flex>

      {/* data lists */}
      {showingData === "none" && (
        <Text textAlign={"center"} fontWeight={600} color={"gray.800"}>
          Click on one of the menu buttons to see your content and content you
          interacted with
        </Text>
      )}

      {showingData === "myPosts" && <PostList posts={props.userData.posts} />}

      {showingData === "likedPosts" && (
        <PostList posts={props.userData.likedPosts} />
      )}

      {showingData === "dislikedPosts" && (
        <PostList posts={props.userData.dislikedPosts} />
      )}

      {showingData === "likedComments" && (
        <CommentList
          comments={props.userData.likedComments}
          postId=""
          adminMode={true}
        />
      )}

      {showingData === "dislikedComments" && (
        <CommentList
          comments={props.userData.dislikedComments}
          postId=""
          adminMode={true}
        />
      )}
    </>
  );
};

export default UserInfoData;
