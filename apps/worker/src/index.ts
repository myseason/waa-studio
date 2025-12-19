import "dotenv/config";
import { Queue, Worker } from "bullmq";

const valkeyUrl = process.env.VALKEY_URL ?? "redis://localhost:6379";
const connection = { url: valkeyUrl };
const QUEUE = "waa.export";

async function main() {
  const queue = new Queue(QUEUE, { connection });

  const worker = new Worker(
    QUEUE,
    async (job) => {
      console.log("[worker] processing", job.id, job.data);
      // TODO: export pipeline
      return { ok: true };
    },
    { connection }
  );

  worker.on("completed", (job) => console.log("[worker] completed", job.id));
  worker.on("failed", (job, err) => console.error("[worker] failed", job?.id, err));

  console.log(`[worker] ready. valkey=${valkeyUrl} queue=${QUEUE}`);

  process.on("SIGINT", async () => {
    await worker.close();
    await queue.close();
    process.exit(0);
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
