import { useState } from "react";
import { useRouter } from "next/router";
import { useWallet } from "use-wallet";
import { utils as ethersUtils } from "ethers";
import useInterval from "../../hooks/useInterval";

import { useContracts } from "../../hooks/useContracts";
import { isWalletConnected, getWalletAddress } from "../../lib/wallet";

import { isValidNumber } from "../../lib/numeric";

import usePageTitle from "../../hooks/usePageTitle";

import { Flex, Box, Heading, Button, useStyleConfig } from "@chakra-ui/core";

import _get from "lodash/get";
import _isUndefined from "lodash/isUndefined";

import FarmDepositCard from "../../components/farms/DepositCard";
import FarmEarnCard from "../../components/farms/EarnCard";

import InlineSpinner from "../../components/spinners/Inline";

import config from "../../components/farms/config";

/**
 * Match URL slug to farm config key.
 * If slug doesn't match, default to yTSLA.
 */
const getFarmId = (slug) => {
  const idMatrix = { ytsla: "yTslaForDMT" };
  const matchedId = idMatrix[slug];

  return matchedId || idMatrix.ytsla;
};

const approvalAmount = 99999;

const Farm = () => {
  const wallet = useWallet();

  const { ytslaToken, dmtStaking } = useContracts();

  const router = useRouter();

  const primaryBtnStyles = useStyleConfig("Button", { variant: "primary" });

  /**
   * Used when navigating from the farms landing view to deactivate the initial spinner.
   */
  const [isCheckingApproved, setIsCheckingApproved] = useState(true);

  /**
   * Polling sets this to true on success.
   */
  const [isApproved, setIsApproved] = useState(false);

  /**
   * If the user fails the initial approval (initialed when navigating from the
   * farms landing view) then use this to control the approving spinner state.
   */
  const [isApproving, setIsApproving] = useState(false);

  /**
   * Total amount of yTSLA staked by the user.
   */
  const [depositAmount, setDepositAmount] = useState(null);

  /**
   * Total amount of DMT earned by the user.
   */
  const [earnedAmount, setEarnedAmount] = useState(null);

  /**
   * Used to hide deposit, withdraw, and harvesting spinners.
   */
  const [prevDepositAmount, setPrevDepositAmount] = useState(null);
  const [isDepositing, setIsDepositing] = useState(false);
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [isHarvesting, setIsHarvesting] = useState(false);
  const [prevEarnedAmount, setPrevEarnedAmount] = useState(null);

  useInterval(() => {
    async function updateLiveInfo() {
      if (!checkWallet()) return;

      /**
       * Check account approval status and fetch staking data.
       */
      const liveAllowance = await ytslaToken.allowance(
        getWalletAddress(wallet),
        dmtStaking.address
      );
      const isLiveApproved = liveAllowance.gt(ethersUtils.parseEther("1"));
      let liveDepositAmount = await dmtStaking.balanceOf(
        getWalletAddress(wallet)
      );
      let liveEarnedAmount = await dmtStaking.earned(getWalletAddress(wallet));

      /**
       * Attempt to convert live values to JS safe numeric.
       */
      liveDepositAmount = parseFloat(
        ethersUtils.formatEther(liveDepositAmount)
      );
      liveEarnedAmount = parseFloat(ethersUtils.formatEther(liveEarnedAmount));

      if (!_isUndefined(isCheckingApproved)) {
        if (isCheckingApproved) setIsCheckingApproved(false);
        if (isLiveApproved !== isApproved) setIsApproved(isLiveApproved);
        if (isLiveApproved) setIsApproving(false);
        if (liveDepositAmount !== depositAmount)
          setDepositAmount(
            isValidNumber(liveDepositAmount) ? liveDepositAmount : 0
          );
        if (liveEarnedAmount !== earnedAmount)
          setEarnedAmount(
            isValidNumber(liveEarnedAmount) ? liveEarnedAmount : 0
          );

        /**
         * Deposit and withdraw spinners.
         */
        if (
          !isDepositing &&
          !isWithdrawing &&
          liveDepositAmount !== prevDepositAmount
        ) {
          /**
           * Safe to update as user does not have a deposit/withdrawal transaction in-flight.
           */
          setPrevDepositAmount(
            isValidNumber(liveDepositAmount) ? liveDepositAmount : 0
          );
        } else if (liveDepositAmount !== prevDepositAmount) {
          /**
           * User has submitted has a deposit transaction (either deposit or withdraw).
           * Disable the spinner if the latest amount differs from the previous amount.
           */
          if (isDepositing) setIsDepositing(false);
          if (isWithdrawing) setIsWithdrawing(false);
        }

        /**
         * Harvesting spinners.
         */
        if (!isHarvesting && liveEarnedAmount !== prevEarnedAmount) {
          /**
           * Safe to update as user does not have a harvest transaction in-flight.
           */
          setPrevEarnedAmount(
            isValidNumber(liveEarnedAmount) ? liveEarnedAmount : 0
          );
        } else if (liveEarnedAmount !== prevEarnedAmount) {
          /**
           * User has submitted has a harvest transaction (either harvest or harvest & withdraw).
           * Disable the spinner if the latest amount differs from the previous amount.
           */
          if (isHarvesting) setIsHarvesting(false);
        }
      }
    }

    updateLiveInfo().catch(console.log);
  }, 2000);

  const farmId = getFarmId(_get(router, "query.farmId"));

  const handleApproveClick = () => {
    ytslaToken
      .approve(
        dmtStaking.address,
        ethersUtils.parseEther(approvalAmount.toString())
      )
      .then((_) => setIsApproving(true))
      .catch((_) => setIsApproving(false));
  };

  const handleHarvestWithdrawClick = () => {
    if (!depositAmount || !isWalletConnected(wallet) || !wallet.ethereum) {
      return;
    }

    dmtStaking
      .withdraw(ethersUtils.parseEther(depositAmount.toString()))
      .then((_) => setIsHarvesting(true))
      .catch((_) => {});
  };

  const checkWallet = () => {
    if (!isWalletConnected(wallet) || !wallet.ethereum) {
      router.push("/farms");

      return false;
    }

    return true;
  };

  const { titleCopy, withdrawAllBtnCopy } = config[farmId].farm;

  usePageTitle(titleCopy);

  return (
    <Flex
      margin="0 auto"
      width="100%"
      maxWidth="70rem"
      paddingY="3rem"
      alignItems="center"
      justifyContent="center"
      minHeight="calc(100vh - 9.5rem)"
    >
      <InlineSpinner
        isLoading={isCheckingApproved}
        message="Launching Space Farm..."
      >
        <Box width="100%">
          <Heading
            as="h1"
            fontSize="2rem"
            color="white"
            textAlign="center"
            lineHeight="base"
            paddingX={6}
            paddingBottom={6}
          >
            {titleCopy}
          </Heading>
          <Flex
            alignItems="center"
            justifyContent="center"
            flexWrap={{ base: "wrap", md: "nowrap" }}
            flexDirection={isApproved ? "row-reverse" : "row"}
          >
            <FarmDepositCard
              farmId={farmId}
              onApproveClick={handleApproveClick}
              isApproved={isApproved}
              isApproving={isApproving}
              depositAmount={depositAmount}
              isDepositing={isDepositing}
              setIsDepositing={setIsDepositing}
              isWithdrawing={isWithdrawing}
              setIsWithdrawing={setIsWithdrawing}
            />
            <FarmEarnCard
              farmId={farmId}
              isApproved={isApproved}
              depositAmount={depositAmount}
              earnedAmount={earnedAmount}
              isHarvesting={isHarvesting}
              setIsHarvesting={setIsHarvesting}
            />
          </Flex>
          {(isApproved && !!depositAmount) && (
            <Flex justifyContent="center">
              <Flex
                padding={4}
                width="100%"
                maxWidth={{ base: "28rem", md: "56rem" }}
              >
                <Button
                  sx={primaryBtnStyles}
                  flexGrow="1"
                  onClick={handleHarvestWithdrawClick}
                  disabled={!earnedAmount || isHarvesting}
                >
                  {withdrawAllBtnCopy}
                </Button>
              </Flex>
            </Flex>
          )}
        </Box>
      </InlineSpinner>
    </Flex>
  );
};

export default Farm;
