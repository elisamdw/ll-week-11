import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const appRoot = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(appRoot, "..");

// The app is in nextjs/; its Markdown is in the repo's root _content/ and _context/, read at request time (as in
// aibl-connect's interface/). utilities/ beside it is a separate package with its own node_modules.
// Phones in the room join the prototypes (app/proto/) at the laptop's network address, so allow it in dev.
const lanAddresses = Object.values(os.networkInterfaces())
  .flat()
  .filter((a) => a && a.family === "IPv4" && !a.internal)
  .map((a) => a.address);

export default {
  allowedDevOrigins: ["127.0.0.1", "localhost", "*.local", ...lanAddresses],
  turbopack: { root: repoRoot },
  outputFileTracingRoot: repoRoot,
  outputFileTracingIncludes: {
    "/*": ["../_content/**/*", "../_context/**/*"],
  },
};
