import { useRef, type ReactNode } from "react";
import { Download, ImageDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  title: string;
  subtitle?: string;
  fileName: string;
  children: ReactNode;
};

export default function DiagramFrame({ title, subtitle, fileName, children }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);

  const getSvg = () => wrapRef.current?.querySelector("svg") ?? null;

  const downloadSvg = () => {
    const svg = getSvg();
    if (!svg) return;
    const clone = svg.cloneNode(true) as SVGSVGElement;
    clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    const source = new XMLSerializer().serializeToString(clone);
    const blob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
    triggerDownload(URL.createObjectURL(blob), `${fileName}.svg`);
  };

  const downloadPng = () => {
    const svg = getSvg();
    if (!svg) return;
    const clone = svg.cloneNode(true) as SVGSVGElement;
    clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    const vb = svg.viewBox.baseVal;
    const width = vb.width || svg.clientWidth || 1200;
    const height = vb.height || svg.clientHeight || 800;
    const source = new XMLSerializer().serializeToString(clone);
    const url = URL.createObjectURL(
      new Blob([source], { type: "image/svg+xml;charset=utf-8" }),
    );
    const img = new Image();
    img.onload = () => {
      const scale = 2;
      const canvas = document.createElement("canvas");
      canvas.width = width * scale;
      canvas.height = height * scale;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.fillStyle = "#020617";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      canvas.toBlob((blob) => {
        if (blob) triggerDownload(URL.createObjectURL(blob), `${fileName}.png`);
      }, "image/png");
    };
    img.src = url;
  };

  return (
    <Card className="border-slate-800 bg-slate-900/60 shadow-xl shadow-black/30">
      <CardHeader className="flex flex-col gap-4 border-b border-slate-800/80 md:flex-row md:items-center md:justify-between">
        <div>
          <CardTitle className="font-serif text-xl text-white">{title}</CardTitle>
          {subtitle && (
            <p className="mt-1 max-w-2xl text-sm text-slate-400">{subtitle}</p>
          )}
        </div>
        <div className="flex gap-2 print:hidden">
          <Button
            variant="outline"
            size="sm"
            onClick={downloadSvg}
            className="border-slate-700 bg-slate-900 text-slate-200 hover:bg-slate-800 hover:text-white"
          >
            <Download className="mr-2 h-4 w-4" /> SVG
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={downloadPng}
            className="border-slate-700 bg-slate-900 text-slate-200 hover:bg-slate-800 hover:text-white"
          >
            <ImageDown className="mr-2 h-4 w-4" /> PNG
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-4 md:p-6">
        <div
          ref={wrapRef}
          className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/70 p-4"
        >
          {children}
        </div>
      </CardContent>
    </Card>
  );
}

function triggerDownload(url: string, name: string) {
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}