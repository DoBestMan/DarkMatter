import {
  Flex,
  Box,
  Text,
  VStack,
  Heading,
} from "@chakra-ui/core";

import usePageTitle from "../hooks/usePageTitle";

const Intro = () => {
  usePageTitle("Introduction");

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
      <Box maxWidth="36.25rem" paddingX={{ base: 4, sm: 8 }}>
        <Heading paddingBottom={8}>
          Intro
        </Heading>
        <VStack spacing={6}>
          <Text fontSize="md">
            There is nothing more unsettling than watching someone be positively
            rebased by dark matter. Limbs multiply, extra teeth catapult,
            screams of agony double with parting vocal chords. The heart beats
            until the uncanny network of growth escapes the velocity of ample
            circulation. It is a slow and gruesome demise - one that Elob Munk
            wishes to never again witness.
          </Text>
          <Text fontSize="md">
            This renowned CEO of yTSLA had a simple task of initiating the
            positive rebase on the Li-ion cells of the batteries being used for
            the Marp SpoceX starship fleet. He had performed the task with the
            rebase machine successfully many times before, but on this fateful
            day his focus was diverted by visions of farming his freshly ripened
            pineapple crop. The factor he inputted for the action was
            devastatingly high, and, when the rebase initiated, the battery
            cells multiplied at far too immense a rate.
          </Text>
          <Text fontSize="md">
            At this frequency of rebase, the cells began to draw in energy from
            across the universe, pulling in dark matter through quantum
            entanglement with distant, undesirable galaxies. Elob could feel the
            terror gyrating within his moon factory. It was a sense of dread
            that built itself within the patterns of his thoughts, impairing
            judgment and motor functions. Unable to stop what he had begun, he
            witnessed the rebasing dark matter leap from the batteries to his
            employees. He flung himself head first into the bulletproof glass
            dividing the command room he occupied from his workforce below,
            desperate to do anything to reach them. Powerlessly, Elob looked on
            as his personnel expunged from his employment, and life.
          </Text>
        </VStack>
      </Box>
    </Flex>
  );
};

export default Intro;
