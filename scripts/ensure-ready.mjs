import { existsSync } from "node:fs";
import { spawnSync } from "node:child_process";

function run(cmd, args) {
  const res = spawnSync(cmd, args, { stdio: "inherit", shell: process.platform === "win32" });
  if (res.status !== 0) process.exit(res.status ?? 1);
}

// 0) workspace sanity
if (!existsSync("pnpm-workspace.yaml")) {
  console.error("[ensure] pnpm-workspace.yaml is missing. This repo requires it.");
  process.exit(1);
}

// 1) Ensure env files exist (does not overwrite existing .env)
run("pnpm", ["env:sync"]);

// 2) Ensure root node_modules and turbo exist (and enforce node-linker=isolated, scripts enabled)
const turboBin = process.platform === "win32"
  ? "node_modules/.bin/turbo.cmd"
  : "node_modules/.bin/turbo";

const needInstall = !existsSync("node_modules") || !existsSync(turboBin);

if (needInstall) {
  console.log("[ensure] node_modules or turbo missing -> running pnpm install (isolated, scripts enabled)");
  run("pnpm", ["install", "--config.node-linker=isolated", "--ignore-scripts=false"]);
} else {
  const nextBin = process.platform === "win32"
    ? "apps/studio-web/node_modules/.bin/next.cmd"
    : "apps/studio-web/node_modules/.bin/next";
  const nestBin = process.platform === "win32"
    ? "apps/api/node_modules/.bin/nest.cmd"
    : "apps/api/node_modules/.bin/nest";
  const tsxBin = process.platform === "win32"
    ? "apps/worker/node_modules/.bin/tsx.cmd"
    : "apps/worker/node_modules/.bin/tsx";

  if (!existsSync(nextBin) || !existsSync(nestBin) || !existsSync(tsxBin)) {
    console.log("[ensure] app binaries missing -> running pnpm install (isolated, scripts enabled)");
    run("pnpm", ["install", "--config.node-linker=isolated", "--ignore-scripts=false"]);
  }
}

// 3) Fail-fast if pnpm build scripts are blocked (requires approve-builds one-time)
run("node", ["./scripts/check-ignored-builds.mjs"]);

run("node", ["./scripts/ensure-prisma-client.mjs"]);

console.log("[ensure] ready");
