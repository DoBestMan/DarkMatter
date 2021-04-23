import { Flex, Box, Button, Text, useStyleConfig } from "@chakra-ui/core";
import { Search2Icon } from "@chakra-ui/icons";

const CARD_BACK_URL =
  "https://www.dropbox.com/sh/a43mnv6kg9t0yi2/AACIl90UuDCLeAG6ct5clfLxa/BLANK.mp4?raw=1";

const GalleryCard = ({
  name,
  level,
  current,
  total,
  disabled,
  minValueNeeded,
  thumbnailUrl = CARD_BACK_URL,
  currentCard,
  handleUnlock,
  onOpen,
  setCurrent,
  earnedAmount,
}) => {
  const primaryBtnStyles = useStyleConfig("Button", { variant: "primary" });
  const transparentBtnStyles = useStyleConfig("Button", {
    variant: "transparent",
  });

  return (
    <Box
      width={["100%", "50%", "33.33%"]}
      maxWidth="20rem"
      padding={4}
      key={name}
    >
      <Box
        display="block"
        borderWidth="1px"
        borderRadius="lg"
        backgroundColor="blackAlpha.500"
        paddingBottom={6}
      >
        <Button
          sx={transparentBtnStyles}
          disabled={disabled}
          onClick={() => {
            setCurrent(parseInt(level));
            onOpen();
          }}
          width="100%"
          height="100%"
          padding={0}
        >
          {parseInt(level) > currentCard + 6 ? (
            <img
              width="100%"
              style={{ borderRadius: "0.5rem 0.5rem 0 0" }}
              src="/images/dmt-video-placeholder.png"
            />
          ) : (
            <video
              src={thumbnailUrl}
              autoPlay
              loop
              muted
              playsInline
              controls={false}
              width="100%"
              style={{ borderRadius: "0.5rem 0.5rem 0 0" }}
            />
          )}
        </Button>
        <Flex justifyContent="center" paddingY="2">
          <Button
            sx={transparentBtnStyles}
            onClick={() => {
              setCurrent(parseInt(level));
              onOpen();
            }}
            disabled={disabled}
            fontSize="md"
            // display="block"
            height="auto"
            padding="0.75rem 1rem"
            leftIcon={<Search2Icon />}
          >
            Find the Key
          </Button>
        </Flex>
        <Box display="flex" flexDirection="row" marginBottom="1rem">
          <Box
            width="50%"
            textAlign="center"
            lineHeight="2.5rem"
            height="2.5rem"
            backgroundColor="gray.600"
          >
            {current} Minted
          </Box>
          <Box
            width="50%"
            textAlign="center"
            lineHeight="2.5rem"
            height="2.5rem"
            backgroundColor="gray.900"
          >
            {total} Total
          </Box>
        </Box>
        <Text
          fontWeight="bold"
          fontSize="lg"
          textAlign="center"
          textTransform="uppercase"
        >
          {name}
        </Text>
        <Flex paddingX={4} paddingTop={4}>
          <Button
            sx={primaryBtnStyles}
            flexGrow="1"
            disabled={Number(earnedAmount) < 9}
            onClick={async () => {
              await handleUnlock(level);
            }}
            textTransform="none"
          >
            {total === current && total !== 0
              ? "Sold Out"
              : Number(earnedAmount) < 9
              ? total !== 0
                ? `You Need ${minValueNeeded} NaOH`
                : "..."
              : total !== 0
              ? `Unlock`
              : "..."}
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default GalleryCard;
