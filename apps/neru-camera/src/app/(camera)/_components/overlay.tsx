"use client";

import { extend, useApplication } from "@pixi/react";
import { Point, Sprite } from "pixi.js";
import { useMemo } from "react";

import type { OverlayEntry } from "./asset";
import { ChromaKeyFilter } from "./filters";
import { useVideoTexture } from "./hooks";
import Viewport from "./viewport";

extend({ Sprite });

export default function Overlay({
  asset,
}: Readonly<{
  asset: OverlayEntry;
}>) {
  const { app } = useApplication();
  const texture = useVideoTexture({
    src: asset.fields.media?.fields.file?.url,
  });
  const chromaKeyFilter = useMemo(
    () => new ChromaKeyFilter(asset.fields.keyColor),
    [asset.fields.keyColor]
  );

  const anchor = 0.5;
  const position = new Point(
    app.screen.width * anchor,
    app.screen.height * anchor
  );

  return (
    <Viewport
      events={app.renderer.events}
      screenHeight={app.screen.height}
      screenWidth={app.screen.width}
      worldHeight={app.screen.height}
      worldWidth={app.screen.width}
    >
      {texture && (
        <pixiSprite
          anchor={new Point(anchor, anchor)}
          position={position}
          texture={texture}
          filters={[chromaKeyFilter]}
        />
      )}
    </Viewport>
  );
}
