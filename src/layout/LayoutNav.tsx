import { Flex, Button, IconButton, Hide, Icon } from "@chakra-ui/react";
import { FaUserLarge, FaBars } from "react-icons/fa6";
import { AiOutlineSearch } from "react-icons/ai";
import { useState } from "react";
import LoginModal from "./LoginModal";
import LogoutModal from "./LogoutModal";
import MobileNav from "./MobileNav";
import SignUpModal from "./SignUpModal";
import MobileSearchModal from "./MobileSearchModal";
import { useAppSelector } from "../hooks";

const LayoutNav = () => {
  const [loginModal, setLoginModal] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);
  const [isMobileNav, setIsMobileNav] = useState(false);
  const [signUpModal, setSignUpModal] = useState(false);
  const [mobileSearch, setMobileSearch] = useState(false);

  const isAuth = useAppSelector((state) => state.auth.isAuth);

  function hideMobileSearch() {
    setMobileSearch(false);
  }

  function showMobileSearch() {
    setIsMobileNav(false);
    setMobileSearch(true);
  }

  function hideSignUpModalHandler() {
    setSignUpModal(false);
  }

  function showSignUpModalHandler() {
    setIsMobileNav(false);
    setSignUpModal(true);
  }

  function hideLoginModalHandler() {
    setLoginModal(false);
  }
  function showLoginModalHandler() {
    setIsMobileNav(false);
    setLoginModal(true);
  }

  function hideLogoutModalHandler() {
    setLogoutModal(false);
  }
  function showLogoutModalHandler() {
    setIsMobileNav(false);
    setLogoutModal(true);
  }

  function hideMobileNavHandler() {
    setIsMobileNav(false);
  }
  function showMobileNavHandler() {
    setIsMobileNav(true);
  }

  return (
    <>
      <Flex
        hideBelow={"md"}
        alignItems={"center"}
        justifyContent={"center"}
        gap={"0.5rem"}
      >
        <Button
          size={"xs"}
          colorScheme="twitter"
          hidden={isAuth}
          onClick={showSignUpModalHandler}
        >
          Sign Up
        </Button>

        <Button
          size={"xs"}
          colorScheme="twitter"
          onClick={showLoginModalHandler}
          hidden={isAuth}
        >
          Login
        </Button>

        {isAuth && (
          <IconButton
            aria-label="Account settings"
            icon={<FaUserLarge />}
            size={"xs"}
            colorScheme="twitter"
          />
        )}
        <Button
          size={"xs"}
          colorScheme="twitter"
          onClick={showLogoutModalHandler}
          hidden={!isAuth}
        >
          Logout
        </Button>
      </Flex>
      {/* mobile search */}

      <Hide above="md">
        <Icon
          as={AiOutlineSearch}
          h={5}
          w={5}
          color={"#fff"}
          cursor={"pointer"}
          onClick={showMobileSearch}
        />
      </Hide>

      {/* Mobile nav button */}
      <Hide above="md">
        <Icon
          as={FaBars}
          h={5}
          w={5}
          color={"#fff"}
          cursor={"pointer"}
          onClick={showMobileNavHandler}
        />
      </Hide>

      <LogoutModal isOpen={logoutModal} onClose={hideLogoutModalHandler} />
      <LoginModal isOpen={loginModal} onClose={hideLoginModalHandler} />
      <MobileNav
        isOpen={isMobileNav}
        onClose={hideMobileNavHandler}
        openLogin={showLoginModalHandler}
        openLogout={showLogoutModalHandler}
        openSignUp={showSignUpModalHandler}
      />
      <SignUpModal isOpen={signUpModal} onClose={hideSignUpModalHandler} />
      <MobileSearchModal isOpen={mobileSearch} onClose={hideMobileSearch} />
    </>
  );
};

export default LayoutNav;
