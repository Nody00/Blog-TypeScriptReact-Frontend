import {
  Heading,
  Box,
  Flex,
  Text,
  Button,
  Icon,
  Input,
} from "@chakra-ui/react";
import { MdEmail } from "react-icons/md";
import UserDeleteProfileModal from "./UserDeleteProfileModal";
import UserChangeEmailModal from "./UserChangeEmailModal";
import UserChangePasswordModal from "./UserChangePasswordModal";
import { useState } from "react";

const UserInfoCard = (props: { email: string }) => {
  const [deleteProfileModal, setDeleteProfileModal] = useState(false);
  const [changeEmailModal, setChangeEmailModal] = useState(false);
  const [changePasswordModal, setChangePasswordModal] = useState(false);

  return (
    <Box p={3} bgColor={"#fff"} borderRadius={"12px"}>
      <Box bgColor={"#f1f3f5"} p={2} borderRadius={"12px"}>
        <Heading mb={5} size={{ base: "md", md: "lg" }}>
          User info and account settings
        </Heading>
        <Flex
          direction={"column"}
          alignItems={"flex-start"}
          justifyContent={"center"}
          gap={5}
        >
          {/* email */}
          <Flex
            alignItems={"center"}
            justifyContent={"space-between"}
            w={"100%"}
            direction={{ base: "column", md: "row" }}
            gap={{ base: 3, md: 0 }}
          >
            <Flex
              gap={2}
              alignItems={"center"}
              justifyContent={"center"}
              direction={{ base: "column", md: "row" }}
            >
              <Box fontWeight={600}>Email</Box>
              <Flex
                alignItems={"center"}
                justifyContent={"center"}
                gap={2}
                bgColor={"gray.200"}
                pt={2}
                pb={2}
                pr={3}
                pl={3}
                borderRadius={"9px"}
              >
                <Icon as={MdEmail} w={6} h={6} />
                <Text>{props.email}</Text>
              </Flex>
            </Flex>
            <Button
              colorScheme="twitter"
              onClick={() => {
                setChangeEmailModal(true);
              }}
            >
              Change email
            </Button>
          </Flex>

          {/* password */}
          <Flex
            alignItems={"center"}
            justifyContent={"space-between"}
            w={"100%"}
            direction={{ base: "column", md: "row" }}
            gap={{ base: 3, md: 0 }}
          >
            <Flex
              gap={2}
              alignItems={"center"}
              justifyContent={"center"}
              direction={{ base: "column", md: "row" }}
            >
              <Box fontWeight={600}>Password</Box>
              <Flex
                alignItems={"center"}
                justifyContent={"center"}
                gap={2}
                bgColor={"gray.200"}
                pt={2}
                pb={2}
                pr={3}
                pl={3}
                borderRadius={"9px"}
              >
                <Icon as={MdEmail} w={6} h={6} />
                <Input type={"password"} value={"passwordpassword"} disabled />
              </Flex>
            </Flex>
            <Button
              colorScheme="twitter"
              onClick={() => {
                setChangePasswordModal(true);
              }}
            >
              Change password
            </Button>
          </Flex>

          {/* delete */}
          <Flex
            alignItems={"center"}
            justifyContent={"space-between"}
            w={"100%"}
          >
            <Box fontWeight={600}>Delete Account</Box>
            <Button
              colorScheme="red"
              onClick={() => {
                setDeleteProfileModal(true);
              }}
            >
              Delete
            </Button>
          </Flex>

          <Text mb={2}>{new Date().toLocaleDateString("en-US")}</Text>
        </Flex>
      </Box>

      <UserDeleteProfileModal
        isOpen={deleteProfileModal}
        onClose={() => {
          setDeleteProfileModal(false);
        }}
      />
      <UserChangeEmailModal
        isOpen={changeEmailModal}
        onClose={() => {
          setChangeEmailModal(false);
        }}
      />
      <UserChangePasswordModal
        isOpen={changePasswordModal}
        onClose={() => {
          setChangePasswordModal(false);
        }}
      />
    </Box>
  );
};

export default UserInfoCard;
