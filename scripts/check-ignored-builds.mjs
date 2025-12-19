import { spawnSync } from "node:child_process";

function runCapture(cmd, args) {
  const res = spawnSync(cmd, args, { encoding: "utf8", shell: process.platform === "win32" });
  return { status: res.status ?? 1, stdout: res.stdout ?? "", stderr: res.stderr ?? "" };
}

const res = runCapture("pnpm", ["ignored-builds"]);
const out = (res.stdout + res.stderr).trim();

function isClearlyEmpty(s) {
  const t = s.trim().toLowerCase();
  if (!t) return true;
  // pnpm may print “No ignored build scripts” or similar
  if (t.includes("no ignored build scripts")) return true;
  if (t.includes("no ignored builds")) return true;
  if (t.includes("none")) return true;
  return false;
}

let blockedPkgs = [];
if (!isClearlyEmpty(out)) {
  // Heuristic: collect package-like tokens per line.
  // Typical output may include lines like:
  // - prisma
  // - @prisma/engines
  // or just "prisma"
  const lines = out.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  const pkgLine = (l) => l.replace(/^[-*]\s*/, "").trim();
  for (const l of lines) {
    const cand = pkgLine(l);
    // very loose "package-ish" check
    if (/^@?[a-z0-9][a-z0-9._\-/]*$/i.test(cand)) blockedPkgs.push(cand);
  }
  // de-dup
  blockedPkgs = Array.from(new Set(blockedPkgs));
}

if (blockedPkgs.length > 0) {
  console.error("\n[blocked-build-scripts] pnpm has blocked lifecycle scripts for some dependencies:");
  console.error("  " + blockedPkgs.join(", "));
  console.error("\nThis will break tools that rely on postinstall (Prisma engines/client, esbuild, sharp, etc.).");
  console.error("\nFix (one-time on this machine):");
  console.error("  1) pnpm approve-builds");
  console.error("  2) select at least: prisma, @prisma/engines, esbuild  (and sharp if you need image processing)");
  console.error("  3) pnpm -w rebuild");
  console.error("  4) pnpm setup");
  console.error("\nRe-check with: pnpm ignored-builds");
  process.exit(1);
}
