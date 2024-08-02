import React from "react";
import { Button } from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";
import { useColorMode } from "@chakra-ui/react";

const ToggleColorModeButton = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Button
      onClick={toggleColorMode}
      variant="outline"
      colorScheme="teal"
      size="lg"
      position="fixed"
      top="2rem"
      right="2rem"
      zIndex="10" 
      boxShadow="md" 
      borderRadius="full" 
      _hover={{ boxShadow: "lg" }} 
      _active={{ boxShadow: "xl" }} 
      leftIcon={colorMode === "light" ? <FaMoon /> : <FaSun />}
    >
      {colorMode === "light" ? "Dark Mode" : "Light Mode"}
    </Button>
  );
};

export default ToggleColorModeButton;
