declare module "react-pannellum" {
  import type { CSSProperties, ComponentType } from "react";

  export type PannellumConfig = Record<string, unknown>;

  export type ReactPannellumProps = {
    id: string;
    sceneId: string;
    imageSource: string;
    config?: PannellumConfig;
    style?: CSSProperties;
  };

  const ReactPannellum: ComponentType<ReactPannellumProps>;
  export default ReactPannellum;
  export function addScene(sceneId: string, config: PannellumConfig): void;
  export function getCurrentScene(): string | undefined;
  export function loadScene(
    sceneId: string,
    targetPitch?: number,
    targetYaw?: number | "same" | "sameAzimuth",
    targetHfov?: number
  ): void;
}
