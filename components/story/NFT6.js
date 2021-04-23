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

const NFTStory6 = ({ onGoBack }) => {
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
        LEVEL 6
      </ModalHeader>
      <ModalCloseButton size="lg" sx={closeBtnStyles} top="12px" />
      <ModalBody paddingX={{ base: 4, sm: 8 }}>
        <VStack spacing={6}>
          <Text fontSize="md">
            You arrive under a bright, vivid blue sky. It is all you see.
            Seagulls fly above, a light breeze brushes against your face, and
            the sound of the ocean tide whispers into your ears. You realize you
            are lying down in a hammock at a beach, and you feel at peace for
            the first time since entering the Pineapple Gate.
          </Text>
          <Text fontSize="md">
            After a few moments of basking in the blissful respite, letting your
            mind wander from the memories of your voyage, you notice there is a
            hole in the hammock beneath your rear-end. Just as you realize this,
            someone pokes you in that said region from below. You adjust
            yourself in order to see what is there. You are not prepared for the
            sight that stains your retinas.
          </Text>
          <Text fontSize="md">
            John McAfee is lying on the ground, his mouth and nether regions
            crusted over with dried blood. When you look upon him, he smiles
            with teeth full of blood and penile pulp.
          </Text>
          <Text fontSize="md">
            It only takes but one glimpse at this nightmarish horror before you
            attempt to leap out of the hammock and get as far away as possible.
            In your movement—in consequence of the hole and normal complications
            in exiting the rope apparatus—you fall flat on top of McAfee. You
            scream a deafening plea of repulsion.
          </Text>
          <Text fontSize="md">
            As you try to get up, McAfee wraps his arms around you and attempts
            to hold you down. You fight with all of your might and eventually
            free yourself. You then desperately look for a portal to escape this
            haunting domain.
          </Text>
          <Text fontSize="md">
            McAfee laughs at you and you reluctantly turn back towards him.
          </Text>
          <Text fontSize="md">
            He spits what is left of his severed member at you, which was still
            in his mouth. &quot;That’s your ticket,&quot; he says, as fresh
            blood sloshes from the sides of his mouth. &quot;Hold on tight and
            get in the pit.&quot; He gestures to a pit that has been dug in the
            sand not ten feet away. The depth is around six feet. &quot;Get in
            and say goodbye. Oh, and it’s not really an easy decision to make on
            your own so I’m not giving you one.&quot; McAfee then points an
            assault rifle at you.
          </Text>
          <Text fontSize="md">
            &quot;Don’t forget the special ticket,&quot; he says as you almost
            pass it by. You pick up what is left of the bloody, mashed organ and
            crawl into the pit. &quot;Lay down.&quot; You do as told.
          </Text>
          <Text fontSize="md">
            McAfee starts shoveling sand on top of you. &quot;You might want to
            hold your breath,&quot; he says while laughing one last time.
          </Text>
          <Text fontSize="md">
            Trembling with fright, you hold onto McAfee’s zombified privates and
            wait for oblivion. As the last shovel of sand falls atop your face,
            you are transported away, although the scars of that realm most
            certainly remain.
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

export default NFTStory6;
