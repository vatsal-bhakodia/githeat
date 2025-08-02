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

    // Download the current canvas as is
    const link = document.createElement("a");
    link.download = `${displayText.replace(
      /[^a-zA-Z0-9]/g,
      "_"
    )}_github_heatmap.png`;
    link.href = canvas.toDataURL();
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
