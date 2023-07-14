import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import Layout from "./layout/Layout";
import { Provider } from "react-redux";
import { store } from "./store.ts";
import HomePage from "./pages/HomePage.tsx";
import PostPage from "./pages/PostPage.tsx";
import { loader as postPageLoader } from "./pages/PostPage.tsx";
import { loader as homePageLoader } from "./pages/HomePage.tsx";
import UserAdminPage from "./pages/UserAdminPage.tsx";
import { loader as UserAdminPageLoader } from "./pages/UserAdminPage.tsx";

const theme = extendTheme({
  fonts: {
    heading: `'Rubik', sans-serif`,
    body: `'Rubik', sans-serif`,
  },
});

export default theme;

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
        loader: homePageLoader,
      },
      {
        path: "post/:postId",
        element: <PostPage />,
        loader: postPageLoader,
      },
      {
        path: "/userAdminPage/:userId",
        element: <UserAdminPage />,
        loader: UserAdminPageLoader,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ChakraProvider>
  </React.StrictMode>
);
