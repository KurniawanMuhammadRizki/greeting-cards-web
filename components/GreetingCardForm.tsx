"use client";
import { ImageDimensionsType } from "@/types/ImageDimensionsType";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import GreetingCardCanvas from "./GreetingCardCanvas";
import ImageUploader from "./ImageUploader";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";

const GreetingCardForm: React.FC = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [imageDimensions, setImageDimensions] =
    useState<ImageDimensionsType | null>(null);

  const formik = useFormik({
    initialValues: {
      dear: "",
      message: "",
      from: "",
    },
    validationSchema: Yup.object({
      dear: Yup.string().required("Dear is required"),
      message: Yup.string()
        .max(40, "Oops you can only input 40 characters")
        .required("Required"),
      from: Yup.string().required("From is required"),
    }),
    onSubmit: () => {
      handleDownload();
    },
  });

  const handleFileUpload = (
    file: File,
    url: string,
    dimensions: ImageDimensionsType
  ) => {
    setUploadedFile(file);
    setPreviewUrl(url);
    setImageDimensions(dimensions);
  };

  const handleDownload = () => {
    const canvas = document.querySelector("canvas");
    if (canvas) {
      const link = document.createElement("a");
      link.download = "greeting-card.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    }
  };

  return (
    <div className="w-full max-w-screen-sm mx-5 p-8 shadow-md border rounded-lg bg-white">
      <h2 className="text-2xl font-semibold mb-6 text-start">Gift Card</h2>

      <div className="-mx-8">
        <Separator className="my-4 border-gray-300" />
      </div>

      {uploadedFile && previewUrl && (
        <div className="my-10">
          <GreetingCardCanvas
            previewUrl={previewUrl}
            dimensions={imageDimensions}
            textValues={formik.values}
          />
        </div>
      )}

      <ImageUploader onUpload={handleFileUpload} />

      <form onSubmit={formik.handleSubmit} className="mt-8 space-y-8">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block  font-semibold text-gray-700">Dear</label>
            <div className="w-full sm:w-1/2">
              <Input
                type="text"
                name="dear"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.dear}
                placeholder="Dear..."
                className="w-full"
              />
            </div>
            {formik.touched.dear && formik.errors.dear && (
              <p className="text-sm text-red-500">{formik.errors.dear}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block  font-semibold text-gray-700">
              Message
            </label>
            <div className="w-full sm:w-1/2">
              <Input
                type="text"
                name="message"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.message}
                placeholder="Your message..."
                className="w-full"
              />
            </div>
            {formik.touched.message && formik.errors.message && (
              <p className="text-sm text-red-500">{formik.errors.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block  font-semibold text-gray-700">From</label>
            <div className="w-full sm:w-1/2">
              <Input
                type="text"
                name="from"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.from}
                placeholder="From..."
                className="w-full"
              />
            </div>
            {formik.touched.from && formik.errors.from && (
              <p className="text-sm text-red-500">{formik.errors.from}</p>
            )}
          </div>
        </div>

        <div className="-mx-8">
          <Separator className="my-4 border-gray-300" />
        </div>

        <div className="flex justify-center">
          <Button
            type="submit"
            className="w-full sm:w-1/2 bg-green-500 text-white">
            Download
          </Button>
        </div>
      </form>
    </div>
  );
};

export default GreetingCardForm;
