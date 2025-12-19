import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

function runCapture(cmd, args, cwd) {
  const res = spawnSync(cmd, args, { encoding: "utf8", shell: process.platform === "win32", cwd });
  return { status: res.status ?? 1, stdout: res.stdout ?? "", stderr: res.stderr ?? "" };
}

function fail(msg) {
  console.error("\n[verify] FAIL: " + msg);
  process.exit(1);
}

console.log("== WAA Studio Verify ==");

// 1) Check blocked build scripts
const ignored = runCapture("pnpm", ["ignored-builds"]);
const out = (ignored.stdout + ignored.stderr).trim();
if (out && !out.toLowerCase().includes("no ignored")) {
  console.error("\n[verify] pnpm ignored-builds reports blocked scripts:");
  console.error(out);
  console.error("\nFix:");
  console.error("  pnpm approve-builds");
  console.error("  pnpm setup:after-approve");
  process.exit(1);
}

// 2) Check key binaries existence via pnpm exec
const turbo = runCapture("pnpm", ["exec", "turbo", "-v"]);
if (turbo.status !== 0) fail("turbo is not runnable");

const next = runCapture("pnpm", ["--filter", "@waa/studio-web", "exec", "next", "-v"]);
if (next.status !== 0) fail("next is not runnable in @waa/studio-web");

const nest = runCapture("pnpm", ["--filter", "@waa/api", "exec", "nest", "--version"]);
if (nest.status !== 0) fail("nest is not runnable in @waa/api");

const tsx = runCapture("pnpm", ["--filter", "@waa/worker", "exec", "tsx", "-v"]);
if (tsx.status !== 0) fail("tsx is not runnable in @waa/worker");

// 3) Check dotenv availability in worker
const dotenv = runCapture("node", ["-e", "require('dotenv/config'); console.log('dotenv ok')"], join(process.cwd(), "apps", "worker"));
if (dotenv.status !== 0) fail("dotenv/config not resolvable in apps/worker");


// 4) Check PrismaClient export exists
const prismaExport = runCapture("node", ["-e", "import('@prisma/client').then(m=>{if(!m.PrismaClient) process.exit(2); console.log('PrismaClient export ok')}).catch(e=>{console.error(e); process.exit(3)})"], join(process.cwd(), "apps", "api"));
if (prismaExport.status !== 0) fail("PrismaClient export missing (run pnpm setup)");

// 5) Check PrismaClient type generation by a TS check (fast)
const tsc = runCapture("pnpm", ["--filter", "@waa/api", "exec", "tsc", "-p", "tsconfig.json", "--noEmit"], join(process.cwd(), "apps", "api"));
if (tsc.status !== 0) {
  console.error("\n[verify] TypeScript check failed for @waa/api:");
  console.error(tsc.stdout + tsc.stderr);
  fail("api tsc failed (often prisma client not generated)");
}

console.log("\n[verify] OK");
