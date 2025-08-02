import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";

export function Navbar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 border-b border-[#21262D] bg-[#010409]/95 backdrop-blur-xl">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-[#39FF14]/20 rounded-full blur-lg group-hover:bg-[#39FF14]/30 transition-all duration-300"></div>
              <Github className="h-8 w-8 text-[#39FF14] relative z-10 group-hover:scale-110 transition-transform duration-200" />
            </div>
            <h1 className="text-2xl font-bold text-white">GitHeat</h1>
          </div>

          {/* Star Button */}
          <Button
            onClick={() =>
              window.open("https://github.com/vatsal-bhakodia", "_blank")
            }
            variant="outline"
            className="border-[#39FF14] text-[#39FF14] hover:bg-[#39FF14] hover:text-black disabled:opacity-50"
          >
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span>Star Now</span>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
}
