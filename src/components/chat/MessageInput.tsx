import { Button, Flex, Icon, Input } from "@chakra-ui/react";
import { IoAddCircle, IoMic } from "react-icons/io5";
import { useRef } from "react";
import { useAppDispatch } from "../../hooks";
import { addMessage } from "../../slices/chatSlice";
import { io } from "socket.io-client";

const MessageInput = (props: {
  chatId: string;
  userId: string;
  token: string;
}) => {
  const dispatch = useAppDispatch();
  const inputRef: any = useRef();
  const socket = io(
    import.meta.env.VITE_BACKEND_URL || "http://localhost:8080"
  );

  socket.on("chat", (data: any) => {
    if (data.action === "newMessage") {
      console.log(data);
      dispatch(addMessage(data.message));
    }
  });

  async function submitHandler() {
    const message = inputRef.current.value;

    try {
      await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL || "http://localhost:8080"
        }/chat/newMessage`,
        {
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
        }
      );

      // const data = await result.json();
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
