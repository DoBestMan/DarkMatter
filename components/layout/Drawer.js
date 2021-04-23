import {
  useDisclosure,
  useStyleConfig,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Link,
  List,
  ListItem,
} from "@chakra-ui/core";

import { HamburgerIcon } from "@chakra-ui/icons";
import LogoFullIcon from "../icons/LogoFull";

import InternalLink from "../utils/InternalLink";

import _map from "lodash/map";

const placement = "left";

const DrawerComp = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnStyles = useStyleConfig("Button", { variant: "icon-trans" });
  const linkStyles = useStyleConfig("Link", { variant: "drawer-nav" });

  const renderLinksList = () => _map(
    [
      { to: "/", title: "Home" },
      { to: "/intro", title: "Intro" },
      { to: "/gallery", title: "Gallery" },
      { to: "/farms", title: "Farm" },
      { to: "https://opensea.io/collection/dark-matter", title: "OpenSea", isExternal: true, divider: true },
      { to: "https://medium.com/@memeytsla", title: "Medium", isExternal: true },
      { to: "https://twitter.com/yTSLAFi", title: "Twitter", isExternal: true },
      { to: "https://t.me/yTSLA_lounge", title: "Telegram", isExternal: true },
    ],
    ({ to, title, isExternal, divider }, index, collection) => (
      <ListItem 
        key={`item${index}`} 
        borderBottomWidth={divider ? "1px" : "none"} 
        paddingTop={index && collection[index - 1].divider ? 2 : 0} 
        paddingBottom={divider ? 2 : 0}
      >
        {!isExternal
          ? <InternalLink href={to} sx={linkStyles} onClick={onClose}>{title}</InternalLink>
          : <Link href={to} sx={linkStyles} onClick={onClose} isExternal>{title}</Link>
        }
      </ListItem>
    ),
  );

  return (
    <>
      <IconButton aria-label="Open Menu" sx={btnStyles} icon={<HamburgerIcon boxSize={6} />} onClick={onOpen} />
      <Drawer 
        placement={placement} 
        onClose={onClose} 
        isOpen={isOpen} 
        size="xs" 
        isFullHeight={false}
        autoFocus={false}
        returnFocusOnClose={false}
        scrollBehavior="inside"
      >
        <DrawerOverlay background="blackAlpha.800">
          <DrawerContent backgroundColor="gray.900">
            <DrawerCloseButton size="lg" sx={btnStyles} top="12px" />
            <DrawerHeader borderBottomWidth="1px" padding={6}>
              <LogoFullIcon 
                color="whiteAlpha.900" 
                width="6.125rem"
                height="6.125rem"
              />
            </DrawerHeader>
            <DrawerBody px={0} overflowY="auto">
              <List>{renderLinksList()}</List>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  )
};

export default DrawerComp;