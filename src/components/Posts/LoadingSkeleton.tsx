import { Flex, Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/react";

const LoadingSkeleton = () => {
  return (
    <Flex
      padding={4}
      // w={"30rem"}
      maxW={"lg"}
      direction={"column"}
      gap={10}
      mb={5}
      bgColor={"#fff"}
      borderRadius={"12px"}
    >
      <SkeletonCircle />
      <SkeletonText height={"20px"} />
      <SkeletonText height={"20px"} />
      <Skeleton h={"200px"} />
      <Flex alignItems={"center"} justifyContent={"space-between"}>
        <Skeleton h={"40px"} w={"100px"} borderRadius={"9px"} />
        <Skeleton h={"40px"} w={"100px"} borderRadius={"9px"} />
        <Skeleton h={"40px"} w={"100px"} borderRadius={"9px"} />
      </Flex>
    </Flex>
  );
};

export default LoadingSkeleton;
