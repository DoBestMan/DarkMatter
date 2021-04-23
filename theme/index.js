import { extendTheme } from "@chakra-ui/core";

import Button from "./component-button.js";
import Link from "./component-link.js";
import styles from "./styles.js";

const overrides = {
  components: {
    Button,
    Link,
  },
  styles,
}

export default extendTheme(overrides);
