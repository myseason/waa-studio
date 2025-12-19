import { spawnSync } from "node:child_process";

function ok(cmd, args) {
  const res = spawnSync(cmd, args, { stdio: "inherit", shell: process.platform === "win32" });
  return res.status === 0;
}

console.log("[check] verifying toolchain binaries...");

// Prisma CLI should exist for @waa/api
const prismaOk = ok("pnpm", ["--filter", "@waa/api", "exec", "prisma", "-v"]);
const esbuildOk = ok("pnpm", ["-w", "exec", "esbuild", "--version"]);

if (!prismaOk || !esbuildOk) {
  console.error("\n[check] Some binaries are still missing or not runnable.");
  console.error("If pnpm printed 'Ignored build scripts', run the one-time approval:");
  console.error("  pnpm approve-builds");
  console.error("  (select at least) prisma, @prisma/engines, esbuild  (and sharp if you need image processing)");
  console.error("  pnpm -w rebuild");
  process.exit(1);
}

console.log("[check] OK");
