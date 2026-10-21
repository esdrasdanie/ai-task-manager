import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter()],
  resolve: {
    tsconfigPaths: true,
  },
  ssr: {
    // Garante que o @prisma/client e o adapter não sejam bundlizados pelo Vite
    // no SSR, evitando conflitos CJS/ESM com os binários nativos do Prisma.
    noExternal: ["@prisma/adapter-libsql", "@libsql/client"],
    external: ["@prisma/client"],
  },
  optimizeDeps: {
    exclude: ["@prisma/client"],
  },
});
