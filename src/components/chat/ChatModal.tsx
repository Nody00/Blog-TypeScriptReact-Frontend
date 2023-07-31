import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  // Input,
  Button,
  Flex,
  // InputGroup,
  // InputLeftElement,
  Hide,
} from "@chakra-ui/react";
// import { AiOutlineSearch } from "react-icons/ai";
import ChatItemList from "./ChatItemList";
import Chat from "./Chat";
import { useState } from "react";
import ChatListMobileDrawer from "./ChatListMobileDrawer";

const ChatModal = (props: { isOpen: boolean; onClose: () => void }) => {
  const [mobileDrawer, setMobileDrawer] = useState(false);
  return (
    <Drawer
      isOpen={props.isOpen}
      placement="right"
      onClose={props.onClose}
      size={"full"}
      isFullHeight={true}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Messages</DrawerHeader>

        <DrawerBody>
          <Flex alignItems={"center"} justifyContent={"center"}>
            {/* <InputGroup mb={5}>
              <InputLeftElement pointerEvents="none">
                <AiOutlineSearch w={8} h={8} />
              </InputLeftElement>
              <Input placeholder="Search users" size={"sm"} />
            </InputGroup> */}

            <Button
              colorScheme="green"
              display={{ base: "block", lg: "none" }}
              size={"sm"}
              onClick={() => {
                setMobileDrawer(true);
              }}
            >
              User List
            </Button>
          </Flex>

          <Flex alignItems={"center"} w={"100%"} mb={250}>
            <Hide below="lg">
              <ChatItemList isMobile={false} />
            </Hide>
            <Chat />
          </Flex>
        </DrawerBody>

        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={props.onClose}>
            Exit messenger
          </Button>
        </DrawerFooter>
      </DrawerContent>

      <ChatListMobileDrawer
        isOpen={mobileDrawer}
        onClose={() => {
          setMobileDrawer(false);
        }}
      />
    </Drawer>
  );
};

export default ChatModal;
