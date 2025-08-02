"use client";

import { useState, useRef } from "react";
import { toast } from "sonner";
import { createTextPattern } from "../utils/createTextPattern";
import { Navbar } from "@/components/Navbar";
import { TextInputCard } from "@/components/TextInputCard";
import { HeatmapCard } from "@/components/HeatmapCard";
import { FeaturesSection } from "@/components/FeaturesSection";
import { Footer } from "@/components/Footer";

function validateInput(input: string): { isValid: boolean; error?: string } {
  if (!input.trim()) {
    return { isValid: false, error: "Please enter some text" };
  }

  if (input.length > 15) {
    return { isValid: false, error: "Text must be 15 characters or less" };
  }

  if (input.length < 1) {
    return { isValid: false, error: "Text must be at least 1 character" };
  }

  // Allow only alphanumeric characters and spaces
  const validPattern = /^[a-zA-Z0-9\s]+$/;
  if (!validPattern.test(input)) {
    return {
      isValid: false,
      error: "Only letters, numbers, and spaces are allowed",
    };
  }

  return { isValid: true };
}

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [displayText, setDisplayText] = useState("GITHEAT");
  const [error, setError] = useState<string>("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleInputChange = (value: string) => {
    setInputText(value);

    if (!value.trim()) {
      setDisplayText("GITHEAT");
      setError("");
      return;
    }

    const validation = validateInput(value);
    if (validation.isValid) {
      setDisplayText(value.toUpperCase());
      setError("");
    } else {
      setError(validation.error || "");
    }
  };

  const downloadHeatmap = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Create a temporary canvas with higher resolution for download
    const tempCanvas = document.createElement("canvas");
    const tempCtx = tempCanvas.getContext("2d");
    if (!tempCtx) return;

    tempCanvas.width = 1200;
    tempCanvas.height = 400;

    // Clear with dark background
    tempCtx.fillStyle = "#0D1117";
    tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

    const text = displayText;
    const cols = 53;
    const rows = 7;
    const dotSize = ((tempCanvas.width - 120) / cols) * 0.85;
    const gap = dotSize * 0.2;
    const startX = (tempCanvas.width - (cols * (dotSize + gap) - gap)) / 2;
    const startY = (tempCanvas.height - (rows * (dotSize + gap) - gap)) / 2;

    // Create and render text pattern
    const textPattern = createTextPattern(text);
    const patternWidth = textPattern[0]?.length || 0;
    const patternHeight = textPattern.length;
    const offsetX = Math.max(0, Math.floor((cols - patternWidth) / 2));
    const offsetY = Math.max(0, Math.floor((rows - patternHeight) / 2));

    const colors = ["#161B22", "#0E4429", "#006D32", "#26A641", "#39FF14"];

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = startX + col * (dotSize + gap);
        const y = startY + row * (dotSize + gap);

        const patternRow = row - offsetY;
        const patternCol = col - offsetX;

        let intensity = 0;
        if (
          patternRow >= 0 &&
          patternRow < patternHeight &&
          patternCol >= 0 &&
          patternCol < patternWidth &&
          textPattern[patternRow] &&
          textPattern[patternRow][patternCol]
        ) {
          intensity = textPattern[patternRow][patternCol];
        }

        if (intensity === 0 && Math.random() < 0.03) {
          intensity = 0.1;
        }

        const colorIndex = Math.min(
          Math.floor(intensity * colors.length),
          colors.length - 1
        );
        tempCtx.fillStyle = colors[colorIndex];

        const radius = dotSize * 0.15;
        tempCtx.beginPath();
        tempCtx.roundRect(x, y, dotSize, dotSize, radius);
        tempCtx.fill();
      }
    }

    // Add title
    tempCtx.fillStyle = "#F0F6FC";
    tempCtx.font = "bold 28px system-ui, sans-serif";
    tempCtx.textAlign = "center";
    tempCtx.fillText(
      `${text} - GitHub Contribution Art`,
      tempCanvas.width / 2,
      50
    );

    // Download
    const link = document.createElement("a");
    link.download = `${text.replace(/[^a-zA-Z0-9]/g, "_")}_github_heatmap.png`;
    link.href = tempCanvas.toDataURL();
    link.click();

    toast.success("Heatmap downloaded successfully!");
  };

  const shareOnTwitter = () => {
    const hashtags = ["GitHeat"];
    const text = `Just created my personalized GitHub contribution art! ✨\n\n"${displayText}" transformed into this epic dot pattern 🎨\nCheck out this cool visualization tool!🚀\n https://githeat.vercel.app \n\n#${hashtags.join(
      " #"
    )}`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      text
    )}`;
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#0D1117] text-white">
      <Navbar />

      <div className="container mx-auto px-4 py-8 max-w-6xl mt-16">
        <div className="grid lg:grid-cols-1 gap-8">
          <TextInputCard
            inputText={inputText}
            error={error}
            onInputChange={handleInputChange}
          />

          <HeatmapCard
            displayText={displayText}
            error={error}
            canvasRef={canvasRef}
            onDownload={downloadHeatmap}
            onShareTwitter={shareOnTwitter}
          />
        </div>

        <FeaturesSection />
      </div>
      <Footer />
    </div>
  );
}
