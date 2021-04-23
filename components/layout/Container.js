import { Flex } from "@chakra-ui/core";

import Splash from "../splash/Splash";
import Background from "../background/Background";

const Container = ({ children }) => (
  <Flex flexDirection="column" minHeight="100vh">
    <Splash />
    <Background />
    {children}
  </Flex>
);

export default Container;
