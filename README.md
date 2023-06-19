# test-resolve-with-links

A POC to test how node module resolution works in a common monorepo scenario.

Both an app in the monorepo `my-app` and a shared library `my-lib` depend on the same version of a **stateful** npm dependency (@thani-sh/variable).

```
Monorepo
 | apps
 └── my-app
 · └── node_modules/@thani-sh/variable
 | libs
 └── my-lib
   └── node_modules/@thani-sh/variable
```

Because of how node module resolution works with symlinks, the test app `my-app` ends up using 2 copies of the shared dependency. The app resolves to the npm module in `apps/my-app/node_modules/`. When imported from the shared library `my-lib` it resolves to `libs/my-lib/node_modules/`.

```js
import { setValue, getValue } from "@thani-sh/variable";
import { setLibValue, getLibValue } from "my-lib";

setValue("APP");
setLibValue("LIB");

console.log("app:", getValue());
console.log("lib:", getLibValue());
```

Let's run the code:

```
$ yarn workspace my-app start

app: APP
lib: LIB
```

Attempts to fix the issue:

- Use `@thanish/variable` as a peerDependency on `my-lib` and install it on `my-app`
  - Fails to run with error `ERR_MODULE_NOT_FOUND`
  - `my-lib` is unable to find the peerDependency although it is installed in `my-app`
- Use the config `nodeLinker: pnp` on .yarnrc.yml file
  - Both my-app and my-lib resolves to a single version of the library
