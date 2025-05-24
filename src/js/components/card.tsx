import { type VariantProps, cva } from "class-variance-authority";
import clsx from "clsx";
import React from "react";

const cardVariants = cva(
	"rounded-lg border border-gray-200 dark:border-gray-800 bg-card text-card-foreground shadow-sm",
	{
		variants: {
			variant: {
				default: "bg-white dark:bg-gray-900",
				secondary: "bg-gray-50 dark:bg-gray-800",
			},
			size: {
				default: "p-6",
				sm: "p-4",
				lg: "p-8",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

interface CardProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof cardVariants> {}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
	({ className, variant, size, ...props }, ref) => (
		<div
			ref={ref}
			className={clsx(cardVariants({ variant, size, className }))}
			{...props}
		/>
	),
);
