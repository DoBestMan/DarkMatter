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

const NFTStory1 = ({ onGoBack }) => {
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
        LEVEL 1
      </ModalHeader>
      <ModalCloseButton size="lg" sx={closeBtnStyles} top="12px" />
      <ModalBody paddingX={{ base: 4, sm: 8 }} paddingTop={0}>
        <VStack spacing={6}>
          <Text fontSize="md">
            You have no idea of what occurred when you stare down at the memo
            sent from the SpoceX moon factory, but you sense the urgency.
          </Text>
          <Text fontSize="md" textAlign="center">
            EMERGENCY.
            <br />
            COME TO THE SPOCEX MOON FACTORY ASAP.
            <br />
            BRING THE MEME GRAIL.
            <br />
            THE FATE OF THE UNIVERSE IS IN YOUR HANDS.
            <br />
            -ELOB
          </Text>
          <Text fontSize="md">
            In exiting your spacecraft on the SpoceX moon factory landing pad,
            the severity of the situation is immediately known as you look upon
            Elob’s cracked rind and the dried trickle of yellow juice that had
            run down his face to the tips of his brown jacket. In greeting you,
            his first words are, &quot;Do you have the grail?&quot; to which you
            nod in affirmation, revealing the relic within your possession.
          </Text>
          <Text fontSize="md">
            The eccentric CEO immediately leads you to a trail that diverges
            from the factory and traverses down a steep grade into a moon
            crater. During the expedition, Elob recounts the events that
            unfolded. The trek outlasts the tale, so for nearly an hour longer,
            you listen to the esteemed entrepreneur divulge the secrets of
            successful pineapple farming. He speaks of things such as &quot;The
            Pineapple Dilemma,&quot; but you really do not see how there is a
            need to glean such information at such a critical moment in time.
          </Text>
          <Text fontSize="md">
            Eventually, you are led into an alcove cut into the basin of the
            moon crater. Through a brief stint of darkness, you walk blindly
            into the unknown. When light returns, you are taken back by what you
            find. There is a chamber hundreds of feet high with streaks of
            sunlight pushing through thousands of quarter-sized holes in the
            ceiling. What these beams of light reveal is stunning.
          </Text>
          <Text fontSize="md">
            A stargate stands before you and it makes your hair stand on end.The
            structure is nearly thirty feet tall and fifty feet wide with a
            broad set of stairs ascending to its opening. The inactive portal is
            a daunting archway with a framework both mesmerizing and unnerving.
            The thick, dark moon rock border looms like a silent stalker,
            staring into your soul, ready to carry it endlessly into the stars.
            It holds 13 symbols, cut boldly and crisply into the rock as to
            present every stroke and detail of one symbol clearly
            distinguishable from those of each and every one of the other
            symbols.
          </Text>
          <Text fontSize="md">
            At a distance from the stargate—like the podium of a conductor
            before his orchestra—is a huge obelisk of dark moon rock. A winding
            staircase wraps around it to where—at its peak—a jagged altar has
            been erected.
          </Text>
          <Text fontSize="md">
            &quot;This,&quot; Elob says, gesturing up to the stargate.
            &quot;This is how we make things right. We’ll find a parallel world
            where yTSLA and SpoceX succeed without the use of the rebase
            machine. You must submit the Meme Grail as a sacrifice there on that
            altar. Only by doing so can we activate the Pineapple Gate.&quot;
          </Text>
          <Text fontSize="md" textAlign="center">
            HOLD THE REQUIRED RELIC TO BEGIN YOUR ADVENTURE
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

export default NFTStory1;
