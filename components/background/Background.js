import { useBreakpointValue } from "@chakra-ui/core";

/**
 * Background: plain for smaller devices; animated for larger devices.
 */
const styles = {
  bgPlain: {
    background: "url('/images/bg-plain.png') repeat-y center top",
  },
  bgLayer1: {
    backgroundImage: "url('/images/bg-stars-1.png')",
  },
  bgLayer2: {
    backgroundImage: "url('/images/bg-stars-2.png')",
  },
  bgLayer3: {
    backgroundImage: "url('/images/bg-nebula.png')",
  },
};

const Background = () => {
  const showPlain = useBreakpointValue({ base: false, lg: true });

  if (!showPlain) {
    return (
      <div className="bgContainer">
        <div style={styles.bgPlain} className="bgLayer"></div>
      </div>
    );
  };

  return (
    <div className="bgContainer">
      <div style={styles.bgLayer1} className="bgTiled bgLayer bgLayer1"></div>
      <div style={styles.bgLayer2} className="bgTiled bgLayer bgLayer2"></div>
      <div style={styles.bgLayer3} className="bgLayer bgLayer3"></div>
    </div>
  );
};

export default Background;
