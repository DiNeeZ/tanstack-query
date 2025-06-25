import { type AliasOptions, defineConfig } from "vite";
import tailwindcss from '@tailwindcss/vite'
import react from "@vitejs/plugin-react";
//@ts-expect-error ignore
import path from "path";

//@ts-expect-error ignore
const root = path.resolve(__dirname, "src");

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": root,
    } as AliasOptions,
  },
});
