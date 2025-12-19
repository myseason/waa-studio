import { spawnSync } from "node:child_process";

function run(cmd, args) {
  const res = spawnSync(cmd, args, { stdio: "inherit", shell: process.platform === "win32" });
  if (res.status !== 0) process.exit(res.status ?? 1);
}

console.log("== WAA Studio Doctor ==");
run("node", ["-v"]);
run("pnpm", ["-v"]);
console.log("\n-- pnpm ignored-builds --");
run("pnpm", ["ignored-builds"]);
console.log("\n-- key binaries --");
run("pnpm", ["exec", "turbo", "-v"]);
run("pnpm", ["--filter", "@waa/api", "exec", "prisma", "-v"]);
run("pnpm", ["--filter", "@waa/studio-web", "exec", "next", "-v"]);
run("pnpm", ["--filter", "@waa/worker", "exec", "tsx", "-v"]);
