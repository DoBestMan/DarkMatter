import {
  Flex, 
  Box, 
  Image,
} from "@chakra-ui/core";

import usePageTitle from "../hooks/usePageTitle";
import InternalLink from "../components/utils/InternalLink";

const Home = () => {
  usePageTitle("Home");

  const SectionCard = ({
    path,
    title,
    imageSrc,
    imageAlt,
  }) => (
    <Box padding={4}>
      <InternalLink 
        href={path} 
        title={title}
        border="1px"
        borderColor="whiteAlpha.300"
        borderRadius="lg"
        display="block"
        width="100%"
        maxWidth="25rem"
        position="relative"
        transition="ease-in-out"
        transitionDuration="0.1s"
        _hover={{
          transform: "scale(1.07)",
        }}
        _active={{
          transform: "scale(1.04)",
        }}
      >
        <Image 
          src={imageSrc}
          borderRadius="lg"
          alt={imageAlt}
        />
      </InternalLink>
    </Box>
  );

  return (
    <Flex
      margin="0 auto"
      width="100%"
      maxWidth="70rem"
      paddingY="3rem"
      flexWrap="wrap"
      alignItems="center"
      justifyContent="center"
      minHeight="calc(100vh - 9.5rem)"
    >
      <Flex
        flexDirection={{ base: "column", md: "row" }}
        alignItems="center" 
        justifyContent="center" 
        paddingX={{ base: 0, md: 4 }}
      >
        <SectionCard path="/gallery" title="Gallery" imageSrc="/images/home-nft-dmt.png" imageAlt="Unlock NFT" />
        <SectionCard path="/farms" title="Farm" imageSrc="/images/home-farm-dmt.png" imageAlt="Farm DMT" />
      </Flex>
    </Flex>
  );
};

export default Home;
