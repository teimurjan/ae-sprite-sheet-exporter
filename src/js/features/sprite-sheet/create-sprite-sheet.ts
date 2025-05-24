import { createCanvas } from "canvas";
import type { ExportFramesFormat } from "../../../shared/frames";
import type { CreateSpriteSheetResult, SpriteSheetMetadata } from "./types";
import { calculateImagePosition, importFrame } from "./utils";

export const createSpriteSheet = async (
  frameFilePaths: string[],
  format: ExportFramesFormat,
  frameRate: number
): Promise<CreateSpriteSheetResult> => {
  const importedFirstFrame = await importFrame(frameFilePaths[0], format);
  const frameWidth = importedFirstFrame.width;
  const frameHeight = importedFirstFrame.height;

  const framesPerRow = Math.ceil(Math.sqrt(frameFilePaths.length));
  const rows = Math.ceil(frameFilePaths.length / framesPerRow);

  const canvas = createCanvas(frameWidth * framesPerRow, frameHeight * rows);
  const context = canvas.getContext("2d");

  const framePromises = frameFilePaths.map(async (file, index) => {
    const { x, y } = calculateImagePosition(
      index,
      framesPerRow,
      frameWidth,
      frameHeight
    );

    const importedFrame = await importFrame(file, format);
    importedFrame.attachToCanvas(context, x, y);

    return {
      x,
      y,
      width: frameWidth,
      height: frameHeight,
    };
  });

  const frames = await Promise.all(framePromises);

  const metadata: SpriteSheetMetadata = {
    frameWidth,
    frameHeight,
    frames,
    totalFrames: frames.length,
    frameRate,
  };

  // toBuffer is undefined in CEP
  const dataUrl = canvas.toDataURL("image/png");
  const image = Buffer.from(dataUrl.split(",")[1], "base64");

  return { image, metadata };
};
