import { Button, Flex, Box, Icon, Input } from "@chakra-ui/react";
import { IoAddCircle, IoMic } from "react-icons/io5";
import { useRef } from "react";
import { useAppDispatch } from "../../hooks";
import { addMessage } from "../../slices/chatSlice";
const MessageInput = (props: {
  chatId: string;
  userId: string;
  token: string;
}) => {
  const dispatch = useAppDispatch();
  const inputRef: any = useRef();

  async function submitHandler() {
    const message = inputRef.current.value;

    try {
      const result = await fetch("http://localhost:8080/chat/newMessage", {
        method: "POST",
        body: JSON.stringify({
          chatId: props.chatId,
          userId: props.userId,
          message: message,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + props.token,
        },
      });

      const data = await result.json();

      dispatch(addMessage(data.result));
    } catch (error) {
      console.log(error);
    }

    inputRef.current.value = "";
  }
  return (
    <Flex w={"100%"} alignItems={"center"} justifyContent={"center"} gap={2}>
      <Flex alignItems={"center"} justifyContent={"center"} gap={3}>
        <Icon as={IoAddCircle} h={7} w={7} cursor={"pointer"} />
        <Icon as={IoMic} h={7} w={7} cursor={"pointer"} />
      </Flex>

      <Input ref={inputRef} />

      <Button colorScheme="blue" onClick={submitHandler}>
        Send
      </Button>
    </Flex>
  );
};

export default MessageInput;
