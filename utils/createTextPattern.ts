import { FONT_MAP } from "@/constants/fontMap";

export function createTextPattern(text: string): number[][] {
    if (!text) return [];
  
    const chars = text.split("");
    const charPatterns = chars.map((char) => FONT_MAP[char] || FONT_MAP[" "]);
  
    // Combine character patterns horizontally with 1 pixel spacing
    const pattern: number[][] = [];
    const height = 7; // Font height
  
    for (let row = 0; row < height; row++) {
      pattern[row] = [];
      for (let charIndex = 0; charIndex < charPatterns.length; charIndex++) {
        const charPattern = charPatterns[charIndex];
        const charRow = charPattern[row] || [0, 0, 0, 0, 0];
  
        // Add character pixels
        for (let col = 0; col < charRow.length; col++) {
          pattern[row].push(charRow[col]);
        }
  
        // Add spacing between characters (except last one)
        if (charIndex < charPatterns.length - 1) {
          pattern[row].push(0);
        }
      }
    }
  
    return pattern;
  }