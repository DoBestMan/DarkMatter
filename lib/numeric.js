import _isNaN from "lodash/isNaN";
import _isNull from "lodash/isNull";

const formatNumber = (
  value,
  decimalPlaces = 2,
  defaultValue = "...",
  prefix = "",
  suffix = ""
) => {
  const parsedValue = parseFloat("" + value);

  if (!_isNaN(parsedValue))
    return `${prefix}${parsedValue.toFixed(decimalPlaces)}${suffix}`;

  return defaultValue;
};

const isValidNumber = (value, min = null, max = null) => {
  const parsedValue = parseFloat("" + value);

  if (
    _isNaN(parsedValue) ||
    (!_isNull(min) && parsedValue < min) ||
    (!_isNull(max) && parsedValue > max)
  ) {
    return false;
  }

  return true;
};

export { formatNumber, isValidNumber };
