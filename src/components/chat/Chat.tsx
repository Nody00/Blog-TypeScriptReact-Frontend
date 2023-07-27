import { Box, Flex, Text, Icon, Avatar, AvatarGroup } from "@chakra-ui/react";
import { IoCallSharp, IoVideocam, IoMenu, IoChatbox } from "react-icons/io5";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { useAppSelector } from "../../hooks";

const Chat = () => {
  const chatData: any = useAppSelector((state) => state.chat.chatData);
  const chatMode = useAppSelector((state) => state.chat.chatMode);
  const userId = useAppSelector((state) => state.auth.userId);
  const token = useAppSelector((state) => state.auth.token);

  if (!chatMode) {
    return (
      <Flex
        alignItems={"center"}
        justifyContent={"flex-start"}
        direction={"column"}
        mt={40}
      >
        <Text fontWeight={600}>Start chatting with your friends!</Text>
        <Icon as={IoChatbox} h={10} w={10} />
      </Flex>
    );
  }

  console.log(chatData);

  return (
    <Flex
      direction={"column"}
      alignItems={"flex-start"}
      justifyContent={"space-between"}
      ml={5}
    >
      <Flex alignItems={"center"} justifyContent={"space-between"} w={"100%"}>
        <Flex alignItems={"center"} justifyContent={"center"} gap={2}>
          <AvatarGroup max={2}>
            <Avatar name={chatData.partisipantUsernames[0]} />
            <Avatar name={chatData.partisipantUsernames[1]} />
          </AvatarGroup>
          <Text fontWeight={600}>{chatData.partisipantUsernames[0]}</Text>
          <Text fontWeight={600} opacity={0.5}>
            and
          </Text>
          <Text fontWeight={600}>{chatData.partisipantUsernames[1]}</Text>
        </Flex>

        <Flex alignItems={"center"} justifyContent={"center"} gap={6}>
          <Icon as={IoCallSharp} h={6} w={6} cursor={"pointer"} />
          <Icon as={IoVideocam} h={6} w={6} cursor={"pointer"} />
          <Icon as={IoMenu} h={6} w={6} cursor={"pointer"} />
        </Flex>
      </Flex>

      <Box w={"100%"} h={"100%"} borderRadius={"9px"} p={2} mt={2}>
        <MessageList messageData={chatData.messages} />
      </Box>

      <MessageInput chatId={chatData._id} userId={userId} token={token} />
    </Flex>
  );
};

export default Chat;
