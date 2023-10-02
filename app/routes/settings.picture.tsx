import {
  unstable_parseMultipartFormData,
  type DataFunctionArgs,
  type V2_MetaFunction,
  unstable_createMemoryUploadHandler,
  json,
} from "@remix-run/node";
import { Form, Link, useLoaderData, useSubmit } from "@remix-run/react";
import { useState } from "react";
import CropEasy from "~/components/cropImage/CropEasy";
import { Avatar, AvatarImage } from "~/components/ui/avatar";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";

import avatar from "public/svg/avatar.png";
import { CropIcon } from "@radix-ui/react-icons";
import { Button } from "~/components/ui/button";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Update Profile Picture" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

const MAX_SIZE = 1024 * 1024 * 3; // 3MB

export async function loader({ request }: DataFunctionArgs) {
  return json({});
}

export async function action({ request }) {
  console.log("Action");
  const formData = await unstable_parseMultipartFormData(
    request,
    unstable_createMemoryUploadHandler({ maxPartSize: MAX_SIZE })
  );

  //const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log(data);
  return null;
}

export default function Index() {
  const [fileImage, setFile] = useState<string | null>(null);
  const [photoURL, setPhotoURL] = useState(null);
  const [openCrop, setOpenCrop] = useState(false);
  const [openProfile, setOpenProfile] = useState(true);

  const submit = useSubmit();

  return !openCrop ? (
    <>
      <Dialog open={openProfile} onOpenChange={setOpenProfile}>
        <DialogContent className="w-full max-w-[600px]">
          <DialogHeader className="">
            <DialogTitle className="mb-4">
              Change the Profile Picture
            </DialogTitle>
            <p>Click to upload a new profile picture from your device</p>
          </DialogHeader>

          <Form
            className="w-full"
            method="post"
            encType="multipart/form-data"
            onSubmit={(event) => {
              event.preventDefault();

              const formData = new FormData();
              formData.append("myKey", fileImage);
              submit(formData, {
                method: "post",
                encType: "multipart/form-data",
              });
            }}
          >
            <div className="relative">
              <Avatar className="w-16 h-16">
                <AvatarImage src={fileImage} alt="@shadcn" />
              </Avatar>

              <div className="absolute inset-0 top-4 left-14">
                {fileImage && (
                  <Button
                    className="w-11 h-11 bg-black/50 rounded-full"
                    aria-label="Crop"
                    color="primary"
                    onClick={() => setOpenCrop(true)}
                  >
                    <CropIcon />
                  </Button>
                )}
              </div>
              <div>{fileImage ? <Button>Save</Button> : null}</div>
            </div>
            <div className="flex gap-4 items-center justify-end">
              <Link to="/settings">Cancel</Link>
              <label
                className="bg-pink-400  flex items-center rounded-full  px-16   text-md h-11  text-white text-center cursor-pointer hover:bg-pink-200"
                htmlFor="photoProfile"
              >
                Upload Picture
              </label>
              <input
                id="photoProfile"
                hidden
                name="file2"
                type="file"
                onChange={(e) => {
                  const file = e.currentTarget.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                      setFile(event.target?.result ?? null);
                      setOpenCrop(true);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
            </div>
          </Form>

          {/* <DialogFooter className="px-8">
            <Button
              onClick={() => {
                // setOpenProfile(false);
              }}
            >
              Cancel
            </Button>
            <Button className="w-full bg-pinegreen rounded-full bg-zinc-400">
              <Link to="/profile/photo">Test</Link>
            </Button>
          </DialogFooter> */}
        </DialogContent>
      </Dialog>
    </>
  ) : (
    <CropEasy {...{ fileImage, setOpenCrop, setPhotoURL, setFile }} />
  );
}
