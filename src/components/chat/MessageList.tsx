import { List, Box } from "@chakra-ui/react";
import ReceivedMessage from "./ReceivedMessage";
import SentMessage from "./SentMessage";
import { useAppSelector } from "../../hooks";
import { useRef, useEffect } from "react";
const MessageList = (props: { messageData: [] }) => {
  const userId = useAppSelector((state) => state.auth.userId);
  const scrollRef: any = useRef();

  useEffect(() => {
    scrollRef.current.scrollIntoView({ behaviour: "smooth" });
  }, [props.messageData]);

  return (
    <List
      display={"flex"}
      alignItems={"flex-start"}
      justifyContent={"flex-start"}
      flexDirection={"column"}
      h={"60vh"}
      gap={2}
      overflowY={"scroll"}
      pb={2}
      pr={2}
    >
      {props.messageData.map((e: any) => {
        if (e.author === userId) {
          return <SentMessage text={e.text} key={e._id} />;
        }
        return <ReceivedMessage text={e.text} key={e._id} />;
      })}
      {/* <ReceivedMessage text={"DUDE THE PARTY WAS AWESOME LAST NIGHT"} />
      <SentMessage text={"I know it was toats awesome"} /> */}
      <Box ref={scrollRef}></Box>
    </List>
  );
};

export default MessageList;
