import { Input } from "@/components/ui/input";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

interface TextInputCardProps {
  inputText: string;
  error: string;
  onInputChange: (value: string) => void;
}

export function TextInputCard({
  inputText,
  error,
  onInputChange,
}: TextInputCardProps) {
  return (
    <Card className="bg-[#161B22] border-[#21262D]">
      <CardContent className="p-6">
        <div className="space-y-4">
          <label
            htmlFor="text-input"
            className="text-xl font-medium text-[#F0F6FC]"
          >
            Create Your Text Art
          </label>
          <Input
            id="text-input"
            type="text"
            placeholder="Enter your text (1-15 characters)..."
            value={inputText}
            onChange={(e) => onInputChange(e.target.value)}
            className={`bg-[#0D1117] border-[#21262D] text-[#F0F6FC] placeholder-[#7D8590] focus:border-[#39FF14] ${
              error ? "border-red-500" : ""
            }`}
            maxLength={9}
          />
          <div className="flex justify-between items-center text-xs text-[#7D8590]">
            {error && (
              <div className="flex items-center gap-1 text-red-400">
                <AlertCircle className="h-3 w-3" />
                {error}
              </div>
            )}
            <span className="ml-auto">{inputText.length}/9</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
