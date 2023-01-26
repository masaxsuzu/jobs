import { describe, expect, test } from "@jest/globals";
import { Job } from "bullmq";
import { main } from ".";

describe("index", () => {
  test("index", async () => {
    const handler = (job: Job, v: { color: string }) => {};
    await main(handler);
  });
});
