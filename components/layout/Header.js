import {
  Box,
  Flex,
  List,
  Link,
  ListItem,
  useStyleConfig,
  useBreakpointValue,
} from "@chakra-ui/core";

import _map from "lodash/map";

import InternalLink from "../utils/InternalLink";
import LogoLightIcon from "../icons/LogoLight";

import Drawer from "./Drawer";
import CountdownModal from "../countdown/CountdownModal";
import WalletConnectButton from "../wallet/ConnectButton";

const Header = () => {
  const linkStyles = useStyleConfig("Link", { variant: "nav" });
  const shouldRenderDrawer = useBreakpointValue({ base: true, lg: false });

  return (
    <Box as="header" flex="none" backgroundColor="blackAlpha.400">
      <Flex
        margin="0 auto"
        width="100%"
        maxWidth="70rem"
        padding={4}
        alignItems="center"
        justifyContent="space-between"
      >
        {shouldRenderDrawer && <Drawer />}
        <InternalLink href="/" marginX={2}>
          <LogoLightIcon
            color="whiteAlpha.900"
            _hover={{ color: "purple.800" }}
            width="2.75rem"
            height="2.75rem"
            transition="all 0.15s ease-out"
          />
        </InternalLink>
        <Flex as="nav">
          {!shouldRenderDrawer && (
            <List display="flex">
              <ListItem paddingX={1}>
                <InternalLink href="/intro" sx={linkStyles}>
                  Intro
                </InternalLink>
              </ListItem>
              <ListItem paddingX={1}>
                <InternalLink href="/gallery" sx={linkStyles}>
                  Gallery
                </InternalLink>
              </ListItem>
              <ListItem paddingX={1}>
                <InternalLink href="/farms" sx={linkStyles}>
                  Farm
                </InternalLink>
              </ListItem>
              <ListItem paddingX={1}>
                <CountdownModal
                  title="Next ClueX Launches"
                  countTo="2020-11-12T16:00:00.000Z"
                />
              </ListItem>
              <ListItem paddingX={1}>
                <Link href="https://opensea.io/collection/dark-matter" title="Dark Matter Ltd OpenSea Marketplace" sx={linkStyles} isExternal>
                  OpenSea
                </Link>
              </ListItem>
            </List>
          )}
          <WalletConnectButton
            variant="headerNav"
            connectTitle={!shouldRenderDrawer ? "Unlock Wallet" : "Unlock"}
            shouldRenderDrawer={shouldRenderDrawer}
          />
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
