import { setValue, getValue } from "@thani-sh/variable";
import { setLibValue, getLibValue } from "my-lib";

setValue("APP");
setLibValue("LIB");

console.log("app:", getValue());
console.log("lib:", getLibValue());
