import { setValue, getValue } from "@thani-sh/variable";

export function setLibValue(val) {
  setValue(val);
}

export function getLibValue() {
  return getValue();
}
