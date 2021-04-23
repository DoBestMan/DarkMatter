import YtslaLogoFull from "../icons/YtslaLogoFull";
import YtslaLogoText from "../icons/YtslaLogoText";
import LogoFullIcon from "../icons/LogoFull";

/**
 * Config object utilised by various farm components per farm.
 * Required to reduce the number of non-essential props being passed down the chain.
 */
const config = {
  yTslaForDMT: {
    landingCard: {
      titleCopy: "Space Farm",
      depositCopy: "Deposit yTSLA",
      depositIcon: () => <YtslaLogoFull color="whiteAlpha.500" width="5.5rem" height="5.5rem" />,
      earnCopy: "Earn DMT",
      earnIcon: () => <LogoFullIcon color="whiteAlpha.500" width="5.5rem" height="5.5rem" />,
      tokenPrice1LabelCopy: "yTSLA Price",
      tokenPrice2LabelCopy: "DMT Price",
      walletConnectBtnCopy: "Unlock Space Wallet",
      walletConnectedBtnCopy: "Launch Space Farm",
    },
    farm: {
      titleCopy: "yTSLA Space Farm",
      withdrawAllBtnCopy: "Harvest & Withdraw",
    },
    depositCard: {
      titleCopy: "yTSLA",
      depositIcon: () => <YtslaLogoFull color="whiteAlpha.500" width="5.5rem" height="5.5rem" />,
      stakedCopy: "yTSLA Staked",
      approveBtnCopy: "Approve yTSLA",
    },
    earnCard: {
      titleCopy: "DMT",
      earnIcon: () => <LogoFullIcon color="whiteAlpha.500" width="5.5rem" height="5.5rem" />,
      estimatedCopy: "Estimated DMT earned",
      harvestBtnCopy: "Harvest DMT",
    },
    depositModal: {
      openTooltipCopy: "Stake yTSLA",
      titleCopy: "Stake yTSLA",
      tokenIcon: () => <YtslaLogoText color="whiteAlpha.500" width="9rem" height="2.25rem" />,
      totalRewardsCopy: "Total DMT left to be distributed as rewards",
      usersTotalDepositedCopy: "Total yTSLA staked by the community",
      userBalanceCopy: "Your yTSLA balance is:",
      spinnerMessage: "Staking yTSLA...",
    },
    withdrawModal: {
      openTooltipCopy: "Withdraw yTSLA",
      titleCopy: "Withdraw yTSLA",
      tokenIcon: () => <YtslaLogoText color="whiteAlpha.500" width="9rem" height="2.25rem" />,
      userTotalDepositedCopy: "Total yTSLA currently staked by you",
      usersTotalDepositedCopy: "Total yTSLA staked by the community",
      userBalanceCopy: "Your yTSLA balance is:",
      spinnerMessage: "Unstaking yTSLA...",
    },
  },
};

export default config;
