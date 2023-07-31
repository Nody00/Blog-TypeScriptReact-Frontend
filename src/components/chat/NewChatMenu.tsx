import {
  Card,
  CardHeader,
  Flex,
  Heading,
  CardBody,
  CardFooter,
  Button,
  List,
  ListItem,
  Text,
  Avatar,
  useToast,
} from "@chakra-ui/react";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { getUsersList } from "../../slices/chatSlice";
import { useEffect } from "react";
const NewChatMenu = (props: { onClose: () => void }) => {
  const email = useAppSelector((state) => state.auth.email);
  const token = useAppSelector((state) => state.auth.token);
  const userList = useAppSelector((state) => state.chat.userList);
  const dispatch = useAppDispatch();
  const toast = useToast();

  async function newChatHandler(userEmail: string) {
    try {
      const result = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL || "http://localhost:8080"
        }/chat/newChat`,
        {
          method: "POST",
          body: JSON.stringify({
            userEmail1: email,
            userEmail2: userEmail,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );

      const data = await result.json();

      if (data.error) {
        throw data.errorObject;
      }

      console.log(data);
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }

  useEffect(() => {
    dispatch(getUsersList(token));
  }, []);
  return (
    <Card maxWidth={"lg"} minW={{ base: "auto", md: "md" }} mb={5}>
      <CardHeader>
        <Flex gap="3">
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <Heading size={"md"}>Start a new chat</Heading>
          </Flex>
        </Flex>
      </CardHeader>

      <CardBody pb={0} pt={0}>
        <Text>Existing users: </Text>
        <List w={"100%"} mt={2} spacing={4}>
          {userList.map((e) => {
            if (e.email === email) {
              return null;
            }

            return (
              <ListItem
                key={e._id}
                w={"100%"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Flex alignItems={"center"} justifyContent={"center"} gap={2}>
                  <Avatar name={e.username} />
                  <Text fontWeight={600}>{e.username}</Text>
                </Flex>

                <Button
                  colorScheme="green"
                  variant={"solid"}
                  size={"sm"}
                  onClick={() => {
                    newChatHandler(e.email);
                  }}
                >
                  Chat
                </Button>
              </ListItem>
            );
          })}
          {/* <ListItem
            w={"100%"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Flex alignItems={"center"} justifyContent={"center"} gap={2}>
              <Avatar name="nodi" />
              <Text fontWeight={600}>Nodi</Text>
            </Flex>

            <Button colorScheme="green" variant={"solid"} size={"sm"}>
              Chat
            </Button>
          </ListItem> */}
        </List>
      </CardBody>

      <CardFooter
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Button
          //   isDisabled={!isAuth}
          colorScheme="green"
          variant={"solid"}
          //   type="submit"
          onClick={props.onClose}
        >
          Close
        </Button>
      </CardFooter>
    </Card>
  );
};

export default NewChatMenu;
