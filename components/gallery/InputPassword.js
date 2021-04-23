import {
  Flex,
  Box,
  Button,
  useStyleConfig,
  Modal,
  ModalOverlay,
  ModalContent,
  InputGroup,
  Input,
  useBreakpointValue,
} from "@chakra-ui/core";
import { useState } from "react";
import FormErrors from "../forms/FormErrors";

const InputPassword = ({ level, onSuccess, onClose }) => {
  const [formErrors, setFormErrors] = useState(null);

  const primaryBtnStyles = useStyleConfig("Button", { variant: "primary" });
  const cancelBtnStyles = useStyleConfig("Button", {
    variant: "ghost-matched",
  });

  const isModalCentered = useBreakpointValue({ base: false, md: true });

  const [inputValue, setInputValue] = useState("");

  const checkTokenInputValue = (value) => {
    if (value === "") {
      setFormErrors(null);

      return false;
    }

    const errors = [];

    if (level === "4" && inputValue !== "heyheyhey")
      errors.push("Enter the correct password.");

    if (level === "7" && inputValue !== "chucknorris")
      errors.push("Enter the correct password.");

    if (errors.length > 0) {
      setFormErrors(errors);

      return false;
    }

    setFormErrors(null);

    return true;
  };

  return (
    <>
      <Modal
        isOpen={true}
        onClose={onClose}
        isCentered={isModalCentered}
        size="sm"
        scrollBehavior="outside"
        autoFocus={false}
        returnFocusOnClose={false}
      >
        <ModalOverlay background="blackAlpha.800">
          <ModalContent backgroundColor="gray.900" borderRadius="lg">
            <Box width="100%" maxWidth="md" marginX="auto" padding={4}>
              <Box>
                <Box paddingTop={0} paddingBottom={4}>
                  <InputGroup size="md">
                    <Input
                      autoComplete="off"
                      id="not-password"
                      name="not-password"
                      type="password"
                      fontSize="lg"
                      padding="0.5rem 5.125rem 0.5rem 1rem"
                      height="auto"
                      backgroundColor="blackAlpha.400"
                      placeholder="Input Password"
                      value={inputValue}
                      onChange={(e) => {
                        setInputValue(e.target.value);
                      }}
                      onKeyUp={async (e) => {
                        if (e.keyCode === 13) {
                          e.preventDefault();
                          if (checkTokenInputValue(inputValue)) {
                            await onSuccess();
                          }
                        }
                      }}
                    />
                  </InputGroup>

                  <FormErrors errors={formErrors} />
                </Box>

                <Flex justifyContent="flex-end" paddingX={2}>
                  <Button
                    marginRight={3}
                    sx={primaryBtnStyles}
                    onClick={async (e) => {
                      e.preventDefault();
                      if (checkTokenInputValue(inputValue)) {
                        await onSuccess();
                      }
                    }}
                    disabled={inputValue === ""}
                  >
                    OK
                  </Button>
                  <Button sx={cancelBtnStyles} onClick={() => onClose()}>
                    Cancel
                  </Button>
                </Flex>
              </Box>
            </Box>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </>
  );
};

export default InputPassword;
