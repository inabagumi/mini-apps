"use client";

import { AlertDialog } from "@base-ui/react/alert-dialog";
import { Sprite, Stage } from "@pixi/react";
import { track } from "@vercel/analytics";
import { fileSave } from "browser-fs-access";
import { clsx } from "clsx";
import type { Application } from "pixi.js";
import { useCallback, useEffect, useState } from "react";

import processing from "@/lib/processing";

import { useAsset } from "./asset";
import { useVideoTexture } from "./hooks";
import Overlay from "./overlay";

const mediaStreamConstraints: MediaStreamConstraints = {
  audio: false,
  video: {
    facingMode: "environment",
    height: 960,
    width: 1280,
  },
};

export default function Camera() {
  const { currentAsset: asset } = useAsset();
  const [pixiView, setPixiView] = useState<HTMLCanvasElement>();
  const [cameraStream, setCameraStream] = useState<MediaStream>();
  const [isShooting, setIsShooting] = useState(false);
  const [hasError, setHasError] = useState(false);
  const texture = useVideoTexture({ srcObject: cameraStream });

  const handleMount = useCallback(
    (app: Application<HTMLCanvasElement>) => setPixiView(app.view),
    []
  );

  const handleUnmount = useCallback(() => setPixiView(undefined), []);

  const takePhoto = useCallback(async () => {
    if (isShooting || !pixiView) {
      return;
    }

    setIsShooting(true);

    try {
      const blob = await processing(pixiView, "image/jpeg", 0.8);

      await fileSave(blob, {
        extensions: [".jpg", ".jpeg"],
        fileName: `NeruCamera-${Date.now()}.jpg`,
      });

      track("takePhoto");
    } catch (error) {
      console.error(error);
    }

    setIsShooting(false);
  }, [pixiView, isShooting]);

  useEffect(() => {
    const startCamera = async () => {
      try {
        // `navigator.mediaDevices` is undefined in insecure contexts.
        const stream = await navigator.mediaDevices.getUserMedia(
          mediaStreamConstraints
        );

        setCameraStream(stream);
      } catch {
        setHasError(true);
      }
    };

    startCamera();
  }, []);

  return (
    <div className="flex h-full flex-col">
      <div className="flex grow items-center justify-center overflow-hidden">
        {texture ? (
          <Stage
            className="block h-auto w-full"
            height={texture.height}
            options={{
              autoDensity: false,
              preserveDrawingBuffer: true,
            }}
            onMount={handleMount}
            onUnmount={handleUnmount}
            width={texture.width}
          >
            <Sprite texture={texture} />

            {asset && <Overlay asset={asset} />}
          </Stage>
        ) : (
          <svg
            className="h-10 w-10 animate-spin text-yellow-400"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="animate-dash opacity-75"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="2"
            />
          </svg>
        )}
      </div>

      <div className="flex justify-around px-4 pt-2 pb-6">
        <button
          className={clsx(
            "bg-gray-50/95",
            isShooting ? "border-2" : "border-0",
            "border-black/95",
            "ease-linear",
            "h-14",
            "focus:outline-hidden",
            "ring-2",
            "ring-offset-2",
            "ring-offset-black",
            "ring-white/95",
            "rounded-full",
            "transition-all",
            "w-14"
          )}
          disabled={isShooting}
          onClick={takePhoto}
          tabIndex={-1}
          type="button"
        >
          <span className="sr-only">写真を撮る</span>
        </button>
      </div>

      <AlertDialog.Root open={hasError}>
        <AlertDialog.Portal>
          <AlertDialog.Backdrop className="fixed inset-0 bg-black/33" />
          <AlertDialog.Viewport className="fixed inset-0 overflow-auto">
            <AlertDialog.Popup className="mx-auto my-[10vh] w-[50vw] bg-white p-8 outline-hidden">
              <AlertDialog.Title>エラー</AlertDialog.Title>

              <AlertDialog.Description>
                カメラの取得に失敗しました。
              </AlertDialog.Description>
            </AlertDialog.Popup>
          </AlertDialog.Viewport>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    </div>
  );
}
