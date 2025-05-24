export const calculateImagePosition = (
	index: number,
	framesPerRow: number,
	frameWidth: number,
	frameHeight: number,
): { x: number; y: number } => {
	const row = Math.floor(index / framesPerRow);
	const col = index % framesPerRow;
	const x = col * frameWidth;
	const y = row * frameHeight;

	return { x, y };
};
