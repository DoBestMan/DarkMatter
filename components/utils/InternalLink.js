import { Link as ChakraLink } from "@chakra-ui/core";
import NextLink from "next/link";
import { useRouter } from "next/router";

/**
 * Fixes NextJS's buggy implementation of react-router-dom.
 * Without this, Chakra's styleProps are ignored.
 */
const InternalLink = ({
  href,
  shallow,
  children,
  prefetch,
  replace,
  scroll,
  linkAs,
  ...rest
}) => {
  const linkProps = {
    as: linkAs,
    href,
    prefetch,
    replace,
    scroll,
    shallow,
  };

  const { pathname } = useRouter();
  const isActive = pathname === href;

  return (
    <NextLink {...linkProps} passHref>
      <ChakraLink {...rest} aria-current={isActive ? "page" : undefined}>
        {children}
      </ChakraLink>
    </NextLink>
  );
};

export default InternalLink;
