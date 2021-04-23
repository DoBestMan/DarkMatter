import {
  Box, 
  Flex, 
  List, 
  ListItem, 
  Link, 
  Icon,
  useStyleConfig,
  useBreakpointValue,
} from "@chakra-ui/core";

import { FaMedium, FaTwitter, FaTelegramPlane } from "react-icons/fa";

import YtslaLogoIcon from "../icons/YtslaLogoIcon";
import EtherscanIcon from "../icons/Etherscan";
import UniswapLogoIcon from "../icons/UniswapLogoIcon";
import OpenseaLogoIcon from "../icons/OpenseaLogoIcon";

import _map from "lodash/map";

const linkPaddingConfig = {
  default: "0.5625rem 0.5625rem 0.5rem 0.5625rem",
  yTSLA: "0.5rem 0.4375rem 0.3125rem 0.4375rem",
  uniswap: "0.3125rem 0.4375rem 0.5rem 0.4375rem",
  opensea: "0.5625rem 0.5rem 0.4375rem 0.5rem",
};

const Footer = () => {
  const linkIconStyles = useStyleConfig("Link", { variant: "icon-only" });
  const showFullFooter = useBreakpointValue({ base: false, sm: true });

  const renderLinksList = () => {
    const linksList = _map(
      [
        { to: "https://medium.com/@memeytsla", title: "Medium", icon: () => <Icon as={FaMedium} sx={linkIconStyles} width="1.625rem" height="1.625rem" /> },
        { to: "https://twitter.com/yTSLAFi", title: "Twitter", icon: () => <Icon as={FaTwitter} sx={linkIconStyles} width="1.625rem" height="1.625rem" /> },
        { to: "https://t.me/yTSLA_lounge", title: "Telegram", icon: () => <Icon as={FaTelegramPlane} sx={linkIconStyles} width="1.625rem" height="1.625rem" /> },
        { id: "yTSLA", to: "https://www.ytsla.finance/", title: "yTSLA", icon: () => <YtslaLogoIcon sx={linkIconStyles} width="1.875rem" height="1.875rem" /> },
        { id: "uniswap", to: "https://app.uniswap.org/#/swap?inputCurrency=0x79126d32a86e6663f3aaac4527732d0701c1ae6c&outputCurrency=ETH", title: "Uniswap", icon: () => <UniswapLogoIcon sx={linkIconStyles} width="1.875rem" height="1.875rem" /> },
        { id: "opensea", to: "https://opensea.io/collection/dark-matter", title: "Dark Matter Ltd OpenSea Marketplace", icon: () => <OpenseaLogoIcon sx={linkIconStyles} width="1.75rem" height="1.75rem" /> },
        { to: "https://etherscan.io/address/0x79126d32a86e6663f3aaac4527732d0701c1ae6c", title: "DMT Contract", icon: () => <EtherscanIcon sx={linkIconStyles} width="1.625rem" height="1.625rem" /> },
      ],
      ({ id, to, title, icon: LinkIcon }, index) => {
        const linkPadding = linkPaddingConfig[id] || linkPaddingConfig.default;

        return (
          <ListItem key={`item${index}`} paddingX={1}>
            <Link 
              href={to} 
              title={title} 
              display="block" 
              padding={linkPadding}
              isExternal
            >
              {<LinkIcon />}
            </Link>
          </ListItem>
        );
      }
    );

    if (!showFullFooter) linksList.pop();

    return linksList;
  };

  return (
    <Box as="footer" flex="none" backgroundColor="blackAlpha.400">
      <Flex 
        margin="0 auto" 
        width="100%" 
        maxWidth="70rem" 
        padding="1rem 0" 
        alignItems="center" 
        justifyContent="center"
      >
        <List display="flex">{renderLinksList()}</List>
      </Flex>
    </Box>
  );
};

export default Footer;
