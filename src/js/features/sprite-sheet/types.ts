export type ExportSpriteSheetResult = {
	imagePath: string;
	jsonPath: string;
};

export type SpriteSheetMetadata = {
	frameWidth: number;
	frameHeight: number;
	frames: {
		x: number;
		y: number;
		width: number;
		height: number;
	}[];
	totalFrames: number;
	frameRate: number;
};

export type CreateSpriteSheetResult = {
	image: Buffer;
	metadata: SpriteSheetMetadata;
};
