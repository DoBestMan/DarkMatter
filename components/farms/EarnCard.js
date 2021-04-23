import PropTypes from "prop-types";
import { useWallet } from "use-wallet";

import { useContracts } from "../../hooks/useContracts";
import { isWalletConnected } from "../../lib/wallet";
import { formatNumber } from "../../lib/numeric";

import {
  Flex,
  Box,
  Stat,
  StatLabel,
  StatNumber,
  Heading,
  Button,
  useStyleConfig,
} from "@chakra-ui/core";

import InlineSpinner from "../spinners/Inline";

import config from "./config";

const EarnCard = ({
  farmId,
  isApproved,
  depositAmount,
  earnedAmount,
  isHarvesting,
  setIsHarvesting,
}) => {
  const wallet = useWallet();
  const { dmtStaking } = useContracts();

  const primaryBtnStyles = useStyleConfig("Button", { variant: "primary" });
  
  const opacity = isApproved && depositAmount ? 1 : 0.2;

  const handleHarvestClick = () => {
    if (
      !earnedAmount || 
      !isWalletConnected(wallet) || 
      !wallet.ethereum
    ) {
      return;
    }

    dmtStaking.getReward()
      .then(_ => {
        setIsHarvesting(true);
      })
      .catch(_ => {});
  };

  const {
    titleCopy,
    earnIcon: EarnIcon,
    estimatedCopy,
    harvestBtnCopy,
  } = config[farmId].earnCard;

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
        <InlineSpinner
          isLoading={isHarvesting}
          message="Harvesting..."
          minHeight="23.125rem"
        >
          <Heading 
            size="lg" 
            paddingX={4}
            paddingBottom={6}
            textAlign="center"
            lineHeight="base"
            opacity={opacity}
          >
            {titleCopy}
          </Heading>
          <Box textAlign="center" opacity={opacity}>
            <EarnIcon />
          </Box>
          <Stat paddingTop={8} opacity={opacity}>
            <StatLabel fontSize="xl" textAlign="center" color="gray.400">{estimatedCopy}</StatLabel>
            <StatNumber textAlign="center">{formatNumber(earnedAmount, 5)}</StatNumber>
          </Stat>
          <Flex
            paddingTop="4.4375rem"
            paddingX={4}
          >
            <Button
              sx={primaryBtnStyles}
              flexGrow="1"
              disabled={!earnedAmount || isHarvesting}
              onClick={handleHarvestClick}
            >
              {harvestBtnCopy}
            </Button>
          </Flex>
        </InlineSpinner>
      </Box>
    </Box>
  );
};

EarnCard.propTypes = {
  farmId: PropTypes.string.isRequired,
  isApproved: PropTypes.bool.isRequired,
  depositAmount: PropTypes.number,
  earnedAmount: PropTypes.number,
  isHarvesting: PropTypes.bool.isRequired,
  setIsHarvesting: PropTypes.func.isRequired,
};

export default EarnCard;
