import { Texture } from "pixi.js";
import { useCallback, useEffect, useState } from "react";

export interface UseVideoTextureOptions {
  src?: string;
  srcObject?: MediaStream;
}

export const useVideoTexture = ({
  src,
  srcObject,
}: UseVideoTextureOptions): Texture | undefined => {
  const [texture, setTexture] = useState<Texture>();

  const handleLoadedData = useCallback((event: Event) => {
    const target = event.currentTarget as HTMLVideoElement;
    setTexture(Texture.from(target));
  }, []);

  useEffect(() => {
    if (!src && !srcObject) {
      return;
    }

    const video = document.createElement("video");

    video.autoplay = true;
    video.crossOrigin = "anonymouse";
    video.loop = true;
    video.muted = true;
    video.playsInline = true;

    video.addEventListener("loadeddata", handleLoadedData);

    if (srcObject) {
      video.srcObject = srcObject;
    } else if (src) {
      video.src = src;
    }

    return (): void => {
      video.removeEventListener("loadeddata", handleLoadedData);
    };
  }, [handleLoadedData, src, srcObject]);

  return texture;
};
