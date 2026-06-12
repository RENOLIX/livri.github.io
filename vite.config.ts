import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  base: "/livri.github.io/",
  plugins: [react()],
});
