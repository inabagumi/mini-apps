import { act, fireEvent, render, screen } from "@testing-library/react";
import { forwardRef } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { MockInstance } from "vitest";

import Heartbeat from "./heartbeat";

vi.mock(import("lucide-react"), async (importOriginal) => ({
  ...(await importOriginal()),
  Volume2: forwardRef(() => <svg data-testid="volume-up" />),
  VolumeOff: forwardRef(() => <svg data-testid="volume-off" />),
}));

const getAudio = (container: HTMLElement): HTMLAudioElement => {
  const audio = container.querySelector("audio");

  if (!audio) {
    throw new Error("The audio element is not found.");
  }

  return audio;
};

const MUTED_LABEL = "音を出す";
const UNMUTED_LABEL = "ミュートする";

const getIcon = (name: string): string | null =>
  screen.getByRole("button", { name }).querySelector("svg")?.dataset.testid ??
  null;

const waitForButtonEnabled = async (): Promise<void> => {
  await vi.waitFor(() => {
    expect(screen.getByRole("button")).toHaveProperty("disabled", false);
  });
};

describe(Heartbeat, () => {
  let play: MockInstance<HTMLAudioElement["play"]>;

  beforeEach(() => {
    play = vi.spyOn(HTMLAudioElement.prototype, "play").mockResolvedValue();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("disables the button while trying to play", async () => {
    const { promise, resolve } = Promise.withResolvers<undefined>();
    play.mockReturnValue(promise);

    render(<Heartbeat />);

    expect(play).toHaveBeenCalledOnce();
    expect(screen.getByRole("button")).toHaveProperty("disabled", true);

    await act(async () => {
      resolve(undefined);
      await promise;
    });

    expect(screen.getByRole("button")).toHaveProperty("disabled", false);
  });

  it("shows the unmuted icon when autoplay succeeds", async () => {
    render(<Heartbeat />);

    await waitForButtonEnabled();

    expect(getIcon(UNMUTED_LABEL)).toBe("volume-up");
  });

  it("shows the muted icon when autoplay fails", async () => {
    play.mockRejectedValue(new DOMException("Blocked", "NotAllowedError"));

    render(<Heartbeat />);

    await waitForButtonEnabled();

    expect(getIcon(MUTED_LABEL)).toBe("volume-off");
  });

  it("toggles mute when the button is clicked while playing", async () => {
    vi.spyOn(HTMLMediaElement.prototype, "paused", "get").mockReturnValue(
      false
    );

    const { container } = render(<Heartbeat />);
    const audio = getAudio(container);

    await waitForButtonEnabled();

    fireEvent.click(screen.getByRole("button", { name: UNMUTED_LABEL }));

    expect(audio.muted).toBeTruthy();
    expect(getIcon(MUTED_LABEL)).toBe("volume-off");

    fireEvent.click(screen.getByRole("button", { name: MUTED_LABEL }));

    expect(audio.muted).toBeFalsy();
    expect(getIcon(UNMUTED_LABEL)).toBe("volume-up");
    expect(play).toHaveBeenCalledOnce();
  });

  it("tries to play when the button is clicked while paused", async () => {
    play.mockRejectedValueOnce(new DOMException("Blocked", "NotAllowedError"));

    render(<Heartbeat />);

    await waitForButtonEnabled();

    expect(getIcon(MUTED_LABEL)).toBe("volume-off");

    const { promise, resolve } = Promise.withResolvers<undefined>();
    play.mockReturnValueOnce(promise);

    fireEvent.click(screen.getByRole("button", { name: MUTED_LABEL }));

    expect(play).toHaveBeenCalledTimes(2);
    expect(screen.getByRole("button")).toHaveProperty("disabled", true);

    await act(async () => {
      resolve(undefined);
      await promise;
    });

    expect(screen.getByRole("button")).toHaveProperty("disabled", false);
    expect(getIcon(UNMUTED_LABEL)).toBe("volume-up");
  });
});
