import { useState } from "react";
import PropTypes from "prop-types";

import {
  Flex,
  Box,
  Stat,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  StatLabel,
  StatNumber,
  IconButton,
  useStyleConfig,
  useDisclosure,
  useBreakpointValue,
} from "@chakra-ui/core";

import useInterval from "../../hooks/useInterval";

import { MdTimer } from "react-icons/md";

const CountdownModal = ({
  title,
  countTo = "2020-11-02T22:00:00.000Z",
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const iconBtnStyles = useStyleConfig("Button", { variant: "icon-trans" });
  const isModalCentered = useBreakpointValue({ base: false, md: true });

  const [countHours, setCountHours] = useState(0);
  const [countMinutes, setCountMinutes] = useState(0);
  const [countSeconds, setCountSeconds] = useState(0);
  const [countDelay, setCountDelay] = useState(1000);

  const dateTo = new Date(countTo).getTime();

  useInterval(() => {
    /**
     * Today's date and time.
     */
    const dateLocal = new Date();
    const dateNow = Date.UTC(dateLocal.getUTCFullYear(), dateLocal.getUTCMonth(), dateLocal.getUTCDate(), dateLocal.getUTCHours(), dateLocal.getUTCMinutes(), dateLocal.getUTCSeconds());
  
    /**
     * Distance between now and the countdown date.
     */
    const distance = dateTo - dateNow;
  
    /**
     * Calculations hours, minutes, seconds.
     */
    const hours = Math.floor(distance / 3600000);
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (distance >= 0) {
      setCountHours(hours);
      setCountMinutes(minutes);
      setCountSeconds(seconds);
    } else {
      /**
       * Countdown complete.
       */
      setCountDelay(null);
    }
  }, countDelay);

  const prependZero = value => `0${value}`.slice(-2);

  return (
    <>
      <IconButton 
        onClick={onOpen} 
        aria-label="ClueX" 
        sx={iconBtnStyles} 
        minWidth="0"
        width="2.75rem"
        height="2.75rem" 
        icon={<MdTimer size="1.5rem" />}
      />
      <Modal 
        isOpen={isOpen} 
        onClose={onClose} 
        isCentered={isModalCentered} 
        size="lg" 
        scrollBehavior="outside" 
        autoFocus={false} 
        returnFocusOnClose={false}
      >
        <ModalOverlay background="blackAlpha.800">
          <ModalContent marginY={16} marginX={4} background="gray.900" borderRadius="lg">
            <ModalHeader 
              fontSize="2rem" 
              fontWeight="bold" 
              textAlign="center"
              paddingX="4rem" 
              paddingTop={6}
              paddingBottom={2} 
            >
              {title}
            </ModalHeader>
            <ModalCloseButton size="lg" sx={iconBtnStyles} top="12px" />
            <ModalBody paddingX={0} paddingTop={8} paddingBottom={12}>
              <Flex 
                alignItems="center"
                justifyContent="center" 
              >
                <Flex
                  width="100%"
                  maxWidth="19.625rem"
                  minHeight="19.625rem"
                  textAlign="center"
                  background="transparent url(/images/dm-logo-ring.png) center center no-repeat" 
                  backgroundSize="cover"
                  alignItems="center"
                  justifyContent="center" 
                >
                  <Flex 
                    alignItems="center"
                    justifyContent="center" 
                  >
                    <Box minWidth="4.9375rem">
                      <Stat paddingLeft={0}>
                        <StatLabel fontSize="3xl" textAlign="center" color="gray.400">HH</StatLabel>
                        <StatNumber fontSize="4xl" textAlign="center">{prependZero(countHours)}</StatNumber>
                      </Stat>
                    </Box>
                    <Box minWidth="4.6875rem">
                      <Stat>
                        <StatLabel fontSize="3xl" textAlign="center" color="gray.400">MM</StatLabel>
                        <StatNumber fontSize="4xl" textAlign="center">{prependZero(countMinutes)}</StatNumber>
                      </Stat>
                    </Box>
                    <Box minWidth="4.6875rem">
                      <Stat>
                        <StatLabel fontSize="3xl" textAlign="center" color="gray.400">SS</StatLabel>
                        <StatNumber fontSize="4xl" textAlign="center">{prependZero(countSeconds)}</StatNumber>
                      </Stat>
                    </Box>
                  </Flex>
                </Flex>
              </Flex>
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </>
  );
};

CountdownModal.propTypes = {
  title: PropTypes.string.isRequired,
  countTo: PropTypes.string.isRequired,
};

export default CountdownModal;
