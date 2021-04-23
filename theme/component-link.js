const Link = {
  variants: {
    transparent: {
      borderRadius: "lg",
      background: "none",
      boxShadow: "none",
      _hover: {
        background: "none",
        boxShadow: "none",
      },
      _focus: {
        background: "none",
        boxShadow: "none",
      },
      _active: {
        background: "none",
        boxShadow: "none",
      },
    },
    nav: {
      fontWeight: "bold",
      textTransform: "uppercase",
      display: "block",
      padding: "0.625rem 1rem",
      borderRadius: "lg",
      _hover: {
        textDecoration: "none",
        background: "purple.800",
      },
    },
    "drawer-nav": {
      fontWeight: "bold",
      textTransform: "uppercase",
      display: "block",
      padding: "0.625rem 2.5rem",
      _hover: {
        textDecoration: "none",
        background: "purple.800",
      },
    },
    primary: {
      textAlign: "center",
      fontWeight: "bold",
      textTransform: "uppercase",
      display: "block",
      padding: "0.625rem 1rem",
      borderRadius: "lg",
      background: "purple.900",
      _hover: {
        textDecoration: "none",
        background: "purple.800",
      },
    },
    "icon-only": {
      color: "whiteAlpha.500",
      _hover: {
        color: "purple.800",
      },
      transition: "all 0.15s ease-out",
    },
  },
};

export default Link;
