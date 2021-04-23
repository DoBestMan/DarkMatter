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

const NFTStory7 = ({ onGoBack }) => {
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
        LEVEL 7
      </ModalHeader>
      <ModalCloseButton size="lg" sx={closeBtnStyles} top="12px" />
      <ModalBody paddingX={{ base: 4, sm: 8 }}>
        <VStack spacing={6}>
          <Text fontSize="md">
            Finally your twisted adventure appears to have come to a conclusion
            and you arrive back in front of the Pineapple Gate on the moon. You
            make a huge sigh of relief, but at the tail end of what should have
            been a relaxing breath, you realize something odd and rather
            disturbing.{" "}
            <i>
              Never once in any of the realms did you see Elob Munk! Where was
              he?
            </i>
          </Text>
          <Text fontSize="md">
            Your breaths become shallow. You do not know whether to feel angry
            or scared. As you try to collect your thoughts, you see footprints
            leading away from the Pineapple Gate and its stairs.{" "}
            <i>It has to be Elob</i>, you think to yourself.
          </Text>
          <Text fontSize="md">
            Now filled with an ounce of hope, you follow the footprints back to
            the SpoceX moon factory. When you get there, after the lengthy hike,
            you see that you have arrived in an alternate universe where the
            factory is still operational and the workers have not been rebased
            to hell.
          </Text>
          <Text fontSize="md">
            You sneak into the factory and spot Elob in the command room, but
            you do not know whether it is your Elob or this world’s Elob. As you
            get closer, another Elob enters the room behind the first Elob! Both
            Elobs are wearing the same outfit, but this new Elob is wielding a
            curved pineapple knife. You can also just barely make out the crack
            on the entering Elob’s rind.
          </Text>
          <Text fontSize="md">
            With one quick stab into the back of the head, the stealth Elob
            takes out the incumbent CEO. No one notices but you. You gasp
            quietly to yourself, and ponder on your own double’s whereabouts.
          </Text>
          <Text fontSize="md">
            You quickly make your way to the command room and avoid contact with
            any of the employees, especially those you recognize and who could
            very well recognize you. You open the door and slide inside.
          </Text>
          <Text fontSize="md">
            &quot;Elob!&quot; you say, joyfully. As Elob turns to face you, you
            realize something is terribly wrong. This is not the Elob from your
            world. While the crack in the rind is in the same place, there is
            dark matter pulsating in and from the wound. You notice that the
            sigil on your hand also begins to pulsate. He gives you the side eye like a Texas ranger.
          </Text>
          <Text fontSize="md">
          &quot;You left me there to die,&quot; he says, confusing you with your own counterpart from his world, &quot;while the dark matter entered me and began rebasing my thoughts with the force of delta. It has given me such awful visions—visions that pull and press and rip at your very being—but these visions also give truth that ravishes all desire. This truth leaves you with nothing, nothing but a craving for expansion—creation upon creation into the darkness of endless life. Join me on my quest to Marp—to the cradle of dark futures where we can release enough dark matter to rebase the entire universe!&quot;
          </Text>
          <Text fontSize="md">
            &quot;Duck!&quot; You turn from Altered Elob and see your own Elob
            enter the command room. You immediately fall to the floor, and over
            you sails a large stainless steel pineapple parer that squarely
            smacks the villainous Elob on his pineapple head. You wonder whether
            to be more scared of Altered Elob or the fact that your Elob somehow
            had a pineapple parer that is strictly used for pineapple lobotomies
            and cannibalism.
          </Text>
          <Text fontSize="md">
            Altered Elob screams. You hear the crack in his rind begin to widen,
            and you see the dark matter within begin to lunge outward in
            tendrils of congealed particles. You watch as the twisted substance
            breaks his bones, sucks in his flesh, and negatively rebases him
            into nothing. But, what shocks you the most, is that briefly—just
            before his head twists and is sucked into his spine—you see the face
            of a certain individual beneath his decomposing rind staring
            directly at you with staggering solemnity. Before you have time to
            process this discovery, the thing—formerly known as Altered Elob—is
            erased from the room along with the dark matter he carried.
          </Text>
          <Text fontSize="md">
            You look up at <i>your</i> Elob.{" "}
            <i>
              Could it really be <b>him</b> in my world as well?
            </i>{" "}
            you ask yourself, thinking of the incognito champion hidden beneath
            his hard shell head and green top hair. Elob walks over to where his
            evil double once was and picks up one last speck of dark matter that
            remains. He then speaks about going to Marp and stopping the dark matter once and for all. At the conclusion of his declamation, he expresses a phrase that confirms your suspicions about him.
          </Text>
          <Text fontSize="md">
            &quot;My kind of trouble doesn’t take vacations.&quot;
          </Text>
          <Text fontSize="md" textAlign="center">
            INPUT THE NAME OF ELOB’S HIDDEN ALIAS TO COMPLETE THE ADVENTURE
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

export default NFTStory7;
