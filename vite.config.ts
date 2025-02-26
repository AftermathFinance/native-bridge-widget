import react from "@vitejs/plugin-react";
import glob from "glob";
import { fileURLToPath } from "node:url";
import { extname, relative, resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { libInjectCss } from "vite-plugin-lib-inject-css";
import ViteRestart from "vite-plugin-restart";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    libInjectCss(),
    dts({
      tsconfigPath: resolve(__dirname, "tsconfig.lib.json"),
      insertTypesEntry: true,
    }),
    ViteRestart({
      restart: ["./dist/*.*", "./dist/**/*.*"],
    }),
  ],
  build: {
    copyPublicDir: true,
    lib: {
      entry: resolve(__dirname, "lib/main.ts"),
      formats: ["es"],
      name: "@aftermath-finance/sui-bridge-react",
    },
    rollupOptions: {
      external: [
        "react",
        "react/jsx-runtime",
        "react-dom",
        // "@tanstack/react-query",
        // "viem",
        // "wagmi",
        // "@radix-ui/react-select",
        // "@reown/appkit",
        // "@reown/appkit-adapter-wagmi",
      ],
      input: Object.fromEntries(
        // https://rollupjs.org/configuration-options/#input
        glob
          .sync("lib/**/*.{ts,tsx}", {
            ignore: ["lib/**/*.d.ts", "lib/stories/**"],
          })
          .map((file) => [
            // 1. The name of the entry point
            // lib/nested/foo.js becomes nested/foo
            relative("lib", file.slice(0, file.length - extname(file).length)),
            // 2. The absolute path to the entry file
            // lib/nested/foo.ts becomes /project/lib/nested/foo.ts
            fileURLToPath(new URL(file, import.meta.url)),
          ]),
      ),
      output: {
        chunkFileNames: "chunks/[name].[hash].js",
        assetFileNames: "assets/[name][extname]",
        entryFileNames: "[name].js",
      },
    },
  },
});
