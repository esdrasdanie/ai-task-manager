import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter()],
  resolve: {
    tsconfigPaths: true,
  },
  ssr: {
    // Esses pacotes têm binários nativos ou são CJS — o Node deve carregá-los
    // diretamente em vez de o Vite bundlizá-los no SSR.
    external: ["@prisma/client", "@prisma/adapter-libsql", "@libsql/client"],
  },
  optimizeDeps: {
    exclude: ["@prisma/client"],
  },
});
