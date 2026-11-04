// Serves the prerendered pages from .vercel/output the way Vercel does, including the
// per-route headers from config.json (CSP, security headers, redirects). On-demand
// routes (actions, the contact "sent" pages) are not available here; e2e tests use `astro dev` for those.
// Usage: node tests/support/serve-static.mjs [port]
import fs from "node:fs";
import http from "node:http";
import path from "node:path";

const root = path.resolve(".vercel/output");
const port = Number(process.argv[2] || 4600);
const { routes } = JSON.parse(fs.readFileSync(path.join(root, "config.json"), "utf8"));

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".png": "image/png",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".xml": "application/xml",
  ".txt": "text/plain",
};

const matches = (route, pathname) => new RegExp(route.src).test(pathname);

http
  .createServer((req, res) => {
    const { pathname } = new URL(req.url, "http://localhost");

    // Redirects first (/ -> /es/, add trailing slash), as Vercel does.
    for (const route of routes) {
      if (route.status >= 300 && route.status < 400 && route.headers?.Location && matches(route, pathname)) {
        const location = pathname.replace(new RegExp(route.src), route.headers.Location);
        res.writeHead(route.status, { Location: location });
        return res.end();
      }
    }

    // Headers of every matching route (later routes win, like Vercel's header merging).
    for (const route of routes) {
      if (route.headers && !route.status && matches(route, pathname)) {
        for (const [key, value] of Object.entries(route.headers)) res.setHeader(key, value);
      }
    }

    let file = path.join(root, "static", decodeURIComponent(pathname));
    if (!file.startsWith(path.join(root, "static"))) {
      res.writeHead(400);
      return res.end();
    }
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, "index.html");

    let status = 200;
    if (!fs.existsSync(file)) {
      status = 404;
      file = path.join(root, "static", "404.html");
      const notFound = routes.find((route) => route.src === "/404" && route.headers);
      for (const [key, value] of Object.entries(notFound?.headers ?? {})) res.setHeader(key, value);
    }

    res.writeHead(status, { "Content-Type": TYPES[path.extname(file)] || "application/octet-stream" });
    fs.createReadStream(file).pipe(res);
  })
  .listen(port, () => console.log(`static output on http://localhost:${port}`));
