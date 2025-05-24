import { Alert } from "../../components/alert";

interface FailedExportAlertProps {
	error: unknown;
	className?: string;
}

export const FailedExportAlert = ({
	error,
	className,
}: FailedExportAlertProps) => {
	return (
		<Alert className={className} variant="danger" title="Failed to Export">
			{error instanceof Error ? error.message : `${error}`}
		</Alert>
	);
};
