import { Alert } from "../../components/alert";

interface SuccessfulExportAlertProps {
	className?: string;
	imagePath: string;
	jsonPath: string;
}

export const SuccessfulExportAlert = ({
	className,
	imagePath,
	jsonPath,
}: SuccessfulExportAlertProps) => {
	return (
		<Alert
			className={className}
			variant="success"
			title="Exported Successfully"
		>
			<p>{imagePath}</p>
			<p>{jsonPath}</p>
		</Alert>
	);
};
