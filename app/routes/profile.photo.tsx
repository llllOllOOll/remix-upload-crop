import {
  unstable_parseMultipartFormData,
  type DataFunctionArgs,
  type V2_MetaFunction,
  unstable_createMemoryUploadHandler,
} from "@remix-run/node";
import { Form, useSubmit } from "@remix-run/react";
import { useState } from "react";
import CropEasy from "~/components/cropImage/CropEasy";
import { Avatar, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

const MAX_SIZE = 1024 * 1024 * 3; // 3MB

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

  const submit = useSubmit();

  return !openCrop ? (
    <>
      <Form
        method="post"
        encType="multipart/form-data"
        onSubmit={(event) => {
          event.preventDefault();

          const formData = new FormData();
          formData.append("myKey", fileImage);
          submit(formData, { method: "post", encType: "multipart/form-data" });
        }}
      >
        <input type="text" name="name" id="name" />

        <input
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

        {fileImage ? (
          <Avatar>
            <AvatarImage src={fileImage} alt="@shadcn" />
          </Avatar>
        ) : null}
        <Button>Send</Button>
      </Form>
    </>
  ) : (
    <CropEasy {...{ fileImage, setOpenCrop, setPhotoURL, setFile }} />
  );
}
