import { existsSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { join } from "node:path";

function run(cmd, args, cwd) {
  const res = spawnSync(cmd, args, { stdio: "inherit", shell: process.platform === "win32", cwd });
  if (res.status !== 0) process.exit(res.status ?? 1);
}

function capture(cmd, args, cwd) {
  const res = spawnSync(cmd, args, { encoding: "utf8", shell: process.platform === "win32", cwd });
  return { status: res.status ?? 1, out: (res.stdout ?? "") + (res.stderr ?? "") };
}

// Heuristic: generated client lives here for pnpm
const clientDir = join(process.cwd(), "apps", "api", "node_modules", ".prisma", "client");

// If directory doesn't exist, attempt generate
if (!existsSync(clientDir)) {
  console.log("[prisma] generated client missing -> running prisma generate");
  run("pnpm", ["--filter", "@waa/api", "exec", "prisma", "generate"]);
} else {
  // Also validate that PrismaClient is actually exported (some installs can leave stubs)
  const check = capture("node", ["-e", "import('@prisma/client').then(m=>{if(!m.PrismaClient){process.exit(2)} console.log('PrismaClient ok')}).catch(()=>process.exit(3))"], join(process.cwd(), "apps", "api"));
  if (check.status !== 0) {
    console.log("[prisma] PrismaClient export not found -> running prisma generate");
    run("pnpm", ["--filter", "@waa/api", "exec", "prisma", "generate"]);
  }
}
