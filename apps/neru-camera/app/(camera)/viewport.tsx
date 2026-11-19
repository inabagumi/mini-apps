"use client";

import { extend } from "@pixi/react";
import type { PixiReactElementProps } from "@pixi/react";
import { Viewport } from "pixi-viewport";
import type { IViewportOptions } from "pixi-viewport";

class InteractiveViewport extends Viewport {
  constructor(options: IViewportOptions) {
    super(options);

    this.drag().pinch().wheel().decelerate();
  }
}

extend({ InteractiveViewport });

declare module "@pixi/react" {
  interface PixiElements {
    interactiveViewport: PixiReactElementProps<typeof InteractiveViewport>;
  }
}

export default function InteractiveViewportComponent(
  props: PixiReactElementProps<typeof InteractiveViewport>
) {
  return <interactiveViewport {...props} />;
}
