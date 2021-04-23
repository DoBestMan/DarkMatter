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

const NFTStory4 = ({ onGoBack }) => {
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
        LEVEL 4
      </ModalHeader>
      <ModalCloseButton size="lg" sx={closeBtnStyles} top="12px" />
      <ModalBody paddingX={{ base: 4, sm: 8 }}>
        <VStack spacing={6}>
          <Text fontSize="md">
            Soft green lawn appears beneath your feet and you stand in front of
            a huge circus tent with red and white stripes. The entrance is
            before you and from within a vivid yellow light emanates. Atop the
            entrance is a sign that reads:
          </Text>
          <Text fontSize="md" textAlign="center">
            THE ORIGINAL RUG
          </Text>
          <Text fontSize="md">
            The light is bright and you cannot see what it is inside the tent,
            but you hear a very distinct sound coming from within.
          </Text>
          <Text fontSize="md">
            &quot;Hey, hey, hey. Hey, hey, hey. Wassa, wassa, wassa.&quot;
          </Text>
          <Text fontSize="md">
            An attendant is manning the entrance, saying, &quot;Step right up!
            Come and witness the one and only amazing and original rug!&quot;
          </Text>
          <Text fontSize="md">
            You begin to walk past the circus employee to enter the show, but he
            stops you and requests a password. It is not a big deal because you
            know exactly what it is. You tell the attendant the password and
            walk inside the tent, voyaging to another realm.
          </Text>
          <Text fontSize="md" textAlign="center">
            INPUT THE PASSWORD
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

export default NFTStory4;
