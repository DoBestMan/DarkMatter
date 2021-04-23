import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useWallet } from "use-wallet";
import useInterval from "../../hooks/useInterval";

import { Link, Button, useStyleConfig, Text } from "@chakra-ui/core";

import _get from "lodash/get";
import _noop from "lodash/noop";
import _isUndefined from "lodash/isUndefined";

import { formatNumber } from "../../lib/numeric";

import {
  getWalletConnectionStatus,
  isWalletDisconnected,
  isWalletConnecting,
  isWalletConnected,
  getWalletAddress,
  shortenWalletAddress,
} from "../../lib/wallet";
import { useContracts } from "../../hooks/useContracts";

import WalletModal from "./WalletModal";

const ConnectModal = ({
  variant,
  connectTitle,
  connectedTitle,
  shouldRenderDrawer,
  onConnected = _noop,
}) => {
  const wallet = useWallet();
  const { dmtToken } = useContracts();
  
  const [prevConnectionStatus, setPrevConnectionStatus] = useState(getWalletConnectionStatus(wallet));
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [userDmtBalance, setUserDmtBalance] = useState(null);

  const primaryBtnStyles = useStyleConfig("Button", { variant: "primary" });

  useEffect(() => {
    /**
     * Disable the modal once the user connects or disconnects their wallet.
     */
    const currentConnectionStatus = getWalletConnectionStatus(wallet);

    const isNowConnected =
      prevConnectionStatus === "disconnected" &&
      currentConnectionStatus === "connected";
    const isNowDisconnected =
      prevConnectionStatus === "connected" &&
      currentConnectionStatus === "disconnected";

    if (isNowConnected || isNowDisconnected) {
      setPrevConnectionStatus(currentConnectionStatus);

      if (isModalOpen) {
        setIsModalOpen(false);
      }
    }

    /**
     * Call wallet connected callback e.g. route change
     */
    if (isNowConnected) {
      // onConnected();
    }
  });

  useInterval(() => {
    async function updateLiveInfo() {
      if (!isWalletConnected(wallet) || !wallet.ethereum) return;

      /**
       * Update live DMT balance.
       */
      const liveDmtBalance = await dmtToken.balanceOf(getWalletAddress(wallet));

      if (!_isUndefined(userDmtBalance) && liveDmtBalance !== userDmtBalance) setUserDmtBalance(liveDmtBalance);
    }

    updateLiveInfo().catch(console.log);
  }, 2000);

  const handleOpenModal = () => setIsModalOpen(true);

  const handleCloseModal = () => setIsModalOpen(false);

  if (variant === "headerNav") {
    if (isWalletDisconnected(wallet) || isWalletConnecting(wallet)) {
      /**
       * Show "Wallet Connect" button.
       */
      return (
        <>
          <Button onClick={handleOpenModal} sx={primaryBtnStyles} marginX={1}>
            {connectTitle}
          </Button>
          {isModalOpen && (
            <WalletModal isModalOpen={true} onCloseModal={handleCloseModal} />
          )}
        </>
      );
    } else if (isWalletConnected(wallet)) {
      /**
       * Show wallet address.
       */
      const walletAddress = getWalletAddress(wallet);

      if (walletAddress) {
        return (
          <Link
            href={`https://etherscan.io/address/${walletAddress}`}
            color="whiteAlpha.600"
            fontSize="md"
            padding="0.625rem 1rem 0.625rem 1rem"
            borderRadius="lg"
            marginLeft={2}
            background="whiteAlpha.200"
            _hover={{
              color: "whiteAlpha.800",
              textDecoration: "none",
              background: "whiteAlpha.300",
            }}
            isExternal
          >
            <Text
              fontSize="md"
              paddingY="0.25rem"
              paddingRight={!shouldRenderDrawer ? 4 : 0}
              as="span"
            >
              {formatNumber(userDmtBalance, 5)} DMT
            </Text>
            {!shouldRenderDrawer && (
              <Text
                borderLeft="1px"
                borderColor="whiteAlpha.300"
                fontSize="md"
                paddingY="0.25rem"
                paddingLeft={4}
                as="span"
              >
                {shortenWalletAddress(walletAddress)}
              </Text>
            )}
          </Link>
        );
      }
    }
  } else if (variant === "card") {
    if (isWalletDisconnected(wallet) || isWalletConnecting(wallet)) {
      /**
       * Show "Wallet Connect" button.
       */
      return (
        <>
          <Button onClick={handleOpenModal} sx={primaryBtnStyles} flexGrow="1">
            {connectTitle}
          </Button>
          {isModalOpen && (
            <WalletModal isModalOpen={true} onCloseModal={handleCloseModal} />
          )}
        </>
      );
    } else if (isWalletConnected(wallet)) {
      /**
       * Show "Continue" link.
       */
      return (
        <Button onClick={onConnected} sx={primaryBtnStyles} flexGrow="1">
          {connectedTitle}
        </Button>
      );
    }
  }

  return null;
};

ConnectModal.propTypes = {
  variant: PropTypes.oneOf(["headerNav", "card"]).isRequired,
  connectTitle: PropTypes.string.isRequired,
  connectedTitle: PropTypes.string,
  onConnected: PropTypes.func,
};

export default ConnectModal;
