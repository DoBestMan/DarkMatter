import { useState } from "react";
import PropTypes from "prop-types";
import { useWallet } from "use-wallet";
import { utils as ethersUtils } from "ethers";
import useInterval from "../../hooks/useInterval";

import _isUndefined from "lodash/isUndefined";

import { useContracts } from "../../hooks/useContracts";
import { 
  isWalletConnected,
  getWalletAddress,
} from "../../lib/wallet";
import { formatNumber, isValidNumber } from "../../lib/numeric";

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
import DepositOptions from "./DepositOptions";

import config from "./config";

const DepositCard = ({ 
  farmId, 
  onApproveClick, 
  isApproved, 
  isApproving, 
  depositAmount,
  isDepositing,
  setIsDepositing,
  isWithdrawing,
  setIsWithdrawing,
}) => {
  const wallet = useWallet();
  const { ytslaToken, dmtToken, dmtStaking } = useContracts();

  const [userTokenBalance, setUserTokenBalance] = useState(null);
  const [totalTokenRewards, setTotalTokenRewards] = useState(null);
  const [usersTotalDepositied, setUsersTotalDepositied] = useState(null);

  const primaryBtnStyles = useStyleConfig("Button", { variant: "primary" });

  useInterval(() => {
    async function updateLiveInfo() {
      if (!isWalletConnected(wallet) || !wallet.ethereum) return;

      if (isApproved) {
        let liveTokenBalance = await ytslaToken.balanceOf(getWalletAddress(wallet));
        let liveTotalTokenRewards = await dmtToken.balanceOf(dmtStaking.address);
        let liveUsersTotalDepositied = await dmtStaking.totalSupply();

        /**
         * Attempt to convert live values to JS safe numeric.
         */
        liveTokenBalance = parseFloat(liveTokenBalance);
        liveTotalTokenRewards = parseFloat(liveTotalTokenRewards);
        liveUsersTotalDepositied = parseFloat(ethersUtils.formatEther(liveUsersTotalDepositied));

        if (!_isUndefined(userTokenBalance)) {
          if (liveTokenBalance !== userTokenBalance) setUserTokenBalance(isValidNumber(liveTokenBalance) ? liveTokenBalance : 0);
          if (liveTotalTokenRewards !== totalTokenRewards) setTotalTokenRewards(isValidNumber(liveTotalTokenRewards) ? liveTotalTokenRewards : 0);
          if (liveUsersTotalDepositied !== usersTotalDepositied) setUsersTotalDepositied(isValidNumber(liveUsersTotalDepositied) ? liveUsersTotalDepositied : 0);
        }
      }
    }

    updateLiveInfo().catch(console.log);
  }, 2000);

  const opacity = isApproved ? 1 : 0.2;

  const {
    titleCopy,
    depositIcon: DepositIcon,
    stakedCopy,
    approveBtnCopy,
  } = config[farmId].depositCard;

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
          isLoading={isApproving}
          message="Approving..."
          minHeight="23.125rem"
        >
          <Heading
            size="lg"
            paddingX={4}
            paddingBottom={6}
            textAlign="center"
            lineHeight="base"
          >
            {titleCopy}
          </Heading>
          <Box textAlign="center">
            <DepositIcon />
          </Box>
          <Stat paddingTop={8} opacity={opacity}>
            <StatLabel fontSize="xl" textAlign="center" color="gray.400">{stakedCopy}</StatLabel>
            <StatNumber textAlign="center">{formatNumber(depositAmount, 2)}</StatNumber>
          </Stat>
          {!isApproved ? (
            <Flex paddingTop="4.375rem" paddingX={4}>
              <Button
                sx={primaryBtnStyles}
                flexGrow="1"
                onClick={onApproveClick}
              >
                {approveBtnCopy}
              </Button>
            </Flex>
          ) : (
            <DepositOptions
              farmId={farmId} 
              userTokenBalance={userTokenBalance}
              depositAmount={depositAmount}
              isDepositing={isDepositing} 
              setIsDepositing={setIsDepositing}
              isWithdrawing={isWithdrawing} 
              setIsWithdrawing={setIsWithdrawing}
              totalTokenRewards={totalTokenRewards}
              usersTotalDepositied={usersTotalDepositied}
            />
          )}
        </InlineSpinner>
      </Box>
    </Box>
  );
};

DepositCard.propTypes = {
  farmId: PropTypes.string.isRequired,
  onApproveClick: PropTypes.func.isRequired,
  isApproved: PropTypes.bool.isRequired,
  isApproving: PropTypes.bool.isRequired,
  depositAmount: PropTypes.number,
  isDepositing: PropTypes.bool.isRequired,
  setIsDepositing: PropTypes.func.isRequired,
  isWithdrawing: PropTypes.bool.isRequired,
  setIsWithdrawing: PropTypes.func.isRequired,
};

export default DepositCard;
