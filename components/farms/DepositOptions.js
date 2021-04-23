import PropTypes from "prop-types";
import { Flex } from "@chakra-ui/core";

import DepositModal from "./DepositModal";
import WithdrawModal from "./WithdrawModal";

const DepositOptions = ({
  farmId,
  userTokenBalance,
  depositAmount,
  isDepositing,
  setIsDepositing,
  isWithdrawing,
  setIsWithdrawing,
  totalTokenRewards,
  usersTotalDepositied,
}) => (
  <Flex
    alignItems="center"
    justifyContent="center"
    paddingTop={8}
    paddingBottom="1.6875rem"
  >
    <DepositModal 
      farmId={farmId} 
      userTokenBalance={userTokenBalance}
      isDepositing={isDepositing} 
      setIsDepositing={setIsDepositing}
      totalTokenRewards={totalTokenRewards}
      usersTotalDepositied={usersTotalDepositied}
    />
    <WithdrawModal 
      farmId={farmId}
      userTokenBalance={userTokenBalance}
      depositAmount={depositAmount}
      usersTotalDepositied={usersTotalDepositied}
      isWithdrawing={isWithdrawing} 
      setIsWithdrawing={setIsWithdrawing}
    />
  </Flex>
);

DepositOptions.propTypes = {
  farmId: PropTypes.string.isRequired,
  userTokenBalance: PropTypes.number,
  depositAmount: PropTypes.number,
  isDepositing: PropTypes.bool.isRequired,
  setIsDepositing: PropTypes.func.isRequired,
  isWithdrawing: PropTypes.bool.isRequired,
  setIsWithdrawing: PropTypes.func.isRequired,
  totalTokenRewards: PropTypes.number,
  usersTotalDepositied: PropTypes.number,
};

export default DepositOptions;
