import _map from "lodash/map";
import _size from "lodash/size";
import _isArray from "lodash/isArray";

import {
  List,
  ListItem,
  ListIcon,
} from "@chakra-ui/core";

import { WarningIcon } from "@chakra-ui/icons";

const FormErrors = ({ errors = null }) => {
  if (!_isArray(errors) || !_size(errors)) return null;

  return (
    <List paddingTop={4} spacing={3}>
      {_map(
        errors, 
        (errorCopy, index) => (
          <ListItem 
            key={`item${index}`}
            display="flex" 
            justifyContent="flex-start"
            alignItems="center"
            borderWidth="1px"
            borderColor="red.600"
            borderRadius="md"
            paddingTop={2}
            paddingBottom={2}
            paddingX={3}
            fontSize="lg"
            color="red.100"
            backgroundColor="red.900"
          >
            <ListIcon as={WarningIcon} color="red.100" marginRight="0.625rem" />{errorCopy}
          </ListItem>
        )
      )}
    </List>
  );
};

export default FormErrors;
