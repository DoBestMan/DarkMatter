import {
  Text,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useStyleConfig,
  Button,
  Flex,
  VStack,
} from "@chakra-ui/core";

const NFTStory2 = ({ onGoBack }) => {
  const primaryBtnStyles = useStyleConfig("Button", { variant: "primary" });
  const closeBtnStyles = useStyleConfig("Button", { variant: "icon-trans" });

  return (
    <>
      <ModalHeader
        fontSize="3xl"
        fontWeight="bold"
        textAlign="center"
        paddingTop={6}
        paddingX={16}
        paddingBottom={4}
      >
        LEVEL 2
      </ModalHeader>
      <ModalCloseButton size="lg" sx={closeBtnStyles} top="12px" />
      <ModalBody paddingX={{ base: 4, sm: 8 }}>
        <VStack spacing={6}>
          <Text fontSize="md">
            Dark Matter exudes from the altar rock in a half-solid, half-gaseous
            form, sliding up and around the Meme Grail, disintegrating it. The
            tendril of dark matter then leaps to your right hand. Out of fear in
            what you had just witnessed, you fight desperately to retrieve your
            hand, but the dark matter holds firm. It coils around your wrist and
            digits and then etches—using a portion of itself as ink—a sigil into
            your palm. The dark matter returns to the rock and you stare,
            dumbfounded, at your throbbing hand.
          </Text>
          <Text fontSize="md">
            &quot;That symbol on your hand activates the Pineapple Gate, but it
            also needs fuel to remain open,&quot; Elob says, unphased by what
            had just occurred. &quot;When we found the gate, I had some of my
            guys tweak it to run by rehypothecating shares of yTSLA. It needs 199
            as fuel. You still have your shares of the company, right?&quot;
          </Text>
          <Text fontSize="md" textAlign="center">
            HOLD 199 OF THE SPECIFIED TOKEN TO ACTIVATE AND KEEP OPEN THE
            STARGATE
          </Text>
        </VStack>
        <Flex paddingTop={6} justifyContent="center">
          <Button sx={primaryBtnStyles} onClick={onGoBack}>
            Close
          </Button>
        </Flex>
      </ModalBody>
    </>
  );
};

export default NFTStory2;
