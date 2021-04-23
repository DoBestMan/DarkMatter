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

const NFTStory5 = ({ onGoBack }) => {
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
        LEVEL 5
      </ModalHeader>
      <ModalCloseButton size="lg" sx={closeBtnStyles} top="12px" />
      <ModalBody paddingX={{ base: 4, sm: 8 }}>
        <VStack spacing={6}>
          <Text fontSize="md">
            Before you are four chefs, and by the ingredients set out before
            them—arrays of seaweed, white rice, and brightly-colored raw
            fish—you can tell that they are sushi chefs. You sit on a barstool
            behind slanted glass that lines the counter of a sushi bar; the
            chefs are on the other side. One of the chefs is a panda donning an
            apron and hat and is speaking to the other three; you know
            immediately that this is the infamous Chef Nomi.
          </Text>
          <Text fontSize="md">
            &quot;I hope that your craft continues to evolve. Don't let my
            mistake deter you from being the 100% best chef you can be. Your
            success as a chef will set a precedent for many more chefs.&quot;
          </Text>
          <Text fontSize="md">
            At the conclusion of his words, the other three chefs proceed to
            undress Chef Nomi, procure deftly sharpened chef knives, and slice
            him up into finely apportioned sheets of flesh. They then take the
            Nomi meat—all of it—and meticulously put together several dishes of
            bloody panda sushi. You watch in complete shock and disgust.
          </Text>
          <Text fontSize="md">
            In your mesmerization, you neglect to notice another patron sitting
            with you at the bar—it is Sam Bankman-Fried. Together, under a
            haunting display of humility and normalcy, the three standing sushi
            chefs offer their freshly prepared dishes to Sam. He takes the sushi
            and simply says, &quot;Ok uh,&quot; before surprisingly going on to
            lustfully eat the ensemble of bloody cuisine.
          </Text>
          <Text fontSize="md">
            Several plates in, you can bear no more of the grotesquery and dash
            out of the establishment.
          </Text>
          <Text fontSize="md">
            When you pass through the doorway, you are not taken to another
            realm as you expect. At first, you panic, but then realize why. You
            go back inside, quickly retrieve the necessary key, and then exit
            again, this time being whisked away to the next dimension.
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

export default NFTStory5;
