import { Flex, Box, Text, Avatar, AvatarGroup } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getChatInfo, chatModeOn } from "../../slices/chatSlice";
interface IProps {
  partisipants: string[];
  _id: string;
}

const ChatItem = (props: IProps) => {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.token);

  function getChatData() {
    dispatch(getChatInfo(props._id, token));
  }
  return (
    <Flex
      w={"100%"}
      _hover={{ bgColor: "#f1f3f5", cursor: "pointer" }}
      pr={2}
      onClick={getChatData}
    >
      <Box p={2}>
        {/* <Image
          src="/avatardemo.PNG"
          w={"4rem"}
          h={"4rem"}
          borderRadius={"1000px"}
        /> */}
        <AvatarGroup size={"md"} max={2}>
          <Avatar name={props.partisipants[0]} size={"sm"} />
          <Avatar name={props.partisipants[1]} size={"sm"} />
        </AvatarGroup>
      </Box>

      <Flex
        direction={"column"}
        w={"80%"}
        alignContent={"center"}
        justifyContent={"center"}
      >
        <Flex
          alignItems={"center"}
          justifyContent={"flex-start"}
          gap={2}
          w={"100%"}
        >
          <Text fontWeight={600} fontSize={"sm"}>
            {props.partisipants[0]}
          </Text>
          <Text fontWeight={600} fontSize={"sm"} opacity={0.5}>
            and
          </Text>
          <Text fontWeight={600} fontSize={"sm"}>
            {props.partisipants[1]}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ChatItem;
