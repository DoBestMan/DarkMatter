import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import _isNull from "lodash/isNull";

import { Spinner, Flex, Heading } from "@chakra-ui/core";

let timerFrom = 0;
let timer = null;

const Inline = ({
  isLoading = true,
  minSeconds = 1,
  spinnerSize = 20,
  minHeight = "0",
  message = null,
  messageSize = "3xl",
  children,
}) => {
  const [isOpen, setIsOpen] = useState(isLoading);

  useEffect(() => {
    if (isLoading && !timerFrom) {
      timerFrom = Date.now();

      if (isOpen !== isLoading) setIsOpen(true);
    } else if (!isLoading && timerFrom && !timer) {
      const timeRemaining = timerFrom + minSeconds * 1000 - Date.now();

      if (timeRemaining >= 0) {
        timer = setTimeout(() => close(), timeRemaining);
      } else {
        close();
      }
    }
  }, [isLoading]);

  useEffect(() => {
    return () => clearTimer();
  }, []);

  const clearTimer = () => {
    if (!_isNull(timer)) {
      clearTimeout(timer);

      timer = null;
    }
  };

  const close = () => {
    timerFrom = 0;

    clearTimer();
    setIsOpen(false);
  };

  return isOpen ? (
    <Flex
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      paddingTop={2}
      minHeight={minHeight}
    >
      <Spinner
        thickness="4px"
        speed="0.85s"
        color="whiteAlpha.600"
        emptyColor="whiteAlpha.200"
        width={spinnerSize}
        height={spinnerSize}
      />
      {message && (
        <Heading
          color="whiteAlpha.900"
          fontSize={messageSize}
          lineHeight="base"
          textAlign="center"
          paddingTop={6}
          paddingX={6}
          paddingBottom={2}
        >
          {message}
        </Heading>
      )}
    </Flex>
  ) : (
    <>{children}</>
  );
};

Inline.propTypes = {
  isLoading: PropTypes.bool,
  minSeconds: PropTypes.number,
  spinnerSize: PropTypes.number,
  minHeight: PropTypes.string,
  message: PropTypes.string,
  messageSize: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Inline;
