import { existsSync, copyFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";

const copies = [
  { from: "apps/api/.env.example", to: "apps/api/.env" },
  { from: "apps/studio-web/.env.example", to: "apps/studio-web/.env" },
  { from: "apps/worker/.env.example", to: "apps/worker/.env" },
];

let changed = 0;
for (const { from, to } of copies) {
  if (!existsSync(from)) continue;
  if (existsSync(to)) continue;
  mkdirSync(dirname(to), { recursive: true });
  copyFileSync(from, to);
  console.log(`[env] created ${to} from ${from}`);
  changed++;
}
if (changed === 0) console.log("[env] nothing to sync (already present)");
