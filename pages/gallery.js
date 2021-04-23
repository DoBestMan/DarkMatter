import { useState, useMemo } from "react";
import { useWallet } from "use-wallet";
import { utils as ethersUtils } from "ethers";
import {
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  useBreakpointValue,
} from "@chakra-ui/core";
import { formatNumber } from "../lib/numeric";
import useInterval from "../hooks/useInterval";
import usePageTitle from "../hooks/usePageTitle";
import {
  Level1,
  Level2,
  Level3,
  Level4,
  Level5,
  Level6,
  Level7,
} from "../components/story";
import { isWalletConnected, getWalletAddress } from "../lib/wallet";
import { useContracts } from "../hooks/useContracts";
import ManageStakeModal from "../components/gallery/ManageStakeModal";
import GalleryCard from "../components/gallery/GalleryCard";
import InputPassword from "../components/gallery/InputPassword";

const approvalAmount = 22222;

const CARD_BACK_URL =
  "https://www.dropbox.com/sh/a43mnv6kg9t0yi2/AACIl90UuDCLeAG6ct5clfLxa/BLANK.mp4?raw=1";

const nftData = [
  {
    id: "1",
    name: "Pineapple Gate",
    image:
      "https://www.dropbox.com/sh/a43mnv6kg9t0yi2/AABXvXyTZgB9jASiNVHH46Zoa/DMT_1.mp4?raw=1",
  },
  {
    id: "2",
    name: "Cosmic Fuel",
    image:
      "https://www.dropbox.com/sh/a43mnv6kg9t0yi2/AAC2YeY40K1U8PkZXuaK-9Bua/DMT_2.mp4?raw=1",
  },
  {
    id: "3",
    name: "Rug in Prod",
    image:
      "https://www.dropbox.com/sh/a43mnv6kg9t0yi2/AAD4X1giMZlsI_MUBP_owSU6a/DMT_3.mp4?raw=1",
  },
  {
    id: "4",
    name: "Proof of Ponzi",
    image:
      "https://www.dropbox.com/sh/a43mnv6kg9t0yi2/AACF30g4PvM3ewjWu1Q32n6ca/DMT_4.mp4?raw=1",
  },
  {
    id: "5",
    name: "Bloody Sushi",
    image:
      "https://www.dropbox.com/sh/a43mnv6kg9t0yi2/AADGKGpkGBDK8e1AFCi3bDb4a/DMT_5.mp4?raw=1",
  },
  {
    id: "6",
    name: "Masochist Munchies",
    image:
      "https://www.dropbox.com/sh/a43mnv6kg9t0yi2/AABWLf9qAG0yuipHqy4LY-6na/DMT_6.mp4?raw=1",
  },
  {
    id: "7",
    name: "Daddy's Home",
    image:
      "https://www.dropbox.com/sh/a43mnv6kg9t0yi2/AAAv6JVLHHxdeYAyM51Ryub_a/DMT_7.mp4?raw=1",
  },
  {
    id: "8",
    name: "NFT 8",
    image:
      "https://www.dropbox.com/sh/a43mnv6kg9t0yi2/AADeMva6tjAE1i6gv3rkMFOfa/DMT_8.mp4?raw=1",
  },
];

const Gallery = () => {
  usePageTitle("Gallery");

  const wallet = useWallet();
  const { nftStaking, dmtLpToken, dmtLtd } = useContracts();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isModalCentered = useBreakpointValue({ base: false, md: true });

  const [current, setCurrent] = useState(0);
  const [showPasswordInput, setShowInputPassword] = useState(false);
  const [selectedCard, setSelectedCard] = useState(-1);

  const [earnedAmount, setEarnedAmount] = useState(0);
  const [depositStakedAmount, setDepositStakedAmount] = useState(0);
  const [userTokenBalance, setUserTokenBalance] = useState(0);

  const [isApproved, setIsApproved] = useState(false);
  const [isApproving, setIsApproving] = useState(false);
  const [arrMaxSupply, setArrMaxSupply] = useState(new Array(8).fill(0));
  const [arrAvailableSupply, setArrAvailableSupply] = useState(
    new Array(8).fill(0)
  );
  const [arrCards, setArrCards] = useState(new Array(8).fill(0));
  const [ownedCards, setOwnedCards] = useState(new Array(8).fill(0));

  const currentCard = useMemo(() => {
    let i = ownedCards.length - 1;
    while (i >= 0 && ownedCards[i] === 0) {
      i--;
    }
    return i + 1;
  }, [ownedCards]);

  const [isDepositing, setIsDepositing] = useState(false);
  const [isWithdrawing, setIsWithdrawing] = useState(false);

  const handleUnlock = async (card) => {
    if (card === "4" || card === "7") {
      setSelectedCard(card);
      setShowInputPassword(true);
    } else {
      await nftStaking.redeem(card).catch(() => {
        window.alert("Do you hold the right key?");
      });
      setSelectedCard(-1);
    }
  };

  const checkWallet = () => {
    if (!isWalletConnected(wallet) || !wallet.ethereum) {
      return false;
    }

    return true;
  };

  useInterval(() => {
    async function checkLiveInfo() {
      const array2 = [];
      for (let i = 1; i <= 8; i++) {
        array2.push(dmtLtd.totalSupply(i));
      }
      await Promise.all(array2).then((result) => setArrAvailableSupply(result));

      if (arrMaxSupply[0] === 0) {
        const array1 = [];
        for (let i = 1; i <= 8; i++) {
          array1.push(dmtLtd.tokenMaxSupply(i));
        }
        await Promise.all(array1).then((result) => setArrMaxSupply(result));
      }

      if (arrCards[0] === 0) {
        const array3 = [];
        for (let i = 1; i <= 8; i++) {
          array3.push(nftStaking.cards(i));
        }
        await Promise.all(array3).then((result) => setArrCards(result));
      }

      if (!checkWallet()) return;

      const array4 = [];
      for (let i = 1; i <= 8; i++) {
        array4.push(dmtLtd.balanceOf(wallet.account, i));
      }
      await Promise.all(array4).then((result) => setOwnedCards(result));

      const liveAllowance = await dmtLpToken.allowance(
        wallet.account,
        nftStaking.address
      );

      const isLiveApproved = liveAllowance.gt(
        ethersUtils.parseEther((approvalAmount / 2).toString())
      );

      if (isLiveApproved !== isApproved) setIsApproved(isLiveApproved);
      if (isLiveApproved) setIsApproving(false);

      const liveDepositBalance = await nftStaking.balanceOf(wallet.account);

      if (liveDepositBalance !== depositStakedAmount) {
        setDepositStakedAmount(liveDepositBalance);
        if (isDepositing) setIsDepositing(false);
        if (isWithdrawing) setIsWithdrawing(false);
      }

      const liveTokenBalance = await dmtLpToken.balanceOf(wallet.account);

      if (liveTokenBalance !== userTokenBalance)
        setUserTokenBalance(liveTokenBalance);

      const liveEarnedBalance = await nftStaking.earned(wallet.account);

      if (liveEarnedBalance !== earnedAmount)
        setEarnedAmount(liveEarnedBalance);
    }

    checkLiveInfo().catch((e) => console.log("err"));
  }, 2000);

  const handleApproveClick = () => {
    setIsApproving(true);
    dmtLpToken
      .approve(
        nftStaking.address,
        ethersUtils.parseEther(approvalAmount.toString())
      )
      .catch((_) => setIsApproving(false));
  };

  return (
    <Flex
      margin="0 auto"
      width="100%"
      maxWidth="70rem"
      paddingY="3rem"
      flexWrap="wrap"
      alignItems="center"
      justifyContent="center"
      minHeight="calc(100vh - 9.5rem)"
    >
      {checkWallet() && (
        <Flex
          margin="0 auto"
          width="100%"
          maxWidth="70rem"
          paddingX={4}
          marginBottom="2rem"
          flexDirection={["column", "column", "row"]}
          justifyContent="flex-end"
        >
          <Flex
            alignItems="center"
            justifyContent="center"
            borderWidth="1px"
            borderTopRightRadius={["lg", "lg", "0"]}
            borderBottomLeftRadius={["0", "0", "lg"]}
            borderTopLeftRadius="lg"
            backgroundColor="blackAlpha.500"
            paddingY={4}
            paddingX={8}
            textAlign="center"
          >
            {formatNumber(depositStakedAmount, 6)} DMT LP Staked
          </Flex>
          <Flex
            alignItems="center"
            justifyContent="center"
            borderWidth="1px"
            borderTopWidth={["0", "0", "1px"]}
            borderRightWidth={["1px", "1px", "0"]}
            borderBottomWidth={["0", "0", "1px"]}
            borderLeftWidth={["1px", "1px", "0"]}
            backgroundColor="blackAlpha.500"
            paddingY={4}
            paddingX={8}
            textAlign="center"
          >
            {formatNumber(earnedAmount, 3)} NaOH Earned
          </Flex>
          <ManageStakeModal
            depositStakedAmount={depositStakedAmount}
            handleApproveClick={handleApproveClick}
            isApproving={isApproving}
            isApproved={isApproved}
            userTokenBalance={userTokenBalance}
            contractAddr={nftStaking.address}
            isDepositing={isDepositing}
            setIsDepositing={setIsDepositing}
            isWithdrawing={isWithdrawing}
            setIsWithdrawing={setIsWithdrawing}
          />
        </Flex>
      )}
      {showPasswordInput && (
        <InputPassword
          level={selectedCard}
          onSuccess={async () => {
            await nftStaking.redeem(selectedCard).catch(console.error);
            setSelectedCard(-1);
            setShowInputPassword(false);
          }}
          onClose={() => {
            setSelectedCard(-1);
            setShowInputPassword(false);
          }}
        />
      )}
      <Flex
        margin="0 auto"
        width="100%"
        padding={0}
        flexWrap="wrap"
        alignItems="center"
        justifyContent={["center", "space-between"]}
      >
        {nftData.map(({ id, name, image }, index) =>
          index <= 5 ? (
            <GalleryCard
              key={id}
              name={name}
              level={id}
              current={arrAvailableSupply[index]}
              total={arrMaxSupply[index]}
              disabled={arrMaxSupply[index] === 0}
              minValueNeeded={arrCards[index]}
              thumbnailUrl={!ownedCards[index] ? CARD_BACK_URL : image}
              currentCard={currentCard}
              handleUnlock={handleUnlock}
              onOpen={onOpen}
              setCurrent={setCurrent}
              earnedAmount={earnedAmount}
            />
          ) : null
        )}
      </Flex>
      <Flex
        margin="0 auto"
        width="100%"
        maxWidth="70rem"
        padding={0}
        flexWrap="wrap"
        alignItems="center"
        justifyContent="center"
      >
        <GalleryCard
          name={nftData[6].name}
          level={nftData[6].id}
          current={arrAvailableSupply[6]}
          total={arrMaxSupply[6]}
          disabled={arrMaxSupply[6] === 0}
          minValueNeeded={arrCards[6]}
          thumbnailUrl={!ownedCards[6] ? CARD_BACK_URL : nftData[6].image}
          currentCard={currentCard}
          handleUnlock={handleUnlock}
          onOpen={onOpen}
          setCurrent={setCurrent}
          earnedAmount={earnedAmount}
        />
      </Flex>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="xl"
        isCentered={isModalCentered}
        scrollBehavior="inside"
        autoFocus={false}
        returnFocusOnClose={false}
      >
        <ModalOverlay background="blackAlpha.800">
          <ModalContent
            marginX={4}
            backgroundColor="gray.900"
            borderRadius="lg"
            paddingBottom={4}
          >
            {current === 1 && <Level1 onGoBack={onClose} />}
            {current === 2 && <Level2 onGoBack={onClose} />}
            {current === 3 && <Level3 onGoBack={onClose} />}
            {current === 4 && <Level4 onGoBack={onClose} />}
            {current === 5 && <Level5 onGoBack={onClose} />}
            {current === 6 && <Level6 onGoBack={onClose} />}
            {current === 7 && <Level7 onGoBack={onClose} />}
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </Flex>
  );
};

export default Gallery;
