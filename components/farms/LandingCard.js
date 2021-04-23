import PropTypes from "prop-types";

import { formatNumber } from "../../lib/numeric";

import {
  Flex,
  Box,
  Stat,
  StatLabel,
  StatNumber,
  Text,
  Heading,
  useBreakpointValue,
} from "@chakra-ui/core";

import { ArrowRightIcon } from '@chakra-ui/icons';

import WalletConnectButton from "../wallet/ConnectButton";

import config from "./config";

const TokenBox = ({
  title, 
  icon: Icon, 
  boxPadding, 
  minWidth,
  tokenPriceLabelCopy,
  tokenPrice,
}) => (
  <Box padding={boxPadding} textAlign="center" minWidth={minWidth}>
    <Icon />
    <Text 
      fontSize="lg"
      fontWeight="bold"
      textAlign="center"
      lineHeight="base"
      paddingTop={4}
    >
      {title}
    </Text>
    <Stat paddingTop={8}>
      <StatLabel fontSize="lg" textAlign="center" color="gray.400">{tokenPriceLabelCopy}</StatLabel>
      <StatNumber textAlign="center">{formatNumber(tokenPrice, 2, "...", "$")}</StatNumber>
    </Stat>
  </Box>
);

const LandingCard = ({
  farmId,
  token1Price,
  token2Price,
  apyAmount,
  onUnlockWallet,
}) => {
  const tokenBoxPadding = useBreakpointValue({ base: "1rem", sm: "1.5rem" });

  const {
    titleCopy,
    depositCopy,
    depositIcon,
    earnCopy,
    earnIcon,
    tokenPrice1LabelCopy,
    tokenPrice2LabelCopy,
    walletConnectBtnCopy,
    walletConnectedBtnCopy,
  } = config[farmId].landingCard;

  return (
    <Box width="100%" maxWidth="md" padding={4}>
      <Box
        display="block"
        borderWidth="1px"
        borderRadius="lg"
        backgroundColor="blackAlpha.500"
        paddingTop={8}
        paddingBottom={6}
      >
        <Heading 
          size="lg" 
          paddingX={4}
          paddingBottom={8}
          textAlign="center"
          lineHeight="base"
        >
          {titleCopy}
        </Heading>
        <Flex alignItems="flex-start" justifyContent="center" paddingBottom={8}>
          <TokenBox
            title={depositCopy} 
            icon={depositIcon} 
            boxPadding={`0 0 0 ${tokenBoxPadding}`} 
            minWidth={{ base: "7.5rem", sm: "8.75rem" }} 
            tokenPriceLabelCopy={tokenPrice1LabelCopy}
            tokenPrice={token1Price}
          />
          <ArrowRightIcon 
            color="whiteAlpha.500" 
            width="1.2rem"
            height="1.2rem"
            marginTop="2.1875rem"
            marginX={3}
          />
          <TokenBox 
            title={earnCopy} 
            icon={earnIcon} 
            boxPadding={`0 ${tokenBoxPadding} 0 0`} 
            minWidth={{ base: "7.5rem", sm: "8.75rem" }} 
            tokenPriceLabelCopy={tokenPrice2LabelCopy}
            tokenPrice={token2Price}
          />
        </Flex>
        <Text 
          color="gray.400" 
          fontSize="xl" 
          fontWeight="bold"
          textAlign="center" 
        >
          <Text as="span" color="white">{formatNumber(apyAmount, 2, "...", "", "%")}</Text> APY
        </Text>
        <Flex
          paddingX={4}
          paddingTop={8}
        >
          <WalletConnectButton 
            variant="card" 
            connectTitle={walletConnectBtnCopy} 
            connectedTitle={walletConnectedBtnCopy} 
            onConnected={onUnlockWallet}
          />
        </Flex>
      </Box>
    </Box>
  );
};

LandingCard.propTypes = {
  farmId: PropTypes.oneOf(["yTslaForDMT"]).isRequired,
  token1Price: PropTypes.number,
  token2Price: PropTypes.number,
  apyAmount: PropTypes.number,
  onUnlockWallet: PropTypes.func.isRequired,
};

export default LandingCard;
