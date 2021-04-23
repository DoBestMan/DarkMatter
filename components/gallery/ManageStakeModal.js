import {
  Flex,
  Box,
  Button,
  useStyleConfig,
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  StatLabel,
  Heading,
  Stat,
  StatNumber,
  ModalCloseButton,
  ModalHeader,
  Link,
  IconButton,
  InputGroup,
  Input,
  InputRightElement,
  useBreakpointValue,
  Tooltip,
  Text,
} from "@chakra-ui/core";
import { useState } from "react";
import { MinusIcon, AddIcon } from "@chakra-ui/icons";
import { utils as ethersUtils } from "ethers";
import { useContracts } from "../../hooks/useContracts";
import LogoFullIcon from "../icons/LogoFull";
import EtherscanIcon from "../icons/Etherscan";
import InlineSpinner from "../spinners/Inline";
import FormErrors from "../forms/FormErrors";
import { isValidNumber, formatNumber } from "../../lib/numeric";

const ManageStake = ({
  depositStakedAmount,
  handleApproveClick,
  isApproved,
  isApproving,
  userTokenBalance,
  contractAddr,
  isDepositing,
  setIsDepositing,
  isWithdrawing,
  setIsWithdrawing,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formErrors, setFormErrors] = useState(null);

  const closeBtnStyles = useStyleConfig("Button", { variant: "icon-trans" });
  const primaryBtnStyles = useStyleConfig("Button", { variant: "primary" });
  const cancelBtnStyles = useStyleConfig("Button", {
    variant: "ghost-matched",
  });
  const depositBtnStyles = useStyleConfig("Button", { variant: "icon-round" });

  const isModalCentered = useBreakpointValue({ base: false, md: true });

  const [showWithdrawFields, setShowWithdrawFields] = useState(false);
  const [showDepositFields, setShowDepositFields] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const { nftStaking } = useContracts();

  const handleStake = async () => {
    await nftStaking
      .stake(ethersUtils.parseEther(inputValue))
      .then(() => {
        setIsDepositing(true);
        console.log(`${inputValue} DMT LP has successfully staked.`);
      })
      .catch(() => {
        errors.push("Error while staking...");
        setFormErrors(errors);
      });
  };

  const handleUnstake = async () => {
    const errors = [];
    await nftStaking
      .withdraw(ethersUtils.parseEther(inputValue))
      .then(() => {
        setIsWithdrawing(true);
        console.log(`${inputValue} DMT LP has successfully withdrawn.`);
      })
      .catch(() => {
        errors.push("Error while withdrawing...");
        setFormErrors(errors);
      });
  };

  const checkTokenInputValue = (value) => {
    if (value === "") {
      setFormErrors(null);

      return false;
    }

    const errors = [];

    if (
      showDepositFields &&
      !isValidNumber(value, 0.00000001, userTokenBalance)
    )
      errors.push("Enter a valid amount.");

    if (
      showWithdrawFields &&
      !isValidNumber(value, 0.00000001, depositStakedAmount)
    )
      errors.push("Enter a valid amount.");

    if (errors.length > 0) {
      setFormErrors(errors);

      return false;
    }

    setFormErrors(null);

    return true;
  };

  return (
    <>
      <Flex
        alignItems="center"
        justifyContent="center"
        padding={4}
        backgroundColor="blackAlpha.500"
        borderWidth="1px"
        borderTopRightRadius={["0", "0", "lg"]}
        borderBottomRightRadius="lg"
        borderBottomLeftRadius={["lg", "lg", "0"]}
      >
        <Button sx={primaryBtnStyles} flexGrow="1" onClick={onOpen}>
          Manage Farm
        </Button>
      </Flex>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered={isModalCentered}
        size="xl"
        scrollBehavior="outside"
        autoFocus={false}
        returnFocusOnClose={false}
      >
        <ModalOverlay background="blackAlpha.800">
          <ModalContent
            marginX={4}
            backgroundColor="gray.900"
            borderRadius="lg"
          >
            <ModalHeader
              fontSize="2xl"
              fontWeight="bold"
              textAlign="center"
              paddingTop={6}
              paddingX="4rem"
              paddingBottom={6}
            >
              Deposit DMT LP, Earn NaOH, Mint NFTs
            </ModalHeader>
            <ModalCloseButton size="lg" sx={closeBtnStyles} top="12px" />
            <Box width="100%" maxWidth="md" marginX="auto" padding={4}>
              <Box
                display="block"
                borderWidth="1px"
                borderRadius="lg"
                backgroundColor="blackAlpha.500"
                paddingY="1rem"
              >
                <InlineSpinner
                  isLoading={isApproving || isWithdrawing || isDepositing}
                  message={
                    isApproving
                      ? "Approving..."
                      : isWithdrawing
                      ? "Withdrawing..."
                      : isDepositing
                      ? "Staking..."
                      : ""
                  }
                  minHeight={isApproving ? "21.5rem" : "24.5rem"}
                >
                  <Heading
                    size="lg"
                    paddingX={4}
                    paddingBottom={6}
                    textAlign="center"
                    lineHeight="base"
                  >
                    DMT LP
                  </Heading>
                  <Box textAlign="center">
                    <LogoFullIcon
                      color="whiteAlpha.500"
                      width="5.5rem"
                      height="5.5rem"
                    />
                  </Box>
                  <Stat paddingTop={8}>
                    <StatLabel
                      fontSize="xl"
                      textAlign="center"
                      color="gray.400"
                    >
                      DMT LP Staked
                    </StatLabel>
                    <StatNumber textAlign="center">
                      {formatNumber(depositStakedAmount, 6)}
                    </StatNumber>
                  </Stat>
                  <Flex
                    paddingTop="1.375rem"
                    paddingX={4}
                    paddingBottom={2}
                    display="flex"
                    justifyContent="center"
                  >
                    {!isApproved ? (
                      <Button
                        sx={primaryBtnStyles}
                        flexGrow="1"
                        onClick={handleApproveClick}
                      >
                        Approve DMT LP
                      </Button>
                    ) : (
                      <>
                        <Tooltip
                          color="whiteAlpha.900"
                          fontSize="md"
                          label={"Stake DMT LP"}
                          closeDelay={50}
                          backgroundColor="purple.800"
                          borderRadius="lg"
                          padding="0.5rem 0.875rem"
                          hasArrow
                        >
                          <IconButton
                            onClick={() => {
                              if (!showDepositFields) {
                                setShowWithdrawFields(false);
                                setShowDepositFields(true);
                                checkTokenInputValue("");
                                setInputValue("");
                              }
                            }}
                            aria-label="Stake"
                            sx={depositBtnStyles}
                            marginX={4}
                            icon={<AddIcon boxSize={6} />}
                          />
                        </Tooltip>
                        <Tooltip
                          color="whiteAlpha.900"
                          fontSize="md"
                          label="Withdraw DMT LP"
                          closeDelay={50}
                          backgroundColor="purple.800"
                          borderRadius="lg"
                          padding="0.5rem 0.875rem"
                          hasArrow
                        >
                          <IconButton
                            onClick={() => {
                              if (!showWithdrawFields) {
                                setShowWithdrawFields(true);
                                setShowDepositFields(false);
                                checkTokenInputValue("");
                                setInputValue("");
                              }
                            }}
                            aria-label="Withdraw"
                            sx={depositBtnStyles}
                            marginX={4}
                            icon={<MinusIcon boxSize={6} />}
                          />
                        </Tooltip>
                      </>
                    )}
                  </Flex>
                  {showDepositFields && (
                    <Box marginTop={4}>
                      <Box paddingTop={0} paddingBottom={4} paddingX={6}>
                        <form>
                          <InputGroup size="md">
                            <Input
                              type="text"
                              fontSize="lg"
                              padding="0.5rem 5.125rem 0.5rem 1rem"
                              height="auto"
                              backgroundColor="blackAlpha.400"
                              placeholder="0.00"
                              value={inputValue}
                              onChange={(e) => {
                                checkTokenInputValue(e.target.value);
                                setInputValue(e.target.value);
                              }}
                            />
                            <InputRightElement
                              width="auto"
                              height="auto"
                              paddingX={0}
                              top="0.375rem"
                              right="0.375rem"
                            >
                              <Button
                                size="sm"
                                height="auto"
                                padding="0.375rem 0.875rem"
                                lineHeight="base"
                                onClick={() => {
                                  checkTokenInputValue("");
                                  setInputValue(userTokenBalance.toString());
                                }}
                              >
                                MAX
                              </Button>
                            </InputRightElement>
                          </InputGroup>
                        </form>

                        <FormErrors errors={formErrors} />
                      </Box>

                      <Flex justifyContent="flex-end" paddingX={6}>
                        <Button
                          marginRight={3}
                          sx={primaryBtnStyles}
                          onClick={async () => {
                            if (checkTokenInputValue(inputValue)) {
                              await handleStake();
                              setShowDepositFields(false);
                            }
                          }}
                        >
                          Stake
                        </Button>
                        <Button
                          sx={cancelBtnStyles}
                          onClick={() => {
                            checkTokenInputValue("");
                            setShowDepositFields(false);
                          }}
                        >
                          Cancel
                        </Button>
                      </Flex>
                    </Box>
                  )}
                  {showWithdrawFields && (
                    <Box marginTop={4}>
                      <Box paddingTop={0} paddingBottom={4} paddingX={6}>
                        <form>
                          <InputGroup size="md">
                            <Input
                              type="text"
                              fontSize="lg"
                              padding="0.5rem 5.125rem 0.5rem 1rem"
                              height="auto"
                              backgroundColor="blackAlpha.400"
                              placeholder="0.00"
                              value={inputValue}
                              onChange={(e) => {
                                checkTokenInputValue(e.target.value);
                                setInputValue(e.target.value);
                              }}
                            />
                            <InputRightElement
                              width="auto"
                              height="auto"
                              paddingX={0}
                              top="0.375rem"
                              right="0.375rem"
                            >
                              <Button
                                size="sm"
                                height="auto"
                                padding="0.375rem 0.875rem"
                                lineHeight="base"
                                onClick={() => {
                                  checkTokenInputValue("");
                                  setInputValue(depositStakedAmount.toString());
                                }}
                              >
                                MAX
                              </Button>
                            </InputRightElement>
                          </InputGroup>
                        </form>
                        <FormErrors errors={formErrors} />
                      </Box>

                      <Flex justifyContent="flex-end" paddingX={6}>
                        <Button
                          marginRight={3}
                          sx={primaryBtnStyles}
                          onClick={async () => {
                            if (checkTokenInputValue(inputValue)) {
                              await handleUnstake();
                              setShowWithdrawFields(false);
                            }
                          }}
                        >
                          Withdraw
                        </Button>
                        <Button
                          sx={cancelBtnStyles}
                          onClick={() => {
                            checkTokenInputValue("");
                            setShowWithdrawFields(false);
                          }}
                        >
                          Cancel
                        </Button>
                      </Flex>
                    </Box>
                  )}
                </InlineSpinner>
              </Box>
            </Box>
            <Text textAlign="center" fontSize="sm">
              ANY STAKE UNDER 1 LP TOKEN WILL NOT YIELD NAoH
            </Text>
            <Flex paddingBottom={4} justifyContent="center">
              <Link
                href={`https://etherscan.io/address/${contractAddr}`}
                isExternal
                display="flex"
                alignItems="center"
                color="whiteAlpha.600"
                fontSize="md"
                padding="0.625rem 1rem"
                _hover={{
                  color: "whiteAlpha.800",
                  textDecoration: "none",
                }}
              >
                <EtherscanIcon width="1.5rem" height="1.5rem" marginRight={3} />
                <Box as="span">View Contract on Etherscan</Box>
              </Link>
            </Flex>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </>
  );
};

export default ManageStake;
