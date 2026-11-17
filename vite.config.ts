import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv, type Plugin } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Samo za `npm run dev`: pokreće api/*.ts funkcije lokalno, isto kao Vercel u produkciji,
 * pa chatbot radi bez `vercel dev`. Ne utiče na build — Vercel sam gradi /api.
 * Promenljive iz .env idu samo u Node proces (process.env), nikad u browser.
 */
const localApi = (): Plugin => ({
  name: "local-vercel-api",
  apply: "serve",
  configureServer(server) {
    Object.assign(process.env, loadEnv("development", __dirname, ""));

    server.middlewares.use(async (req, res, next) => {
      const url = new URL(req.url ?? "/", "http://localhost");
      const match = url.pathname.match(/^\/api\/([a-z0-9-]+)\/?$/i);
      if (!match) return next();

      try {
        const mod = await server.ssrLoadModule(`/api/${match[1]}.ts`);
        const method = req.method ?? "GET";
        const handler = mod[method] ?? mod.GET;
        if (typeof handler !== "function") return next();

        const chunks: Buffer[] = [];
        for await (const chunk of req) chunks.push(chunk as Buffer);
        const headers = new Headers();
        for (const [k, v] of Object.entries(req.headers)) if (typeof v === "string") headers.set(k, v);

        const response: Response = await handler(
          new Request(`http://${req.headers.host}${req.url}`, {
            method,
            headers,
            body: method === "GET" || method === "HEAD" ? undefined : Buffer.concat(chunks),
          }),
        );

        res.writeHead(response.status, Object.fromEntries(response.headers));
        const reader = response.body?.getReader();
        for (;;) {
          const chunk = await reader?.read();
          if (!chunk || chunk.done) break;
          res.write(chunk.value);
        }
        res.end();
      } catch (err) {
        server.config.logger.error(`[local-api] ${(err as Error).stack ?? err}`);
        if (!res.headersSent) res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Lokalna greška API-ja (vidi terminal)." }));
      }
    });
  },
});

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), viteSingleFile(), localApi()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    port: 5174,
    strictPort: false,
  },
});
