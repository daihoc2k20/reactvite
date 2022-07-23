import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import data from "./tsconfig.paths.json";

/**
 * read paths from tsconfig.paths.json
 * @warning this function just set single path for each alias
 * @returns {Alias}
 */
function getAlias() {
   const option = {};
   const paths = data?.compilerOptions?.paths;
   if (paths) {
      Object.keys(paths).forEach((key) => {
         option[key.replace("/*", "")] = path.resolve(
            __dirname,
            paths[key][0].replace("/*", "")
         );
      });
   }
   return option;
}

export default defineConfig({
   plugins: [react()],
   server: {
      port: 3000,
   },
   build: {
      target: "esnext",
   },
   resolve: {
      alias: getAlias(),
   },
});
