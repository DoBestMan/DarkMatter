import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import _isUndefined from "lodash/isUndefined";

import { Box, Flex, Image } from "@chakra-ui/core";

const Splash = () => {
  const router = useRouter();
  const { asPath } = router;

  const [showLogo, setShowLogo] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    setBodyOverflow("hidden");

    setTimeout(() => {
      if (!_isUndefined(showLogo)) setShowLogo(true);
    }, 500);

    setTimeout(() => {
      if (!_isUndefined(isOpening)) setIsOpening(true);
    }, 2500);

    setTimeout(() => {
      setBodyOverflow("auto");


      if(!_isUndefined(isComplete)) setIsComplete(true);
    }, 3500);
  }, []);

  const setBodyOverflow = (value) => (document.body.style.overflow = value);

  if (asPath !== "/" || isComplete) return null;

  return (
    <Flex
      position="fixed"
      top="0"
      left="0"
      width="100%"
      height="100%"
      zIndex="9999"
      alignItems="center"
      justifyContent="center"
    >
      <Box width="100%" height="100%" position="relative">
        <Flex
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="50%"
          backgroundColor="black"
          alignItems="flex-end"
          justifyContent="center"
          transition="all 0.75s ease-out"
          className={isOpening ? "splashTopShutter" : ""}
        >
          <Image
            src="/images/splash-logo-top.png"
            width="170px"
            height="85px"
            display="block"
            opacity="0"
            transition="all 0.2s ease-in"
            className={
              showLogo && !isOpening
                ? "splashLogoIn"
                : isOpening
                ? "splashLogoOut"
                : ""
            }
          />
        </Flex>
        <Flex
          position="absolute"
          top="50%"
          left="0"
          width="100%"
          height="50%"
          backgroundColor="black"
          alignItems="flex-start"
          justifyContent="center"
          transition="all 0.75s ease-out"
          className={isOpening ? "splashBotShutter" : ""}
        >
          <Image
            src="/images/splash-logo-bot.png"
            width="170px"
            height="85px"
            display="block"
            opacity="0"
            transition="all 0.2s ease-in"
            className={
              showLogo && !isOpening
                ? "splashLogoIn"
                : isOpening
                ? "splashLogoOut"
                : ""
            }
          />
        </Flex>
      </Box>
    </Flex>
  );
};

export default Splash;
