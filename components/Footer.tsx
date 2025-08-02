import { Github, Twitter, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-[#21262D] bg-[#010409]/50 backdrop-blur-sm mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <span className="text-[#7D8590] text-sm">
              © 2024 GitHeat. Made with ❤️
            </span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/vatsal-bhakodia"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#7D8590] hover:text-[#39FF14] transition-colors duration-200"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://x.com/VatsalBhakodia"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#7D8590] hover:text-[#1DA1F2] transition-colors duration-200"
              aria-label="X (Twitter)"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/vatsal-bhakodia/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#7D8590] hover:text-[#0A66C2] transition-colors duration-200"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
