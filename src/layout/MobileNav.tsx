import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  List,
  ListItem,
  IconButton,
} from "@chakra-ui/react";
import { FaUserLarge, FaRectangleXmark } from "react-icons/fa6";
import { useAppSelector } from "../hooks";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  openLogin: () => void;
  openLogout: () => void;
  openSignUp: () => void;
}

const MobileNav = (props: IProps) => {
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  // const isAuth = true;
  return (
    <Drawer isOpen={props.isOpen} placement="right" onClose={props.onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader></DrawerHeader>

        <DrawerBody>
          <List
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"flex-start"}
            h={"100%"}
            gap={"1rem"}
            overflowY={"scroll"}
          >
            <ListItem onClick={props.openSignUp}>
              <Button size={"md"} colorScheme="twitter" hidden={isAuth}>
                Sign Up
              </Button>
            </ListItem>
            <ListItem onClick={props.openLogin}>
              <Button size={"md"} colorScheme="twitter" hidden={isAuth}>
                Login
              </Button>
            </ListItem>
            <ListItem hidden={!isAuth}>
              <IconButton
                aria-label="Account settings"
                icon={<FaUserLarge />}
                size={"md"}
                colorScheme="twitter"
              />
            </ListItem>
            <ListItem onClick={props.openLogout} hidden={!isAuth}>
              <Button size={"md"} colorScheme="twitter">
                Logout
              </Button>
            </ListItem>
            <ListItem onClick={props.onClose}>
              <IconButton
                aria-label="Account settings"
                icon={<FaRectangleXmark />}
                size={"md"}
                colorScheme="twitter"
              />
            </ListItem>
          </List>
        </DrawerBody>

        <DrawerFooter></DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileNav;
