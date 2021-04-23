import { useMemo } from "react";
import { useWallet } from "use-wallet";
import { providers as EthersProviders } from "ethers";
import { create as createERC20 } from "../lib/erc20";
import { create as createERC1155 } from "../lib/erc1155";
import { create as createStakingERC20 } from "../lib/stakingERC20";
import { create as createUniswapPair } from "../lib/uniswapPair";
import { create as createStakingERC1155 } from "../lib/stakingERC1155";

const chains = {
  testnet: {
    ytslaToken: "0xdDF18785195aFd648c1dEBA4Bf74d0C36D1C0218",
    dmtToken: "0xb5D608bB4B3788F84279921FeF171E2d08A74e58",
    dmtLtd: "0xaC43eF1686302Fa41434225Eb6a87856017f1A03",
    dmtStaking: "0x07E6B7453b474A323aA22789Aa0E92Ab74270762",
    nftStaking: "0x8F5d44422A56864FB8Df0602A9D925662c14F0e0",
  },
  mainnet: {
    ytslaToken: "0x5322A3556F979cE2180B30e689a9436fDDCB1021",
    dmtToken: "0x79126d32a86e6663F3aAac4527732d0701c1AE6c",
    dmtLpToken: "0x2b53861bB489501537CDDF9bFeC8F1cAA2851A24",
    dmtLtd: "0x6E91869090a430e6ba6fFa7c585742E56Fed2247",
    dmtStaking: "0x550DCE3dEBae1374d0878C5692D52d1ac4b40C5D",
    nftStaking: "0x1e54F823De83f84C57e19138850209Ebc7E92d7f",
  },
};

/**
 * Switch between the two for testing / production.
 */
const addresses = { ...chains.mainnet };

export function useContracts() {
  const { ethereum } = useWallet();
  const ethers = useMemo(
    () => (ethereum ? new EthersProviders.Web3Provider(ethereum) : null),
    [ethereum]
  );

  // Single exposed account e.g. MetaMask
  const signer = ethers ? ethers.getSigner() : null;

  // yTSLA token
  const ytslaToken = addresses.ytslaToken
    ? createERC20(addresses.ytslaToken, signer)
    : {};

  const ytslaEthPair = addresses.ytslaToken
    ? createUniswapPair(addresses.ytslaToken, signer)
    : {};

  // DMT token
  const dmtToken = addresses.dmtToken
    ? createERC20(addresses.dmtToken, signer)
    : {};

  const dmtLpToken = addresses.dmtLpToken
  ? createERC20(addresses.dmtLpToken, signer)
  : {};

  const dmtEthPair = addresses.dmtToken
    ? createUniswapPair(addresses.dmtToken, signer)
    : {};

  const dmtStaking = addresses.dmtStaking
    ? createStakingERC20(addresses.dmtStaking, signer)
    : {};

  const dmtLtd = addresses.dmtLtd
    ? createERC1155(addresses.dmtLtd, signer)
    : {};

  const nftStaking = addresses.nftStaking
    ? createStakingERC1155(addresses.nftStaking, signer)
    : {};

  return {
    ethers,
    ytslaToken,
    ytslaEthPair,
    dmtLtd,
    dmtToken,
    dmtLpToken,
    dmtEthPair,
    dmtStaking,
    nftStaking,
  };
}
