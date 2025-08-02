import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download, Twitter } from "lucide-react";
import { HeatmapCanvas } from "@/utils/HeatmapCanvas";
import { RefObject } from "react";

interface HeatmapCardProps {
  displayText: string;
  error: string;
  canvasRef: RefObject<HTMLCanvasElement>;
  onDownload: () => void;
  onShareTwitter: () => void;
}

export function HeatmapCard({
  displayText,
  error,
  canvasRef,
  onDownload,
  onShareTwitter,
}: HeatmapCardProps) {
  return (
    <Card className="bg-[#161B22] border-[#21262D]">
      <CardContent className="p-6 space-y-6">
        <div className="bg-[#0D1117] rounded-lg p-4">
          <canvas
            ref={canvasRef}
            width={800}
            height={200}
            className="w-full h-auto"
            style={{ aspectRatio: "4/1" }}
          />
          <HeatmapCanvas text={displayText} canvasRef={canvasRef} />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-3">
          <Button
            onClick={onDownload}
            disabled={!!error || !displayText}
            variant="outline"
            className="border-[#39FF14] text-[#39FF14] hover:bg-[#39FF14] hover:text-black disabled:opacity-50"
          >
            <Download className="h-4 w-4 mr-2" />
            Download PNG
          </Button>

          <Button
            onClick={onShareTwitter}
            disabled={!!error || !displayText}
            variant="outline"
            className="border-[#1DA1F2] text-[#1DA1F2] hover:bg-[#1DA1F2] hover:text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Twitter className="h-4 w-4 mr-2" />
            Share on X
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
