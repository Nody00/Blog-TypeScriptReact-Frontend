import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Input,
  Button,
  Flex,
  InputGroup,
  InputLeftElement,
  Hide,
} from "@chakra-ui/react";
import { AiOutlineSearch } from "react-icons/ai";
import ChatItemList from "./ChatItemList";
import Chat from "./Chat";
import { useState } from "react";

const ChatModal = (props: { isOpen: boolean; onClose: () => void }) => {
  const [isChat, setIsChat] = useState(false);

  return (
    <Drawer
      isOpen={props.isOpen}
      placement="right"
      onClose={props.onClose}
      size={"full"}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>{isChat ? "" : "Messages"}</DrawerHeader>

        <DrawerBody>
          {!isChat && (
            <InputGroup mb={5}>
              <InputLeftElement pointerEvents="none">
                <AiOutlineSearch w={8} h={8} />
              </InputLeftElement>

              <Input placeholder="Search users" />
            </InputGroup>
          )}

          <Flex alignItems={"center"} w={"100%"}>
            <Hide below="lg">
              <ChatItemList isMobile={false} />
            </Hide>
            <Chat />

            {/* mobile chat menu */}
          </Flex>
        </DrawerBody>

        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={props.onClose}>
            Exit messenger
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ChatModal;
