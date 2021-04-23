import { ChakraProvider } from "@chakra-ui/core";
import { UseWalletProvider } from "use-wallet";

import DocHead from "../components/DocHead";
import Layout from "../components/layout";

import theme from "../theme";

/**
 * CSS
 */
import "../components/splash/splash.css";
import "../components/background/background.css";

/**
 * Required to set the default theme to `dark` due to a bug in Chakra V.1.0.0.
 * Once the patch is deployed, this can be removed and replaced with
 * setting the initialColorMode in the config object.
 */
const fakeStorageManager = {
  get: () => "dark",
  set: (value) => {},
  type: "cookie",
};

/**
 * Uncomment to view the current theme object values.
 */
// console.log(theme);

const App = ({ Component, pageProps }) => (
  <UseWalletProvider
    chainId={1}
    connectors={{
      walletconnect: { rpcUrl: "https://mainnet.eth.aragon.network/" },
    }}
  >
    <ChakraProvider theme={theme} colorModeManager={fakeStorageManager}>
      <DocHead />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  </UseWalletProvider>
);

export default App;
