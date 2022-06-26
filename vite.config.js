import { fileURLToPath, URL } from "url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import GlobalsPolyfills from "@esbuild-plugins/node-globals-polyfill";
import NodeModulesPolyfills from "@esbuild-plugins/node-modules-polyfill";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/webscreen/",
  optimizeDeps: {
    esbuildOptions: {
      plugins: [
        NodeModulesPolyfills(),
        GlobalsPolyfills({
          process: true,
          buffer: true,
        }),
      ],
      define: {
        global: "globalThis",
      },
    },
  },
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
