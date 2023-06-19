import { setValue, getValue } from "@thani-sh/variable";
import { setLibValue, getLibValue } from "my-lib";

setValue(123);
setLibValue(456);

console.log("app:", getValue());
console.log("lib:", getLibValue());
