import { Button } from "../components/button";
import { Card } from "../components/card";
import { getCompositionInfo } from "../features/composition";
import { exportSpriteSheet } from "../features/sprite-sheet";
import { useAsync } from "../hooks/use-async";
import { CompositionInfo } from "./components/composition-info";
import { FailedExportAlert } from "./components/failed-export-alert";
import { SuccessfulExportAlert } from "./components/successful-export-alert";
import { useInterval } from "../hooks/use-interval";

const COMPOSITION_INFO_REFRESH_INTERVAL = 1000;

const Main = () => {
  const {
    data: exportData,
    error: exportError,
    isPending: isExporting,
    execute: executeExportSpriteSheet,
  } = useAsync(exportSpriteSheet);

  const {
    data: compositionInfoData,
    isPending: isCompositionInfoLoading,
    execute: executeGetCompositionInfo,
  } = useAsync(getCompositionInfo);

  useInterval(executeGetCompositionInfo, COMPOSITION_INFO_REFRESH_INTERVAL);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-10 py-6">
      <Card className="w-full">
        <CompositionInfo
          name={compositionInfoData?.name}
          totalFrames={compositionInfoData?.totalFrames}
        />
        <Button
          className="mt-4 w-full"
          onClick={executeExportSpriteSheet}
          loading={isExporting || isCompositionInfoLoading}
        >
          Export Sprite Sheet
        </Button>
        <p className="text-sm text-gray-500 mt-2">
          Note: Export is only available for compositions with &quot;PNG
          Sequence&quot; or &quot;TIFF Sequence with Alpha&quot; output modules.
        </p>
        {exportData && (
          <SuccessfulExportAlert
            className="mt-4"
            imagePath={exportData.imagePath}
            jsonPath={exportData.jsonPath}
          />
        )}
        {exportError ? (
          <FailedExportAlert className="mt-4" error={exportError} />
        ) : null}
      </Card>
    </div>
  );
};

export default Main;
