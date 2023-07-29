import { ListItem, Text } from "@chakra-ui/react";
const ReceivedMessage = (props: { text: string }) => {
  return (
    <ListItem maxW={"30%"}>
      <Text
        p={2}
        bgColor={"#e9ecef"}
        color="#000"
        w={"100%"}
        borderRadius={"9px"}
      >
        {props.text}
      </Text>
    </ListItem>
  );
};

export default ReceivedMessage;
