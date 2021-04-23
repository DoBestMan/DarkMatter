import { useRef, useEffect } from "react";

const useDidMount = () => {
  const didMountRef = useRef(false);

  useEffect(() => {
    didMountRef.current = true;
  }, []);
  
  return didMountRef.current;
};

export default useDidMount;
