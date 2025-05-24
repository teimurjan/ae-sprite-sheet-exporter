import { Layers } from "lucide-react";

interface CompositionInfoProps {
	name?: string;
	totalFrames?: number;
}

export const CompositionInfo = ({
	name,
	totalFrames,
}: CompositionInfoProps) => {
	return (
		<>
			<p className="text-xl font-bold dark:text-white">
				{name || "No composition selected"}
			</p>
			<p className="text-base dark:text-white flex items-center gap-2">
				<Layers className="w-4 h-4" />
				{typeof totalFrames === "number" ? `${totalFrames} frames` : "N/A"}
			</p>
		</>
	);
};
