import { rmSync } from "node:fs";

const paths = [
  "node_modules",
  ".turbo",
  "apps/api/node_modules",
  "apps/studio-web/node_modules",
  "apps/worker/node_modules",
  "apps/studio-web/.next",
  "apps/api/dist",
  "apps/worker/dist",
  "packages/core/node_modules",
  "packages/api-client/node_modules",
  "packages/schemas/node_modules",
  "packages/ui/node_modules",
];

for (const p of paths) {
  rmSync(p, { recursive: true, force: true });
}
console.log("[clean] removed workspace build artifacts and node_modules");
