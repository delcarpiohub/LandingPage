declare module "marzipano" {
  export type ViewParams = {
    yaw: number;
    pitch: number;
    fov: number;
  };

  export type SceneOptions = {
    source: ImageUrlSource;
    geometry: EquirectGeometry;
    view: RectilinearView;
    pinFirstLevel?: boolean;
  };

  export class Viewer {
    constructor(
      element: HTMLElement,
      options?: { controls?: { mouseViewMode?: "drag" | "qtvr" } },
    );
    createScene(options: SceneOptions): Scene;
    destroy(): void;
  }

  export class ImageUrlSource {
    static fromString(url: string): ImageUrlSource;
  }

  export class EquirectGeometry {
    constructor(levels: Array<{ width: number }>);
  }

  export class RectilinearView {
    static limit: {
      traditional(maxResolution: number, maxFov: number): unknown;
    };
    constructor(params: ViewParams, limiter?: unknown);
    fov(): number;
    setFov(fov: number): void;
  }

  export class HotspotContainer {
    createHotspot(element: HTMLElement, position: { yaw: number; pitch: number }): void;
  }

  export class Scene {
    hotspotContainer(): HotspotContainer;
    switchTo(options?: { transitionDuration?: number }): void;
  }

  const Marzipano: {
    Viewer: typeof Viewer;
    ImageUrlSource: typeof ImageUrlSource;
    EquirectGeometry: typeof EquirectGeometry;
    RectilinearView: typeof RectilinearView;
  };

  export default Marzipano;
}
