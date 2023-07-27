import { List, ListItem, Divider, Text } from "@chakra-ui/react";
import ChatItem from "./ChatItem";
import { useEffect } from "react";
import { getChatData } from "../../slices/chatSlice";
import { useAppSelector, useAppDispatch } from "../../hooks";

const ChatItemList = () => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.auth.userId);
  const token = useAppSelector((state) => state.auth.token);
  const chatList = useAppSelector((state) => state.chat.chatList);

  useEffect(() => {
    dispatch(getChatData(userId, token));
  }, []);

  return (
    <List w={"100%"} h={"40rem"} overflowY={"scroll"}>
      {chatList.map((e) => (
        <ListItem key={e._id}>
          <ChatItem partisipants={e.partisipantUsernames} _id={e._id} />
        </ListItem>
      ))}

      {chatList.length === 0 && (
        <Text>No chats. Start chating with users now!</Text>
      )}
    </List>
  );
};

export default ChatItemList;
