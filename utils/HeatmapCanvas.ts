import { useEffect } from "react";
import { createTextPattern } from "./createTextPattern";

export interface HeatmapProps {
    text: string;
    canvasRef: React.RefObject<HTMLCanvasElement>;
  }
  
export function HeatmapCanvas({ text, canvasRef }: HeatmapProps) {
    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
  
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
  
      // Set canvas size
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
  
      // Clear canvas with dark background
      ctx.fillStyle = "#0D1117";
      ctx.fillRect(0, 0, rect.width, rect.height);
  
      if (!text.trim()) return;
  
      // GitHub heatmap configuration
      const cols = 53; // GitHub-style 53 weeks
      const rows = 7; // 7 days per week
      const dotSize =
        Math.min((rect.width - 80) / cols, (rect.height - 80) / rows) * 0.85;
      const gap = dotSize * 0.2;
      const startX = (rect.width - (cols * (dotSize + gap) - gap)) / 2;
      const startY = (rect.height - (rows * (dotSize + gap) - gap)) / 2;
  
      // Create text pattern
      const textPattern = createTextPattern(text.toUpperCase());
  
      // Center the text pattern in the grid
      const patternWidth = textPattern[0]?.length || 0;
      const patternHeight = textPattern.length;
      const offsetX = Math.max(0, Math.floor((cols - patternWidth) / 2));
      const offsetY = Math.max(0, Math.floor((rows - patternHeight) / 2));
  
      // Color palette for different intensities
      const colors = [
        "#161B22", // Very dark (empty)
        "#0E4429", // Dark green
        "#006D32", // Medium dark green
        "#26A641", // Medium green
        "#39FF14", // Bright lime green
      ];
  
      // Draw heatmap dots
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = startX + col * (dotSize + gap);
          const y = startY + row * (dotSize + gap);
  
          // Check if this position should be filled based on text pattern
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
  
          // Add some background noise for empty cells
          if (intensity === 0 && Math.random() < 0.05) {
            intensity = 0.1;
          }
  
          // Determine color based on intensity
          const colorIndex = Math.min(
            Math.floor(intensity * colors.length),
            colors.length - 1
          );
          ctx.fillStyle = colors[colorIndex];
  
          // Draw rounded rectangle (dot)
          const radius = dotSize * 0.15;
          ctx.beginPath();
          ctx.roundRect(x, y, dotSize, dotSize, radius);
          ctx.fill();
  
          // Add glow effect for filled cells
          if (intensity > 0.5) {
            ctx.shadowColor = colors[colorIndex];
            ctx.shadowBlur = 3;
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        }
      }
  
      // Add week labels
      const weekLabels = ["Mon", "Wed", "Fri"];
      ctx.fillStyle = "#7D8590";
      ctx.font = "11px system-ui, sans-serif";
      ctx.textAlign = "right";
      weekLabels.forEach((label, index) => {
        const y = startY + (index * 2 + 1) * (dotSize + gap) + dotSize / 2 + 3;
        ctx.fillText(label, startX - 8, y);
      });
  
      // Add month labels
      const monthLabels = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      ctx.textAlign = "center";
      for (let i = 0; i < 12; i++) {
        const x = startX + i * 4.4 * (dotSize + gap);
        if (x < rect.width - 20) {
          ctx.fillText(monthLabels[i], x, startY - 8);
        }
      }
    }, [text, canvasRef]);
  
    return null;
  }