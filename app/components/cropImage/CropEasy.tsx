import React, { useState } from "react";
import Cropper from "react-easy-crop";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { ZoomInIcon, ZoomOutIcon } from "@radix-ui/react-icons";
import getCroppedImg from "./ultils/cropImage";
import { Slider } from "../ui/slider";

export default function CropEasy({
  fileImage,
  setOpenCrop,
  setPhotoURL,
  setFile,
}) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const cropImage = async () => {
    try {
      const { file, url } = await getCroppedImg(fileImage, croppedAreaPixels);
      //setPhotoURL(url);
      // const file = e.currentTarget.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          setFile(event.target?.result ?? null);
          setOpenCrop(false);
        };
        reader.readAsDataURL(file);
      }
      //setFile(file.toString());
      //setOpenCrop(false);
    } catch (error) {
      // setAlert({
      //   isAlert: true,
      //   severity: "error",
      //   message: error.message,
      //   timeout: 5000,
      //   location: "modal",
      // });
      console.log(error);
    }
  };

  return (
    <Dialog open={true}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">Crop media</DialogTitle>
        </DialogHeader>
        <div className="relative w-full h-[600px]">
          <Cropper
            image={fileImage}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onZoomChange={setZoom}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
          />
        </div>
        <div className="mt-8">
          <div className="flex gap-2 px-16">
            <ZoomOutIcon className="h-8 w-8" />
            <Slider
              defaultValue={[zoom]}
              min={1}
              max={3}
              step={0.1}
              onValueChange={(zoom) => setZoom(Number(zoom))}
            />
            <ZoomInIcon className="h-8 w-8" />
          </div>
        </div>

        <DialogFooter className="px-8">
          <Button
            className="w-full bg-pinegreen rounded-full bg-fuchsia-300"
            onClick={cropImage}
          >
            Apply
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// export default CropEasy;

// const zoomPercent = (value) => {
//   return `${Math.round(value * 100)}%`;
// };