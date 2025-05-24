import { type VariantProps, cva } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import type { ButtonHTMLAttributes } from "react";

const buttonStyles = cva(
	"px-4 py-2 rounded-md font-medium transition-colors flex justify-center items-center gap-2",
	{
		variants: {
			variant: {
				primary:
					"bg-blue-500 hover:bg-blue-600 text-white disabled:bg-blue-400",
				secondary:
					"bg-gray-200 hover:bg-gray-300 text-gray-800 disabled:bg-gray-100",
			},
		},
		defaultVariants: {
			variant: "primary",
		},
	},
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
	VariantProps<typeof buttonStyles> & {
		loading?: boolean;
	};

export const Button = ({
	children,
	variant,
	loading = false,
	className = "",
	disabled,
	...props
}: ButtonProps) => {
	return (
		<button
			className={buttonStyles({ variant, className })}
			disabled={disabled || loading}
			{...props}
		>
			{loading && <Loader2 className="w-4 h-4 animate-spin" />}
			{children}
		</button>
	);
};
