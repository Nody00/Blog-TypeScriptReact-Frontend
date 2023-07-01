import { motion } from "framer-motion";
import { Box, keyframes } from "@chakra-ui/react";

const animationKeyframesBlob1 = keyframes`
  0% { transform: scale(1) translateX(0px); }
  25% { transform: scale(1.3) translateX(500px) translateY(100px);  }
  50% { transform: scale(1) translateX(300px) translateY(200px);  }
  75% { transform: scale(1.3) translateX(200px) translateY(300px); }
  100% { transform: scale(1) translateX(0px) translateY(0px);  }
`;

const animationBlob1 = `${animationKeyframesBlob1} 30s ease-in-out infinite`;

const animationKeyframesBlob2 = keyframes`
  0% { transform: scale(1) translateX(0px); }
  25% { transform: scale(1.3) translateX(-600px) translateY(200px);  }
  50% { transform: scale(1) translateX(-400px) translateY(350px);  }
  75% { transform: scale(1.3) translateX(-200px) translateY(300px); }
  100% { transform: scale(1) translateX(0px) translateY(0px);  }
`;

const animationBlob2 = `${animationKeyframesBlob2} 30s 
ease-in-out infinite`;

const animationKeyframesBlob3 = keyframes`
  0% { transform: scale(1) translateX(0px); }
  25% { transform: scale(1.3) translateX(400px) translateY(100px);  }
  50% { transform: scale(1) translateX(250px) translateY(200px);  }
  75% { transform: scale(1.3) translateX(200px) translateY(300px); }
  100% { transform: scale(1) translateX(0px) translateY(0px);  }
`;

const animationBlob3 = `${animationKeyframesBlob3} 35s ease-in-out infinite`;

const AnimatedBg = () => {
  return (
    <>
      <Box
        as={motion.div}
        padding={"5rem 5rem"}
        bg={"#1c7ed6"}
        w={"400px"}
        h={"400px"}
        borderRadius={"1000px"}
        position={"absolute"}
        top={70}
        left={0}
        filter={"blur(80px)"}
        animation={animationBlob1}
        opacity={0.8}
        zIndex={"-1"}
      />
      <Box
        as={motion.div}
        padding={"5rem 5rem"}
        bg={"#748ffc"}
        w={"400px"}
        h={"400px"}
        borderRadius={"1000px"}
        position={"absolute"}
        top={70}
        right={0}
        filter={"blur(80px)"}
        animation={animationBlob2}
        opacity={0.8}
        zIndex={"-1"}
      />
      <Box
        as={motion.div}
        padding={"5rem 5rem"}
        bg={"#7048e8"}
        w={"400px"}
        h={"400px"}
        borderRadius={"1000px"}
        position={"absolute"}
        bottom={0}
        left={0}
        filter={"blur(80px)"}
        animation={animationBlob3}
        opacity={0.8}
        zIndex={"-1"}
      />
    </>
  );
};

export default AnimatedBg;
