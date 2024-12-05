import ImageUploader from "@/components/ImageUploader";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

describe("ImageUploader", () => {
  it("renders correctly", () => {
    render(<ImageUploader onUpload={jest.fn()} />);

    expect(screen.getByText(/Browse Files/i)).toBeInTheDocument();
    expect(screen.getByText(/Drag and drop files here/i)).toBeInTheDocument();
  });

  it("does not call onUpload when no file is selected", async () => {
    const onUploadMock = jest.fn();
    render(<ImageUploader onUpload={onUploadMock} />);

    const input = screen.getByLabelText(/File Upload/i) as HTMLInputElement;

    fireEvent.change(input, {
      target: { files: [] },
    });

    await waitFor(() => {
      expect(onUploadMock).not.toHaveBeenCalled();
    });
  });
});
