import HomePageHero from "../components/HomePageHero";
import { Flex } from "@chakra-ui/react";
const HomePage = () => {
  return (
    <Flex
      alignItems={"center"}
      justifyContent={"flex-start"}
      w={"100%"}
      h={"100vh"}
      direction={"column"}
      pr={2}
      pl={2}
    >
      <HomePageHero />
      {/* big add post form */}
      {/*other posts posts */}
    </Flex>
  );
};

export default HomePage;
