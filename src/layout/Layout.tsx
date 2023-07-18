import { Box, Flex, Text, Link, Icon, keyframes } from "@chakra-ui/react";

import { Outlet, Link as RouterLink } from "react-router-dom";
import { FaBookOpen } from "react-icons/fa6";
import SearchBar from "./SearchBar";
import LayoutNav from "./LayoutNav";
// import AnimatedBg from "./AnimatedBg";
import { useEffect } from "react";
import { useAppDispatch } from "../hooks";
import { signIn } from "../slices/authSlice";

const Layout = () => {
  const bgKeyframes = keyframes`
  0% {
    background-position: 0%;
  }
  100% {
    background-position: 100%;
  }
  `;
  const bgAnimation = `${bgKeyframes} 4s alternate infinite`;

  const dispatch = useAppDispatch();
  useEffect(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    const userId = localStorage.getItem("userId");
    const expDate = localStorage.getItem("expDate");

    if (!token || !email || !userId || !expDate) {
      return;
    }

    const now = new Date();
    const exp = new Date(expDate);

    if (now > exp) {
      console.log("Hey your token hase expired");
      return;
    }

    dispatch(signIn({ token, userId, email }));
  }, []);
  return (
    <Box overflowY={"hidden"}>
      {/* Layout */}
      <Box bgColor={"#000"} padding={"0.4rem 0"} zIndex={1000}>
        <Flex
          maxW={"1100px"}
          alignItems={"center"}
          justifyContent={"space-between"}
          ml={"auto"}
          mr={"auto"}
          pr={"1.6rem"}
          pl={"1.6rem"}
        >
          <Link as={RouterLink} to="/">
            <Flex
              alignItems={"center"}
              justifyContent={"center"}
              gap={"0.5rem"}
            >
              <Text color={"#fff"} fontSize={{ base: "1.2rem", md: "1.4rem" }}>
                Blog
              </Text>
              <Icon as={FaBookOpen} color={"#fff"} w={6} h={6} />
            </Flex>
          </Link>

          <SearchBar />

          <LayoutNav />
        </Flex>
      </Box>

      {/* Main content */}
      <Box pt={40} position={"relative"}>
        <Box maxW={"1100px"} ml={"auto"} mr={"auto"}>
          {/* <AnimatedBg /> */}
          <Box
            position={"absolute"}
            bg={"linear-gradient(90deg, #ADA4F5, #964DE7, #F8A74D)"}
            bgSize={"300% 300%"}
            top={0}
            left={0}
            h={"100%"}
            w={"100%"}
            zIndex={"-1"}
            animation={bgAnimation}
          ></Box>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
