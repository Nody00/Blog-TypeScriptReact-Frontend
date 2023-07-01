import { Heading, ScaleFade, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
const HomePageHero = () => {
  const [isHero, setIsHero] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setIsHero(true);
    }, 2000);
  }, []);
  return (
    <ScaleFade initialScale={0.9} in={isHero}>
      <Heading
        fontSize={{ base: "3rem", sm: "5rem", md: "6rem", lg: "10rem" }}
        lineHeight={0.9}
        letterSpacing={0.9}
        mb={5}
      >
        The Development Blog
      </Heading>
      <Text
        fontSize={{ base: "1rem", sm: "1.6rem", md: "1.9rem", lg: "2rem" }}
        opacity={0.6}
      >
        Share your development experience with other developers
      </Text>
    </ScaleFade>
  );
};

export default HomePageHero;
