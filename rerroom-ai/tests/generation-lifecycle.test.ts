import { describe, expect, it } from "vitest";
import { beginGenerationLifecycle, generationCopy, generationPollDelay, initialGenerationLifecycle, pauseGenerationLifecycle, reduceGenerationJob, recordGenerationPollingError, resumeGenerationLifecycle, resumeIfOfflinePause, shouldPollGeneration } from "../services/generationLifecycle";

describe("generation lifecycle", () => {
  const queued = { id: "job-1", status: "queued" as const, progress: 8 };

  it("starts polling from a queued server job", () => {
    const state = beginGenerationLifecycle(queued);
    expect(state.phase).toBe("polling");
    expect(shouldPollGeneration(state)).toBe(true);
  });

  it("pauses and resumes without losing the job", () => {
    const paused = pauseGenerationLifecycle(beginGenerationLifecycle(queued));
    expect(paused.phase).toBe("paused");
    expect(paused.pauseReason).toBe("user");
    expect(shouldPollGeneration(paused)).toBe(false);
    expect(resumeGenerationLifecycle(paused).job?.id).toBe("job-1");
  });

  it("automatically resumes only an offline pause", () => {
    const paused = pauseGenerationLifecycle(beginGenerationLifecycle(queued), "offline");
    expect(generationCopy(paused).title).toBe("Generation paused offline");
    expect(resumeIfOfflinePause(paused, false).phase).toBe("paused");
    expect(resumeIfOfflinePause(paused, true).phase).toBe("polling");
    expect(resumeIfOfflinePause(pauseGenerationLifecycle(beginGenerationLifecycle(queued)), true).phase).toBe("paused");
  });

  it("moves through running to complete", () => {
    const running = reduceGenerationJob(beginGenerationLifecycle(queued), { ...queued, status: "running", progress: 60 });
    const complete = reduceGenerationJob(running, { ...queued, status: "complete", progress: 100, designId: "design-1" });
    expect(running.job?.progress).toBe(60);
    expect(complete.phase).toBe("complete");
    expect(shouldPollGeneration(complete)).toBe(false);
    expect(generationCopy(complete).action).toBe("View concept");
  });

  it("exposes retryable failures and bounded polling delay", () => {
    const failed = recordGenerationPollingError(beginGenerationLifecycle(queued), new Error("Network unavailable"));
    expect(failed.phase).toBe("failed");
    expect(generationCopy(failed).action).toBe("Retry");
    expect(generationPollDelay(100)).toBe(8000);
    expect(initialGenerationLifecycle.phase).toBe("idle");
  });
});
