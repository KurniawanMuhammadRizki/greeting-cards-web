import { ImageDimensionsType } from "@/types/ImageDimensionsType";
import Dropzone from "react-dropzone";
import { BiSolidCloudUpload } from "react-icons/bi";

const ImageUploader: React.FC<{
  onUpload: (
    file: File,
    previewUrl: string,
    dimensions: ImageDimensionsType
  ) => void;
}> = ({ onUpload }) => {
  const handleFileUpload = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const url = reader.result as string;

        const img = new Image();
        img.onload = () => {
          onUpload(file, url, { width: img.width, height: img.height });
        };
        img.src = url;
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <label
        htmlFor="file-upload"
        className="block font-semibold text-gray-700 mb-2">
        File Upload
      </label>
      <Dropzone onDrop={handleFileUpload} accept={{ "image/*": [] }}>
        {({ getRootProps, getInputProps }) => (
          <div
            {...getRootProps()}
            className="border-dashed border-2 border-gray-400 p-6 text-center rounded-lg cursor-pointer flex flex-col justify-center items-center space-y-2">
            <input {...getInputProps()} id="file-upload" />
            <BiSolidCloudUpload className="text-5xl text-gray-600" />
            <p className="font-semibold">Browse Files</p>
            <p className="text-sm text-gray-500">Drag and drop files here</p>
          </div>
        )}
      </Dropzone>
    </div>
  );
};
export default ImageUploader;
