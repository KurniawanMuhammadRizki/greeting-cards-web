import GreetingCardCanvas from "@/components/GreetingCardCanvas";
import { render, screen } from "@testing-library/react";

describe("GreetingCardCanvas", () => {
  it("renders canvas element", () => {
    render(
      <GreetingCardCanvas
        previewUrl="https://example.com/image.jpg"
        dimensions={{ width: 500, height: 500 }}
        textValues={{
          dear: "Udin",
          message: "Happy Birthday din!",
          from: "Onah",
        }}
      />
    );

    const canvas = screen.getByTestId("greeting-card-canvas");
    expect(canvas).toBeInTheDocument();
  });

  it("applies the correct previewUrl to the canvas", () => {
    render(
      <GreetingCardCanvas
        previewUrl="https://example.com/test.jpg"
        dimensions={{ width: 500, height: 500 }}
        textValues={{
          dear: "Budi",
          message: "Have a great day!",
          from: "Bambang",
        }}
      />
    );

    const canvas = screen.getByTestId(
      "greeting-card-canvas"
    ) as HTMLCanvasElement;

    const context = canvas.getContext("2d");
    expect(context).not.toBeNull();
  });

  it("renders the canvas element and applies the correct style", () => {
    render(
      <GreetingCardCanvas
        previewUrl="https://example.com/image.jpg"
        dimensions={{ width: 300, height: 400 }}
        textValues={{
          dear: "Bulan",
          message: "Cheers!",
          from: "Bintang",
        }}
      />
    );

    const canvas = screen.getByTestId(
      "greeting-card-canvas"
    ) as HTMLCanvasElement;

    expect(canvas).toBeInTheDocument();
    expect(canvas.style.maxWidth).toBe("100%");
    expect(canvas.style.height).toBe("auto");
  });
});
