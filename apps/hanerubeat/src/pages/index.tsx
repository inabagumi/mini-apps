import Heart from "components/heart";
import type { NextPage } from "next";
import { NextSeo } from "next-seo";
import { useCallback, useEffect, useRef, useState } from "react";
import { MdVolumeOff, MdVolumeUp } from "react-icons/md";

import styles from "styles/pages/index.module.css";

const tryToPlay = async (audio: HTMLAudioElement): Promise<boolean> => {
  try {
    await audio.play();

    return true;
  } catch {
    return false;
  }
};

const Heartbeat: NextPage = () => {
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

  const ButtonIcon = muted ? MdVolumeOff : MdVolumeUp;

  return (
    <>
      <NextSeo
        canonical={new URL("/", process.env.NEXT_PUBLIC_BASE_URL).toString()}
        title={process.env.NEXT_PUBLIC_TITLE}
        titleTemplate="%s"
      />

      <div className={styles.container}>
        <Heart ref={heartRef} />

        <div className={styles.controls}>
          <button
            className={styles.button}
            disabled={isLoading}
            onClick={handleButtonClick}
            type="button"
          >
            <ButtonIcon className={styles.button__icon} />
          </button>
        </div>
      </div>
    </>
  );
};

export default Heartbeat;
