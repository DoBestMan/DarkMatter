import { useEffect } from "react";
import PropTypes from "prop-types";
import { useWallet } from "use-wallet";

import {
  Box,
  Flex,
  Button,
  Heading,
  ModalHeader,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useStyleConfig,
  useBreakpointValue,
} from "@chakra-ui/core";

import MetaMaskLogoIcon from "../icons/MetaMaskLogoIcon";
import WalletConnectLogoIcon from "../icons/WalletConnectLogoIcon";

const WalletModal = ({
  isModalOpen,
  onCloseModal,
}) => {
  const wallet = useWallet();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const closeBtnStyles = useStyleConfig("Button", { variant: "icon-trans" });

  const isModalCentered = useBreakpointValue({ base: false, md: true });
  const optionsFlexDirection = useBreakpointValue({ base: "column", sm: "row" });
  const optionWidth = useBreakpointValue({ base: "100%", sm: "50%" });
  const subTitlePadding = useBreakpointValue({ base: 2, sm: 4 });

  useEffect(() => {
    if (isModalOpen) {
      onOpen();
    };
  }, []);

  const handleConectClick = connector => () => wallet.connect(connector);

  const handleClose = () => {
    onClose();
    
    onCloseModal();
  };

  const WalletOption = ({
    title,
    subTitle,
    icon,
    onClick,
  }) => (
    <Box width={optionWidth} paddingY={2}>
      <Flex paddingX={2}>
        <Button 
          flexGrow="1" 
          display="flex" 
          flexDirection="column" 
          height="auto" 
          paddingY={8}
          borderRadius="lg"
          minHeight={{ base: 0, sm: "15.625rem" }}
          onClick={onClick}
        >
          <Box as="span" display="block">{icon}</Box>
          <Box 
            as="span" 
            display="block" 
            fontSize="2xl" 
            lineHeight="base" 
            paddingTop={4}
          >
            {title}
          </Box>
          <Box 
            as="span" 
            display="block"
            color="gray.400"
            fontSize="lg" 
            lineHeight="base" 
            paddingTop={2}
            paddingX={subTitlePadding}
            whiteSpace="normal"
            fontWeight="normal"
          >
            {subTitle}
          </Box>
        </Button>
      </Flex>
    </Box>
  );

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={handleClose} 
      isCentered={isModalCentered} 
      size="xl" 
      scrollBehavior="outside" 
      autoFocus={false} 
      returnFocusOnClose={false}
    >
      <ModalOverlay background="blackAlpha.800">
        <ModalContent marginY={16} marginX={4} background="gray.900" borderRadius="lg">
          <ModalHeader 
              fontSize="3xl" 
              fontWeight="bold" 
              textAlign="center"
              paddingX="4rem" 
              paddingBottom={2} 
            >
              Unlock Space Wallet
            </ModalHeader>
          <ModalCloseButton size="lg" sx={closeBtnStyles} top="12px" />
          <ModalBody padding={0}>
            <Flex 
              paddingY={2} 
              paddingX={2} 
              flexWrap="wrap"
              flexDirection={optionsFlexDirection}
            >
              <WalletOption 
                title="MetaMask" 
                subTitle="Connect to your MetaMask Wallet" 
                icon={<MetaMaskLogoIcon width="2.8125rem" height="2.8125rem" />}
                onClick={handleConectClick("injected")}
              />
              <WalletOption 
                title="WalletConnect" 
                subTitle="Scan with WalletConnect to connect" 
                icon={<WalletConnectLogoIcon width="2.8125rem" height="2.8125rem" />} 
                onClick={handleConectClick("walletconnect")}
              />
            </Flex>
          </ModalBody>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
};

WalletModal.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};

export default WalletModal;
