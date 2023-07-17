import { Box, Grid } from "@chakra-ui/react";
import UserInfoCard from "../components/UserInfoCard";
import { LoaderFunction, useLoaderData } from "react-router-dom";
import UserInfoData from "../components/UserInfoData";

// interface IPost {
//   title: string;
//   content: string;
//   likes: number;
//   dislikes: number;
//   favourites: number;
//   author: string;
//   images: string[];
//   _id: string;
//   comments: string[];
//   authorEmail: string;
//   likedBy: {
//     [userId: string]: string;
//   };
//   dislikedBy: {
//     [userId: string]: string;
//   };
// }

// interface IComment {
//   author: string;
//   post: string;
//   content: string;
//   likes: number;
//   dislikes: number;
//   _id: string;
// }

const UserAdminPage = () => {
  const userData: any = useLoaderData();

  return (
    <Box h={"500vh"}>
      <Grid
        gridTemplateColumns={{ base: "1fr", md: "1fr" }}
        gridColumnGap={5}
        gridRowGap={{ base: 5, md: 0 }}
        mb={5}
      >
        <UserInfoCard email={userData.email} />
      </Grid>

      <UserInfoData userData={userData} />

      {/* post stuff */}
    </Box>
  );
};

export default UserAdminPage;

// load user profile and populate all the fields you need

export async function loader({ params }) {
  try {
    const result = await fetch(
      `${
        import.meta.env.VITE_BACKEND_URL || "http://localhost:8080"
      }/post/getData/` + params.userId
    );

    const data = await result.json();

    return data;
  } catch (error) {
    console.log(error);
  }

  return {};
}
