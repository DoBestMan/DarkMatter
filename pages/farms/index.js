import { useState } from "react";
import { useRouter } from "next/router";
import { useWallet } from "use-wallet";

import useInterval from "../../hooks/useInterval";
import { useContracts } from "../../hooks/useContracts";
import { useEthPrice } from "../../hooks/useEthPrice";

import { isWalletConnected } from "../../lib/wallet";

import {
  Flex,
  Box,
  Text,
  Heading,
} from "@chakra-ui/core";

import usePageTitle from "../../hooks/usePageTitle";
import FarmLandingCard from "../../components/farms/LandingCard";

const Index = () => {
  const wallet = useWallet();
  const { ytslaEthPair, dmtStaking, dmtEthPair } = useContracts();
  const { ethUSD } = useEthPrice();

  const router = useRouter();
  
  const [ytslaPrice, setYtslaPrice] = useState(null);
  const [dmtPrice, setDmtPrice] = useState(null);
  const [apyAmount, setApyAmount] = useState(null);
  
  usePageTitle("Space Farms");

  useInterval(() => {
    async function updateLiveInfo() {
      if (!isWalletConnected(wallet) || !wallet.ethereum) return;

      const rewardPerToken = await dmtStaking.rewardPerToken();
      const ytslaPriceETH = await ytslaEthPair.getPrice();
      const dmtPriceETH = await dmtEthPair.getPrice();

      const apyValue = rewardPerToken.toNumber() * parseFloat(dmtPriceETH) / Math.pow(10, 18) / parseFloat(ytslaPriceETH) * 86400 * 365 * 100;

      setYtslaPrice(ytslaPriceETH * ethUSD);
      setDmtPrice(dmtPriceETH * ethUSD);
      setApyAmount(apyValue);
    }
  
    updateLiveInfo().catch(console.log);
  }, 2000);

  const handleUnlockWallet = path => () => router.push(path);

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
      <Box width="100%">
        <Heading 
          as="h1" 
          size="lg"
          color="gray.500"
          textAlign="center"
          lineHeight="base"
          paddingX={6}
          paddingBottom={6}
        >
          Earn <Text as="span" color="white">DMT</Text> by depositing <Text as="span" color="white">yTSLA</Text>
        </Heading>
        <Flex
          alignItems="center"
          justifyContent="center"
          flexWrap="wrap"
        >
          <FarmLandingCard 
            farmId="yTslaForDMT" 
            token1Price={ytslaPrice}
            token2Price={dmtPrice}
            apyAmount={apyAmount} 
            onUnlockWallet={handleUnlockWallet("/farms/ytsla")}
          />
        </Flex>
      </Box>
    </Flex>
  );
};

export default Index;
