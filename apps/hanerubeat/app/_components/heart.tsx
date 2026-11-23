import { Heart as HeartIcon } from "lucide-react";
import type { ComponentProps } from "react";

const mp3Path = new URL("../../assets/heartbeat.mp3", import.meta.url).pathname;
const oggPath = new URL("../../assets/heartbeat.ogg", import.meta.url).pathname;
const captionPath = new URL("../../assets/heartbeat.vtt", import.meta.url)
  .pathname;

export default function Heart({ ref }: ComponentProps<"audio">) {
  return (
    <>
      <HeartIcon
        className="block h-auto w-full animate-beat fill-current text-heart"
        strokeWidth={1}
      />

      <audio crossOrigin="anonymous" loop preload="none" ref={ref}>
        <source src={oggPath} type="audio/ogg" />
        <source src={mp3Path} type="audio/mp3" />
        <track default kind="captions" src={captionPath} srcLang="ja" />
      </audio>
    </>
  );
}
