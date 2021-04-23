import { useEffect } from "react";
import { useRouter } from "next/router";

import useDidMount from "../../hooks/useDidMount";
import { scrollToPosition } from "../../lib/scroll";

import Container from "./Container";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";

const Layout = ({ children }) => {
  const didMount = useDidMount();
  const router = useRouter();
  const { asPath } = router;

  /**
   * Scroll to top on each route change using `asPath` (resolved path),
   * not `pathname` (may be a dynamic route).
   */
  useEffect(() => {
    if (didMount) {
      scrollToPosition();
    }
  }, [asPath]);

  return (
    <Container>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </Container>
  );
};

export default Layout;