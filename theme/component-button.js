const Button = {
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
    "icon-trans": {
      background: "none",
      borderRadius: "lg",
      _hover: {
        background: "purple.800",
      },
      _active: {
        background: "purple.800",
      },
      _focus: {
        background: "purple.800",
      },
    },
    primary: {
      lineHeight: 6,
      textAlign: "center",
      fontWeight: "bold",
      textTransform: "uppercase",
      display: "block",
      height: "auto",
      border: "none",
      minHeight: 0,
      padding: "0.625rem 1rem",
      borderRadius: "lg",
      background: "purple.900",
      _hover: {
        background: "purple.800",
      },
      _active: {
        background: "purple.800",
      },
      _focus: {
        background: "purple.800",
      },
    },
    "icon-round": {
      padding: 4,
      height: "auto",
      minWidth: 0,
      background: "purple.900",
      borderRadius: "50%",
      _hover: {
        background: "purple.800",
      },
      _active: {
        background: "purple.800",
      },
      _focus: {
        background: "purple.800",
      },
    },
    "ghost-matched": {
      lineHeight: 6,
      textAlign: "center",
      fontWeight: "bold",
      textTransform: "uppercase",
      display: "block",
      height: "auto",
      border: "none",
      minHeight: 0,
      padding: "0.625rem 1rem",
      borderRadius: "lg",
      background: "none",
      _hover: {
        background: "purple.800",
      },
      _active: {
        background: "purple.800",
      },
      _focus: {
        background: "purple.800",
      },
    },
  },
};

export default Button;
