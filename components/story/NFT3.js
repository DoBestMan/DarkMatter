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

const NFTStory3 = ({ onGoBack }) => {
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
        LEVEL 3
      </ModalHeader>
      <ModalCloseButton size="lg" sx={closeBtnStyles} top="12px" />
      <ModalBody paddingX={{ base: 4, sm: 8 }}>
        <VStack spacing={6}>
          <Text fontSize="md">
            The stargate activates with a giant whirring sound, blasting
            residual dark matter out of the portal like dust on an unused fan.
            These airborne particles of aeons-old matter temporarily oscillate
            before vanishing into the surroundings.
          </Text>
          <Text fontSize="md">
            &quot;As long as you hold 199 yTSLA, the stargate will remain
            open,&quot; Elob says. &quot;Our objective now is to find our new
            world.&quot; He gestures for you to enter the stargate. You wonder
            why you have to lead, but do so anyhow. As you approach the ethereal
            dark matter portal, you begin to see the particles moving
            independently from each other as if they are all alive, like
            fragments of magnets pooled together.
          </Text>
          <Text fontSize="md">
            You walk into the stargate—the Pineapple Gate.
          </Text>
          <Text fontSize="md">
            You expect to land on your feet, but you are immediately falling
            through infinite space. Stars and cosmic colors brightly light the
            void. A Blue Kirby is floating below you and you rub your eyes. It
            is really there. As you get closer to the creature, you notice that
            it has a tattoo of Andre Cronje with a rug on its cheek. As silly as
            it is, you know exactly what to do. You throw a single coin at the
            Kirby, it eats it, and then it eats you. You voyage to another
            realm.
          </Text>
          <Text fontSize="md" textAlign="center">
            HOLD 1 CORRECT TOKEN TO MOVE TO NEXT LEVEL
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

export default NFTStory3;
