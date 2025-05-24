import { type VariantProps, cva } from "class-variance-authority";
import clsx from "clsx";
import { AlertTriangle, CheckCircle } from "lucide-react";
import type { HTMLAttributes } from "react";

const alertVariants = cva(
	"rounded-md p-4 flex items-start gap-4 text-sm font-medium",
	{
		variants: {
			variant: {
				success:
					"bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400",
				danger: "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400",
			},
		},
		defaultVariants: {
			variant: "success",
		},
	},
);

interface AlertProps
	extends HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof alertVariants> {
	title?: string;
}

export const Alert = ({
	children,
	className,
	variant,
	title,
	...props
}: AlertProps) => {
	const Icon = variant === "danger" ? AlertTriangle : CheckCircle;

	return (
		<div
			className={clsx(alertVariants({ variant, className }))}
			role="alert"
			{...props}
		>
			<Icon className="w-4 h-4 flex-shrink-0 mt-0.5" />
			<div>
				{title && <div className="font-semibold mb-1">{title}</div>}
				{children}
			</div>
		</div>
	);
};
