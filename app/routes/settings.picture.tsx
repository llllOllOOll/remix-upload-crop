import {
  unstable_parseMultipartFormData,
  type DataFunctionArgs,
  type V2_MetaFunction,
  unstable_createMemoryUploadHandler,
  json,
} from "@remix-run/node";
import { Form, Link, useActionData, useSubmit } from "@remix-run/react";
import { useState } from "react";
import CropEasy from "~/components/cropImage/CropEasy";
import { Avatar, AvatarImage } from "~/components/ui/avatar";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";

import { CropIcon } from "@radix-ui/react-icons";
import { Button } from "~/components/ui/button";
import { z } from "zod";
import { getFieldsetConstraint, parse } from "@conform-to/zod";
import { conform, useForm } from "@conform-to/react";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Update Profile Picture" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

const MAX_SIZE = 1024 * 1024 * 3; // 3MB

const SubmitFormSchema = z.object({
  intent: z.literal("submit"),
  picture: z
    .instanceof(File)
    .refine((file) => file.size > 0, "Image is required")
    .refine(
      (file) => file.size <= MAX_SIZE,
      "Image size must be less than 3MB"
    ),
});

const PhotoFormSchema = SubmitFormSchema;

export async function loader({ request }: DataFunctionArgs) {
  return json({});
}

export async function action({ request }: DataFunctionArgs) {
  const formData = await unstable_parseMultipartFormData(
    request,
    unstable_createMemoryUploadHandler({ maxPartSize: MAX_SIZE })
  );

  console.log("Before submission");

  const submission = await parse(formData, {
    schema: PhotoFormSchema.transform(async (data) => {
      if (data.picture.size <= 0) return z.NEVER;
      return {
        intent: data.intent,
        image: {
          contentType: data.picture.type,
          blob: Buffer.from(await data.picture.arrayBuffer()),
        },
      };
    }),
    async: true,
  });

  console.log("Submission:", submission.value);

  const data = Object.fromEntries(formData);
  console.log(data);
  return null;
}

export default function PictureLoad() {
  const [fileImage, setFile] = useState<File | null>(null);
  const [fileImageBlob, setFileBlob] = useState<string | null>(null);
  const [openCrop, setOpenCrop] = useState(false);
  const [openProfile, setOpenProfile] = useState(true);

  const submit = useSubmit();

  const actionData = useActionData<typeof action>();

  const [form, fields] = useForm({
    id: "profile-photo",
    constraint: getFieldsetConstraint(PhotoFormSchema),
    lastSubmission: actionData?.submission,
    onValidate({ formData }) {
      return parse(formData, { schema: PhotoFormSchema });
    },
    shouldRevalidate: "onBlur",
  });

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
            {...form.props}
            onSubmit={(event) => {
              event.preventDefault();

              const formData = new FormData();

              formData.append("picture", fileImage);
              formData.append("intent", "submit");
              submit(formData, {
                method: "post",
                encType: "multipart/form-data",
              });
            }}
          >
            <div className="relative">
              <Avatar className="w-16 h-16">
                <AvatarImage src={fileImageBlob} alt="" />
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
              <div>
                {fileImage ? (
                  <Button type="submit" name="intent" value="submit">
                    Save
                  </Button>
                ) : null}
              </div>
            </div>

            <div className="flex gap-4 items-center justify-end">
              <Link to="/settings">Cancel</Link>
              <label
                className="bg-pink-400  flex items-center rounded-full  px-16   text-md h-11  text-white text-center cursor-pointer hover:bg-pink-200"
                htmlFor="profile-photo-picture"
              >
                Upload Picture
              </label>
              <input
                {...conform.input(fields.picture, { type: "file" })}
                hidden
                onChange={(e) => {
                  const file = e.currentTarget.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                      setFileBlob(event.target?.result?.toString() ?? null);
                      setOpenCrop(true);
                      setFile(file);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
            </div>
            {form.errors}
          </Form>
        </DialogContent>
      </Dialog>
    </>
  ) : (
    <CropEasy {...{ fileImageBlob, setOpenCrop, setFile, setFileBlob }} />
  );
}
