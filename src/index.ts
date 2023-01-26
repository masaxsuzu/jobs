import { exit } from "process";
import { Job, Queue, Worker } from "bullmq";
import IORedis from "ioredis";

export async function main(handler: (job: Job, c: { color: string }) => void) {
  const connection = new IORedis({ maxRetriesPerRequest: null });

  // Reuse the ioredis instance
  const queue = new Queue("queue", { connection });

  await queue.add("queue", { color: "red" });

  const worker = new Worker(
    "queue",
    async (job) => {
      await job.updateProgress(100);
      return job.data;
    },
    { connection }
  );

  worker.on("completed", handler);
}
