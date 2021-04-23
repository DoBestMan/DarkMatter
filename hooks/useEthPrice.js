import CoinGecko from "coingecko-api";
import { useEffect, useState } from "react";

export function useEthPrice() {
  const client = new CoinGecko();
  const [ethUSD, setEthUsd] = useState(0);

  useEffect(() => {
    client.simple.price({ ids: ['ethereum'], vs_currencies: 'usd' }).then(({ data, success }) => {
      if (success) {
        setEthUsd(data.ethereum.usd);
      }
    });
  }, []);

  return { ethUSD };
};