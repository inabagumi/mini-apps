"use client";

import { Volume2, VolumeOff } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import Heart from "./heart";

const tryToPlay = async (audio: HTMLAudioElement): Promise<boolean> => {
  try {
    await audio.play();

    return true;
  } catch {
    return false;
  }
};

export default function Heartbeat() {
  const heartRef = useRef<HTMLAudioElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [muted, setMuted] = useState<boolean>(true);

  const play = useCallback(async (audio: HTMLAudioElement) => {
    const isPlaying = await tryToPlay(audio);

    setMuted(!isPlaying);
    setIsLoading(false);
  }, []);

  const handleButtonClick = useCallback(async () => {
    if (isLoading || !heartRef.current) {
      return;
    }

    if (heartRef.current.paused) {
      setIsLoading(true);

      await play(heartRef.current);
    } else {
      heartRef.current.muted = !muted;

      setMuted(!muted);
    }
  }, [muted, isLoading, play]);

  useEffect(() => {
    if (!heartRef.current) {
      return;
    }

    play(heartRef.current);
  }, [play]);

  const ButtonIcon = muted ? VolumeOff : Volume2;

  return (
    <div className="relative flex h-full flex-col items-center justify-center">
      <Heart ref={heartRef} />

      <div className="absolute inset-x-0 bottom-0 flex items-center justify-center">
        <button
          className="block text-6xl text-control focus:outline-none disabled:text-control-disabled"
          disabled={isLoading}
          onClick={handleButtonClick}
          type="button"
        >
          <ButtonIcon className="inline h-auto w-[1em] align-baseline" />
        </button>
      </div>
    </div>
  );
}
