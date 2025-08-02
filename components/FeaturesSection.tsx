import { Card, CardContent } from "@/components/ui/card";
import { Share2, Download, Github } from "lucide-react";

const features = [
  {
    icon: Share2,
    title: "Easy Sharing",
    description:
      "Share your contribution art on social media with engaging captions and hashtags",
  },
  {
    icon: Download,
    title: "High Quality Export",
    description: "Download your text art as a crisp, high-resolution PNG image",
  },
  {
    icon: Github,
    title: "Readable Text Art",
    description:
      "Creates actual readable text patterns using dot-matrix font rendering",
  },
];

export function FeaturesSection() {
  return (
    <div className="mt-12 grid md:grid-cols-3 gap-6">
      {features.map((feature, index) => (
        <Card
          key={index}
          className="bg-[#161B22] border-[#21262D] hover:border-[#39FF14]/30 transition-all duration-300"
        >
          <CardContent className="p-6 text-center">
            <feature.icon className="h-8 w-8 text-[#39FF14] mx-auto mb-3" />
            <h3 className="font-semibold text-[#F0F6FC] mb-2">
              {feature.title}
            </h3>
            <p className="text-[#7D8590] text-sm">{feature.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
