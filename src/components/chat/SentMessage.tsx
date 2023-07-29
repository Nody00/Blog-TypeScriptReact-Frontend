import { ListItem, Text } from "@chakra-ui/react";
const SentMessage = (props: { text: string }) => {
  return (
    <ListItem maxW={"30%"} alignSelf={"flex-end"}>
      <Text
        p={2}
        bgColor={"#1c7ed6"}
        color="#fff"
        w={"100%"}
        borderRadius={"9px"}
      >
        {props.text}
      </Text>
    </ListItem>
  );
};

export default SentMessage;
