import { useEffect, useRef } from "react";

interface QRCodeProps {
  value: string;
  size?: number;
  bgColor?: string;
  fgColor?: string;
  level?: "L" | "M" | "Q" | "H";
  includeMargin?: boolean;
}

export function QRCode({
  value,
  size = 128,
  bgColor = "#FFFFFF",
  fgColor = "#000000",
  level = "L",
  includeMargin = false,
}: QRCodeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // We'll use a simple SVG-based QR code for demo purposes
    const svgSize = includeMargin ? size - 20 : size;
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", svgSize.toString());
    svg.setAttribute("height", svgSize.toString());
    svg.setAttribute("viewBox", `0 0 ${svgSize} ${svgSize}`);
    
    // Create a background
    const background = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    background.setAttribute("width", svgSize.toString());
    background.setAttribute("height", svgSize.toString());
    background.setAttribute("fill", bgColor);
    svg.appendChild(background);
    
    // Create a simple QR code pattern (just for display purposes)
    const cellSize = Math.floor(svgSize / 7);
    const qrPattern = [
      [1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 1, 0, 1],
      [1, 0, 1, 0, 1, 0, 1],
      [1, 0, 1, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1],
    ];
    
    qrPattern.forEach((row, rowIndex) => {
      row.forEach((cell, cellIndex) => {
        if (cell === 1) {
          const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
          rect.setAttribute("x", (cellIndex * cellSize).toString());
          rect.setAttribute("y", (rowIndex * cellSize).toString());
          rect.setAttribute("width", cellSize.toString());
          rect.setAttribute("height", cellSize.toString());
          rect.setAttribute("fill", fgColor);
          svg.appendChild(rect);
        }
      });
    });
    
    // Add a logo or text in the middle
    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", (svgSize / 2).toString());
    text.setAttribute("y", (svgSize / 2 + 5).toString());
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("font-size", "12");
    text.setAttribute("font-family", "Arial");
    text.setAttribute("fill", fgColor);
    text.textContent = "QR";
    svg.appendChild(text);
    
    // Draw to canvas
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const img = new Image();
        const svgBlob = new Blob([new XMLSerializer().serializeToString(svg)], {
          type: "image/svg+xml;charset=utf-8",
        });
        const url = URL.createObjectURL(svgBlob);
        
        img.onload = () => {
          ctx.clearRect(0, 0, size, size);
          
          if (includeMargin) {
            ctx.fillStyle = bgColor;
            ctx.fillRect(0, 0, size, size);
            ctx.drawImage(img, 10, 10, svgSize, svgSize);
          } else {
            ctx.drawImage(img, 0, 0, size, size);
          }
          
          URL.revokeObjectURL(url);
        };
        
        img.src = url;
      }
    }
  }, [value, size, bgColor, fgColor, level, includeMargin]);

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      style={{ width: size, height: size }}
    />
  );
}
