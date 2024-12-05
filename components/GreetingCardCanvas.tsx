"use client";
import { ImageDimensionsType } from "@/types/ImageDimensionsType";
import { useEffect, useRef } from "react";

const GreetingCardCanvas: React.FC<{
  previewUrl: string | null;
  dimensions: ImageDimensionsType | null;
  textValues: { dear: string; message: string; from: string };
}> = ({ previewUrl, dimensions, textValues }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const wrapTextByCharacters = (text: string, maxChars: number): string[] => {
    const result: string[] = [];
    for (let i = 0; i < text.length; i += maxChars) {
      result.push(text.slice(i, i + maxChars));
    }
    return result;
  };

  const drawCanvas = () => {
    if (!previewUrl || !dimensions || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      canvas.width = dimensions.width;
      canvas.height = dimensions.height;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      ctx.font = "italic 30px 'Great Vibes', cursive";
      ctx.fillStyle = "#5D4037";
      ctx.textAlign = "left";

      ctx.fillText(
        textValues.dear,
        canvas.width * 0.45,
        canvas.height * 0.35,
        canvas.width / 3.4
      );

      const wrappedMessage = wrapTextByCharacters(textValues.message, 20);
      wrappedMessage.forEach((line, index) => {
        ctx.fillText(
          line,
          canvas.width * 0.3,
          canvas.height * 0.435 + index * 50,
          canvas.width / 2.2
        );
      });

      ctx.fillText(textValues.from, canvas.width * 0.42, canvas.height * 0.6);
    };
    img.src = previewUrl;
  };

  useEffect(() => {
    drawCanvas();
  }, [previewUrl, dimensions, textValues]);

  return (
    <canvas
      data-testid="greeting-card-canvas"
      ref={canvasRef}
      className="mt-2 rounded-lg shadow-md"
      style={{ maxWidth: "100%", height: "auto" }}></canvas>
  );
};

export default GreetingCardCanvas;
