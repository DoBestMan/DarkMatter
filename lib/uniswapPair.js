import {
  ChainId,
  Token,
  WETH,
  Fetcher,
  Route,
} from '@uniswap/sdk';

export const create = (tokenAddress, provider) => {
  const token = new Token(ChainId.MAINNET, tokenAddress, 18); // ChainId.MAINNET

  const fetchPairData = () => Fetcher.fetchPairData(token, WETH[ChainId.MAINNET], provider);

  const getPrice = async () => {
    const pair = await fetchPairData();
    const route = new Route([pair], token);

    return route.midPrice.toSignificant(6);
  };

  return { getPrice };
};
